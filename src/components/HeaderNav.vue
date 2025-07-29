<template>

  <div class="story-header container-fluid bg-light">
    <div class="row">
      <div class="col-2 pt-2">
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
              src="../assets/image/icon/menu.svg" 
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
            <ul class="navbar-nav me-auto mx-3 mt-2 px-2">
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
      <div class="col-6 text-center site-title">
        <p class="lh-1">Brawna</p>
      </div>
      <div class="col-2 my-2 pt-3">
        <input
          v-model="searchForm.text"
          class="form-control"
          placeholder="Search story, author or tags"
          @keydown.enter="searchStories"
        >
      </div>
      <div class="col-1 my-2 pt-3">
        <button 
          pill
          variant="dark"
          class="pr-1 py-2 px-3 font-weight-bold rounded-pill btn-search"
          aria-label="Search"
          @click="searchStories"
        >
        Search
        </button>
      </div>
      <div class="col-1 my-2 pt-1">  
        <div class="d-flex float-end"></div>
          <div 
            v-if="!isAuthenticated"
            class="p-2"
          >
            <img
              src="../assets/image/icon/profile-circle.svg"
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
import { ref, computed, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import LoginForm from "@/components/LoginForm.vue";
import EventBus from "../common/EventBus";
import AuthService from '../services/auth.service';
import { Collapse } from "bootstrap";
import { useAuthStore } from '../stores/auth';
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

// Store
const authStore = useAuthStore();

// Computed properties
const role = computed(() => authStore.role);
const isAuthenticated = computed(() => authStore.isAuthenticated);

// Lifecycle hooks
onBeforeMount(() => {
  checkUser();
});

// Methods converted to functions
function setLoginView(){
  authStore.setView("login");
}

function collapseNavbarAndLogout() {
  collapseNavbar();
  logOut();
}

function searchStories() {
  router.push({
    name: 'searchResults',
    params: {
      search: searchForm.value.text
    }
  });
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

<style lang="scss">
  .site-title {
    font-size: 5em;
    font-weight: bolder;
    font-family: NotoSerif-Bold;
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
      width: 2vw;
      cursor: pointer;
      display: flex;
    }
  }

  .btn-search {
    font-size: .8em;
    background-color: black;
    color: white;
    img {
      width: 1.6vw;
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
      font-size: 1.2em;
      font-weight: bolder;
      font-family: NotoSerif-Bold;
    }
  }
</style>
