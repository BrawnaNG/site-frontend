<template>
  <!-- Drop-down menu -->
  <div class="position-relative">
    <div class="container position-absolute w-25">
      <div class="row justify-content-start">
        <div class="col-md-auto">
          <nav class="navbar navbar-expand-xs navbar-light">
            <button 
              class="navbar-toggler"
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarSupportedContent" 
              aria-controls="navbarSupportedContent" 
              aria-expanded="false" 
              aria-label="Toggle menu"
            >
              <img 
                src="@/assets/image/icon/menu.svg" 
                alt="" 
                width="30" 
                height="24" 
                class="d-inline-block align-text-top"
              >
            </button>
            <div 
              id="navbarSupportedContent"
              class="collapse navbar-collapse"
            >
              <ul class="navbar-nav me-auto mx-3 mt-2 px-2 pb-2">
                <li class="nav-item"
                >
                  <router-link
                    class="navbar-menu-item-link nav-link active"
                    :to="{name: 'home'}"
                    @click="collapseNavbar"
                  >
                    Home
                  </router-link>
                </li>
                <li 
                  v-if="role.isAuthor || role.isAdmin"
                  class="nav-item"
                >
                  <router-link
                    class="navbar-menu-item-link nav-link"
                    :to="{name: 'dashboard'}"
                    @click="collapseNavbar"
                  >
                    Dashboard
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link
                    class="navbar-menu-item-link nav-link"
                    :to="{name: 'all-categories'}"
                    @click="collapseNavbar"
                  >
                    Categories
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link
                    class="navbar-menu-item-link nav-link"
                    :to="{name: 'all-tags'}"
                    @click="collapseNavbar"
                  >
                    Tags
                  </router-link>
                </li>
                <li 
                  v-if="role.isAdmin"
                  class="nav-item"
                >
                  <router-link
                    class="navbar-menu-item-link nav-link"
                    :to="{name: 'admin'}"
                    @click="collapseNavbar"
                  >
                    Admin
                  </router-link>
                </li>  
                <li class="nav-item">
                  <router-link
                    class="navbar-menu-item-link nav-link"
                    :to="{name: 'about'}"
                    @click="collapseNavbar"
                  >
                    About
                  </router-link>
                </li>
                <li 
                  class="nav-item"
                  v-if="isAuthenticated">
                  <router-link
                    class="navbar-menu-item-link nav-link"
                    :to="{name: 'home'}"
                    @click="collapseNavbarAndLogout"
                  >
                    Log out
                  </router-link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>
  <!-- End drop-down menu -->

  <!-- Main header -->
  <div class="story-header container-fluid bg-light">
    <div class="row align-items-center">
      <div class="col-2">
        &nbsp;
      </div>
      <div class="col-6 text-center site-title">
        <div class="bold lh-1">Brawna</div>
      </div>
      <div class="col-2">
        <input
          v-model="searchForm.text"
          class="form-control search-text"
          placeholder="Search story, author or tags"
          @keydown.enter="searchStories"
        >
      </div>
      <div class="col-1">
        <button 
          class="px-4 py-2 rounded-pill btn-search"
          aria-label="Search"
          @click="searchStories"
        >
        Search
        </button>
      </div>
      <div class="col-1">  
        <div class="d-flex float-end"></div>
          <div 
            v-if="!isAuthenticated"
            class="p-2"
          >
            <img
              src="@/assets/image/icon/profile-circle.svg"
              class="story-header-action"
              data-bs-toggle="modal"
              data-bs-target="#loginModal"
              @click="setLoginView"
              v-bind:title="TITLE_LOGIN"
            >
         </div>
      </div>
    </div>
  </div>
  <!-- End Main header -->

  <!-- Login Modal-->
  <div 
    id="loginModal"
    class="modal" 
    tabindex="-1"
    aria-labelledby="loginModalLabel" 
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 
            id="loginModalLabel"
            class="modal-title"
          >
            {{ loginModal.title }}
          </h5>
          <button 
            type="button" 
            class="btn-close rounded-pill py-2" 
            data-bs-dismiss="modal" 
            aria-label="Close"
          />
        </div>
        <div class="modal-body">
          <login-form
            @change-form-state="changeModalTitle"
            @close-login="closeLogin"
          />
        </div>
        <div class="modal-footer">
          <button 
            id="loginModalClose"
            type="button"
            class="btn btn-secondary" 
            data-bs-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeMount, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import LoginForm from "@/components/LoginForm.vue";
import EventBus from "@/common/EventBus";
import AuthService from '@/services/auth.service';
import { Collapse } from "bootstrap";
import { useAuthStore } from '@/stores/auth';
import { useSearchStore } from '@/stores/search';
const TITLE_LOGIN = "Login to the site";
const TITLE_SIGNUP = "Sign up";
const TITLE_RESET = "Reset password";

// Data properties
const loginModal = ref({
  title: 'Login to the site'
});
const searchForm = ref({
  text: ""
});

// Router
const router = useRouter();

// Route
const route = useRoute();
watch(() => route.path, (_new, _old) => {
  collapseNavbar();
});

// Stores
const authStore = useAuthStore();
const searchStore = useSearchStore();

// Computed properties
const role = computed(() => authStore.role);
const isAuthenticated = computed(() => authStore.isAuthenticated);
const searchText = computed(() => searchStore.searchText);

watch( () => searchText, (newSearchText, oldSearchText) => {
  if (newSearchText != oldSearchText)
    searchForm.value.text = newSearchText;
});

// Lifecycle hooks
onBeforeMount(() => {
  checkUser();
});

// Methods converted to functions
function setLoginView(){
  collapseNavbar();
  authStore.setView("login");
}

function collapseNavbarAndLogout() {
  collapseNavbar();
  logOut();
}

function searchStories() {
  searchStore.setSearchText(searchForm.value.text);
  searchForm.value.text = "";
  router.push({name: 'searchResults',
    params: {
      search: searchStore.searchText
    }});
}

function changeModalTitle(mode) {
  
  switch (mode) {
  case "login":
    loginModal.value.title = TITLE_LOGIN;
    break;
  case "signup":
    loginModal.value.title = TITLE_SIGNUP;
    break;
  case "reset":
    loginModal.value.title = TITLE_RESET;
    break;
  default:
    break;
  }
}

function closeLogin() {
  document.getElementById('loginModalClose').click();
  router.push({name: 'home'});
}

function checkUser() {
  if (!role.value.isInit) {
    AuthService.getRole(authStore);
  }
}

function logOut() {
  EventBus.dispatch("logout");
}

function collapseNavbar() {
  const navbar = document.querySelector('.navbar-collapse.show');
  if (navbar) {
    new Collapse(navbar, {
      toggle: false,
    }).hide();
  }
}
</script>

<style scoped lang="scss">
  .site-title {
    font-size: 5em;
    font-weight: 600;
    margin: 0%;
  }

  .story-header {
    height: 6em;
    border-bottom: 1px solid #D6D6D6;
    padding-top: 5px;
    &-menu {
      width: 2.2vw;
      cursor: pointer;
    }
    &-action {
      width: 3em;
      height: 3em;
      cursor: pointer;
      display: flex;
    }
  }

  .btn-search {
    font-size: .8em;
    font-weight: 600;
    background-color: black;
    color: white;
    img {
      width: 1.6vw;
    }
  }

  .search-text {
    input {
      font-size: .8em;
    }
  }

  .navbar-collapse {
    margin-top: 5px;
    background-color: black !important;
    z-index: 1000;
  }
  .navbar-menu-item-link {
    color: white !important;
  }
  .nav-item {
    a {
      font-size: 1em;
      font-weight: bolder;
    }
  }
</style>
