<template>
  <div class="dashboard-page">
    <div class="container-fluid dashboard-page-head mx-auto py-3">
      <div class="row h-100 m-0">
        <div class="col-8 px-4 dashboard-page-head-title">
          <h4 class="m-0 px-4 font-weight-bolder">
            Dashboard
          </h4>
          <bread-crumbs 
            label="Your Stories" 
            class="px-4"
          />
        </div>
        <div class="col-4 px-4 pt-2 mt-1 text-right">
          <add-story class="float-end" />
        </div>
      </div>
    </div>
    <user-menu />
    <div class="container-fluid dashboard-page-content mx-auto py-5">
      <div class="row pb-2">
        <h2 class="mx-2 px-4">
          Your Stories
        </h2>
      </div>
      <your-stories />
    </div>
  </div>
</template>

<script>
import YourStories from "@/components/Dashboard/YourStories.vue";
import BreadCrumbs from "@/components/Dashboard/BreadCrumbs.vue";
import UserMenu from "@/components/Dashboard/UserMenu.vue";
import AddStory from "@/components/Dashboard/AddStory.vue";

export default {
  name: "DashboardPage",
  components: {YourStories, BreadCrumbs, UserMenu, AddStory }
}
</script>

<style scoped lang="scss">
</style>