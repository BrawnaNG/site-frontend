<template>
  <div id="app" class="app">
    <header-nav />
    <router-view />
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue';
import HeaderNav from "@/components/HeaderNav.vue";
import EventBus from "./common/EventBus";
import AuthService from "./services/auth.service";
import { useAuthStore } from './stores/auth';

const authStore = useAuthStore();

function logOut() {
  AuthService.logout(authStore);
}

onMounted(() => {
  document.title = 'Stories';
  EventBus.on("logout", () => {
    logOut();
  });
});

onBeforeUnmount(() => {
  EventBus.remove("logout");
});
</script>

<style lang="scss">
  @use '@/assets/style/main.scss' as *;
</style>