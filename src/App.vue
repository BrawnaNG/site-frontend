<template>
  <div id="app">
    <header-nav/>
    <router-view/>
    <site-footer/>
  </div>
</template>

<script>
import HeaderNav from "@/components/HeaderNav";
import SiteFooter from "@/components/SiteFooter";

export default {
  components: {SiteFooter, HeaderNav},
  mounted() {
    document.title = 'Stories'
    // this.login()
  },
  methods: {
    login() {
      this.$axios.post('http://127.0.0.1:8000/api/token/', {
        username: 'admin',
        password: 'admin'
      }).then(res => {
        localStorage.setItem('csrf-token', res.data.access)
      })
    }
  }
}
</script>