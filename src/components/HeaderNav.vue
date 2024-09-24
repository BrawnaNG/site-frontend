<template>
  <div class="story-header">
    <b-row class="m-0 justify-content-between align-items-center px-5 h-100">
      <b-col cols="auto p-0">
        <img
          v-b-toggle.sidebar-backdrop
          src="../assets/image/icon/menu.svg"
          class="story-header-menu"
        >
      </b-col>
      <b-col cols="auto p-0">
        <img
          src="../assets/image/icon/logo.svg"
          class="story-header-logo"
        >
      </b-col>
      <b-col
        cols="auto"
        class="p-0"
      >
        <img
          src="../assets/image/icon/search-normal.svg"
          class="story-header-action mr-2"
          @click="searchModal.show = true"
        >

        <template v-if="logged">
          <img
            title="You are logged in"
            src="../assets/image/icon/profile-circle.svg"
            class="story-header-action"
            @click="logOut()"
          >
        </template>
        <template v-else>
          <img
            src="../assets/image/icon/profile-circle.svg"
            class="story-header-action"
            @click="loginModal.show = true"
          >
        </template>
      </b-col>
    </b-row>

    <b-sidebar
      id="sidebar-backdrop"
      title="Menu"
      sidebar-class="sidebar-menu p-4"
      variant="dark"
      backdrop
      shadow
    >
      <div class="py-3 px-2">
        <ul>
          <li class="sidebar-menu-item pb-2">
            <router-link
              class="sidebar-menu-item-link"
              :to="{name: 'home'}"
            >
              Home
            </router-link>
          </li>
          <li 
            v-if="role.isAuthor || role.isAdmin"
            class="sidebar-menu-item pb-2"
          >
            <router-link
              class="sidebar-menu-item-link"
              :to="{name: 'dashboard'}"
            >
              Dashboard
            </router-link>
          </li>
          <li 
            v-if="role.isAdmin"
            class="sidebar-menu-item pb-2"
          >
            <router-link
              class="sidebar-menu-item-link"
              :to="{name: 'admin'}"
            >
              Admin
            </router-link>
          </li>
        </ul>
      </div>
    </b-sidebar>

    <b-modal
      v-model="loginModal.show"
      hide-footer
      :title="loginModal.title"
    >
      <login-form
        @close-login="loginModal.show = false"
        @change-form-state="changModalTitle"
      />
    </b-modal>

    <b-modal
      v-model="searchModal.show"
      hide-footer
      hide-header
      size="xl"
    >
      <div class="p-2">
        <multi-search @close-multi-search-dialog="searchModal.show = false" />
      </div>
    </b-modal>
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
      logged: false,
      role: {
        isAuthor: false,
        isAdmin: false
      },
      loginModal: {
        show: false,
        title: 'Login to the site'
      },
      searchModal: {
        show: false,
      }
    }
  },
  watch: {
    'loginModal.show'() {
      this.checkUserLogin()
    }
  },
  beforeMount() {
    this.checkUserLogin();
    this.checkUserRole();
  },
  methods: {
    changModalTitle(mode) {
      this.loginModal.title = (mode === 'login' ? 'Login to the site' : 'Sign up')
    },
    checkUserLogin() {
      this.logged = this.$store.state.auth.status.loggedIn;
    },
    async checkUserRole(){
      let role = this.$store.state.auth.role;
      if (!role){
        this.$store.dispatch("auth/refreshRole").then(() => {
          this.role = this.$store.state.auth.role;
        });
      }
    },
    logOut(){
      EventBus.dispatch("logout");
      this.logged = false;
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
#sidebar-backdrop.sidebar-menu {
  background-color: black !important;
  color: white !important;
  width: 30vw;
  button {
    color: white !important;
  }

  a.sidebar-menu-item-link {
    color: #EFEFEF !important;
    font-size: 1.2em;
    font-family: NotoSerif-Bold;
  }
}
</style>