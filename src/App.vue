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

export default {
  components: {SiteFooter, HeaderNav},
  mounted() {
    document.title = 'Stories'
  },
  methods: {
  }
}
</script>