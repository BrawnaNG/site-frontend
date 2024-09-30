<template>
  <div class="container-fluid py-3 menu-bar-wrapper px-0">
    <div class="row mx-auto my-0">
      <div class="col menu-bar-item cursor-pointer text-white text-center mr-3 px-1 pb-2">
        <router-link
          class="pb-2 px-1"
          :to="{name: 'dashboard'}"
        >
          Your Stories
        </router-link>
      </div>
      <div class="col menu-bar-item cursor-pointer text-white text-center mr-3 px-1 pb-2">
        <router-link
          class="pb-2 px-1"
          :to="{name: 'savedStories'}"
        >
          Saved Stories
        </router-link>
      </div>
      <div class="col menu-bar-item cursor-pointer text-white text-center mr-3 px-1 pb-2">
        <router-link
          class="pb-2 px-1"
          :to="{name: 'commentsStory'}"
        >
          Comments
        </router-link>
      </div>
      <div class="col menu-bar-item cursor-pointer text-white text-center mr-3 px-1 pb-2">
        <router-link
          class="pb-2 px-1"
          :to="{name: 'drafts'}"
        >
          Drafts
        </router-link>
      </div>
      <div class="col-2 text-right p-0">
        <span class="text-white">
          Log out
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserMenu",
}
</script>

<style scoped lang="scss">
</style>