<template>
  <div class="container-fluid py-3 menu-bar-wrapper px-0">
    <div class="row mx-auto my-0">
      <div class="col-6 .me-auto">
        <ul class="list-group list-group-horizontal">
          <li class="list-group-item menu-bar-item cursor-pointer text-white text-center mr-3 px-4 pb-2">
            <router-link
              :to="{name: 'dashboard'}"
            >
              Your Stories
            </router-link>
          </li>
          <li class="list-group-item menu-bar-item cursor-pointer text-white text-center mr-3 px-4 pb-2">
            <router-link
              :to="{name: 'savedStories'}"
            >
              Saved Stories
            </router-link>
          </li>
          <li class="list-group-item menu-bar-item cursor-pointer text-white text-center mr-3 px-4 pb-2">
            <router-link
              :to="{name: 'commentsStory'}"
            >
              Comments
            </router-link>
          </li>
          <li class="list-group-item menu-bar-item cursor-pointer text-white text-center mr-3 px-4 pb-2">
            <router-link
              :to="{name: 'drafts'}"
            >
              Drafts
            </router-link>
          </li>
        </ul>
      </div>
      <div 
        v-if="isAuthenticated"
        class="col-6 menu-bar-item cursor-pointer text-white text-right mr-3 px-4 pb-2 py-2"
      >
        <span
          class="float-end"
          @click="logOut()"
        >
          Log out
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from "../../common/EventBus";
export default {
  name: "UserMenu",
  computed: {
    isAuthenticated() {
      return this.$store.state.auth.isAuthenticated;
    }
  },
  methods: {
    logOut(){
      EventBus.dispatch("logout");
      this.$router.push({name: 'home'});
    }
  }
}
</script>

<style scoped lang="scss">
.menu-bar-wrapper {
  background-color: black !important;
  color: white !important;
  width: 100vw;
  button {
    color: white !important;
  }

  .list-group-item {
    background-color: black !important;
    border: none;
  }

  .menu-bar-item {
    a,span{
      color: white !important;
      font-size: 1.2em;
      font-family: NotoSerif-Bold;
      text-decoration: none;
    }
    .router-link-active 
    {
      text-decoration: underline;
    }
  }
}
</style>