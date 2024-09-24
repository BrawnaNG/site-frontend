<template>
  <div id="app">
    <header-nav />
    <router-view />
    <site-footer />
  </div>
</template>

<script>
import HeaderNav from "@/components/HeaderNav.vue";
import SiteFooter from "@/components/SiteFooter.vue";
import EventBus from "./common/EventBus";

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
      this.$store.dispatch('auth/logout');
    }
  }
}
</script>