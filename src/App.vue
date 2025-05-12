<template>
  <div id="app">
    <header-nav />
    <router-view />
  </div>
</template>

<script>
import HeaderNav from "@/components/HeaderNav.vue";
import SiteFooter from "@/components/SiteFooter.vue";
import EventBus from "./common/EventBus";
import AuthService from "./services/auth.service";
import { useAuthStore } from './stores/auth';

export default {
  components: {SiteFooter, HeaderNav},
  mounted() {
    document.title = 'Stories',
    EventBus.on("logout", () => {
      this.logOut();
    });
  },
  beforeUnmount() {
    EventBus.remove("logout");
  },
  methods: {
    logOut() {
      const authStore = useAuthStore();
      AuthService.logout(authStore);
    }
  }
}
</script>
