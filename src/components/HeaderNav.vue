<template>

  <div 
    class="offcanvas offcanvas-top offcanvas-m py-3 search-canvas"
    tabindex="-1" 
    id="searchCanvas"
    aria-labelledby="searchCanvasLabel"
  >  
    <div class="container-fluid">
      <div class="row">
        <div class="col-10">
          <input
                v-model="searchForm.text"
                class="form-control"
                placeholder="Search story, author or tags"
                @keydown.enter="searchStories"
              >
        </div>
        <div class="col-2">
          <button 
            class="btn btn-primary mx-2" 
            data-bs-dismiss="offcanvas"
            type="button"
            data-bs-target="#offcanvasResponsive" 
            aria-label="Search"
            @click="searchStories"
          >
          Search
          </button>
          <button 
            class="btn btn-secondary" 
            data-bs-dismiss="offcanvas"
            type="button"
            data-bs-target="#offcanvasResponsive" 
            aria-label="Cancel"
          >
          Cancel
          </button>
        </div>
      </div>
    </div>
</div>

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
            <ul class="navbar-nav me-auto mx-3 mt-2">
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
            </ul>
          </div>
        </nav>
      </div>
      <div class="col-8 text-center site-title">
        <p class="lh-1">Brawna</p>
      </div>
      <div class="col-2 my-1 pt-1">
        <div class="d-flex float-end">
          <div class="p-2">
            <img
              src="../assets/image/icon/search-normal.svg"
              class="story-header-action"
              data-bs-toggle="offcanvas" 
              data-bs-target="#searchCanvas" 
              aria-controls="searchCanvas"
            >
          </div>
          <div 
            v-if="!isAuthenticated"
            class="p-2"
          >
            <img
              src="../assets/image/icon/profile-circle.svg"
              class="story-header-action"
              data-bs-toggle="modal"
              data-bs-target="#loginModal"
            >
          </div>
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
            class="btn-close" 
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

  <div 
    id="searchModal"
    class="modal fade" 
    tabindex="-1"
    aria-labelledby="searchModalLabel" 
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 
            id="searchModalLabel"
            class="modal-title"
            @click="searchStories"
          >
            Search
          </h5>
        </div>
        <div class="modal-footer">
          <button 
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

<script>
import LoginForm from "@/components/LoginForm.vue";
import MultiSearch from "@/components/MultiSearch.vue";
import EventBus from "../common/EventBus";
import AuthService from '../services/auth.service';
import {Collapse, Offcanvas} from "bootstrap";

export default {
  name: "HeaderNav",
  components: {MultiSearch, LoginForm},
  data() {
    return {
      loginModal: {
        title: 'Login to the site'
      },
      searchForm: {
        text: ""
      }
    }
  },
  computed: {
    role() {
      return this.$store.state.auth.role;
    },
    isAuthenticated() {
      return this.$store.state.auth.isAuthenticated;
    }
  },
  beforeMount() {
    this.checkUser();
  },
  methods: {
    searchStories(){
      this.$router.push( {
        name: 'searchResults', 
        params: {
          searchText: this.searchForm.text
        }
      });
      const searchbar = document.querySelector('.search-canvas');
      if (searchbar) {
        Offcanvas.getInstance(searchbar).hide();
      }
    },
    changeModalTitle(mode) {
      this.loginModal.title = (mode === 'login' ? 'Login to the site' : 'Sign up');
    },
    closeLogin(){
      document.getElementById('loginModalClose').click();
    },
    checkUser(){
      if (!this.role.isInit){
        AuthService.getRole(this.$store);
      }
    },
    logOut(){
      EventBus.dispatch("logout");
    },
    collapseNavbar() {
      const navbar = document.querySelector('.navbar-collapse.show');
        if (navbar) {
            new Collapse(navbar, {
                toggle: false,
            }).hide();
        }
    },
  }
}

</script>

<style lang="scss">
  .search-canvas {
    max-height: 10% !important;
    height: fit-content !important;
    border: none !important;
  }

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

  .navbar-collapse {
    margin-top: 5px;
    background-color: black !important;
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