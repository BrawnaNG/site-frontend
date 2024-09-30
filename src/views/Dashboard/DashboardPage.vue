<template>
  <div class="dashboard-page">
    <div class="container-fluid dashboard-page-head mx-auto py-3">
      <div class="row h-100 m-0">
        <div class="col-6 px-0">
          <div class="col-6 dashboard-page-head-title px-0">
            <h4 class="m-0 font-weight-bolder">
              Dashboard
            </h4>
          </div>
          <bread-crumbs label="Your Stories" />
        </div>
        <div class="col-6 px-0 pt-2 mt-1 text-right">
          <add-story />
        </div>
      </div>
    </div>
    <user-menu />
    <div class="container-fluid dashboard-page-content mx-auto py-5">
      <div class="row pb-5">
        <h2 class="m-0">
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
  components: {YourStories, BreadCrumbs, UserMenu, AddStory },
  data() {
    return {
      breadcrumb: [
        {
          text: 'Home',
          href: '/'
        },
        {
          text: 'Dashboard',
          href: '#/dashboard/your-stories'
        },
        {
          text: 'Your Stories',
        }
      ],
      tabState: 'yourStories'
    }
  },
}
</script>

<style scoped lang="scss">
</style>