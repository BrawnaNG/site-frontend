<template>
  <div class="admin-page">
    <div class="container-fluid admin-page-head mx-auto py-3">
      <div class="row h-100 m-0">
        <div class="col-6 px-0">
          <div class="admin-page-head-title px-0">
            <h4 class="m-0 font-weight-bolder">
              Admin
            </h4>
          </div>
        </div>
      </div>
      <div class="row admin-page-head-breadcrumb pt-1 px-0">
        <admin-bread-crumbs label="Recent Stories" />
      </div>
    </div>
    <admin-menu />
    <div class="container-flex admin-page-content mx-auto py-5">
      <div class="row m-0">
        <div class="col-8 pl-0">
          <div class="pb-5">
            <h2 class="m-0">
              Recent Stories
            </h2>
          </div>
          <recent-stories />
        </div>
        <div class="col-4 p-0">
          <div class="pb-5">
            <h2 class="m-0">
              Last Registered Users
            </h2>
          </div>
          <last-registered-user />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RecentStories from "@/components/Admin/RecentStories.vue";
import LastRegisteredUser from "@/components/Admin/LastRegisteredUser.vue";
import AdminBreadCrumbs from "@/components/Admin/AdminBreadCrumbs.vue";
import AdminMenu from "@/components/Admin/AdminMenu.vue";

export default {
  name: "AdminPage",
  components: {LastRegisteredUser, RecentStories, AdminBreadCrumbs, AdminMenu },
}
</script>

<style scoped lang="scss">

</style>