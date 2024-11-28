<template>
  <div class="story-header container-fluid">
    <div class="row">
      <div class="col-7">
        <nav class="navbar navbar-expand-xs navbar-light bg-light">
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
          <a 
            class="navbar-brand" 
            href="#"
          >
            <img
              src="../assets/image/icon/logo.svg"
              class="story-header-logo"
            >
          </a>
          <div 
            id="navbarSupportedContent"
            class="collapse navbar-collapse"
          >
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 ml-8">
              <li class="nav-item">
                <router-link
                  class="navbar-menu-item-link nav-link active"
                  :to="{name: 'home'}"
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
                >
                  Admin
                </router-link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div class="col-5">
        <div class="d-flex float-end">
          <div class="p-2">
            <img
              src="../assets/image/icon/search-normal.svg"
              class="story-header-action mr-2"
              @click="searchModal.show = true"
            >
          </div>
          <div 
            v-if="!loggedIn"
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
          >
            Search
          </h5>
          <button 
            type="button" 
            class="btn-close" 
            data-bs-dismiss="modal" 
            aria-label="Close"
          />
        </div>
        <div class="modal-body">
          <multi-search />
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
export default {
  name: "HeaderNav",
  components: {MultiSearch, LoginForm},
  data() {
    return {
      loginModal: {
        show: false,
        title: 'Login to the site'
      },
      searchModal: {
        show: false,
      }
    }
  },
  computed: {
    role() {
      return this.$store.state.auth.role;
    },
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  watch: {
    'loginModal.show'() {
      this.checkUser()
    }
  },
  beforeMount() {
    this.checkUser();
  },
  methods: {
    changeModalTitle(mode) {
      this.loginModal.title = (mode === 'login' ? 'Login to the site' : 'Sign up');
    },
    closeLogin(){
      document.getElementById('loginModalClose').click();
    },
    async checkUser(){
      if (this.loggedIn && !this.role.isInit){
        this.$store.dispatch("auth/refreshRole");
      }
    },
    logOut(){
      EventBus.dispatch("logout");
    }
  }
}

</script>

<style lang="scss">
.story-header {
  height: 5.68vw;
  border-bottom: 1px solid #D6D6D6;
  &-menu {
    width: 2.2vw;
    cursor: pointer;
  }
  &-logo {
    width: 8.8vw;
    cursor: pointer;
  }
  &-action {
    width: 2vw;
    cursor: pointer;
  }
}
#navbar-backdrop.navbar-menu {
  background-color: black !important;
  color: white !important;
  width: 30vw;
  button {
    color: white !important;
  }

  a.navbar-menu-item-link {
    color: #EFEFEF !important;
    font-size: 1.2em;
    font-family: NotoSerif-Bold;
  }
}
</style>