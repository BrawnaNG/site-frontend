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
              <li>  
                <router-link
                  class="navbar-menu-item-link nav-link"
                  :to="{name: 'about'}"
                  @click="collapseNavbar"
                >
                  About
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
      <div class="col-1 my-2 pt-2">  
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

<script>
import LoginForm from "@/components/LoginForm.vue";
import MultiSearch from "@/components/MultiSearch.vue";
import EventBus from "../common/EventBus";
import AuthService from '../services/auth.service';
import {Collapse} from "bootstrap";

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
          search: this.searchForm.text
        }
      });
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