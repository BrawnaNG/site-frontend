<template>
  <div class="admin-page">
    <div class="container-fluid admin-page-head mx-auto py-3">
      <div class="row h-100 m-0">
        <div class="col-6 px-0">
          <div class="admin-page-head-title px-0">
            <p class="m-0">
              Admin
            </p>
          </div>
        </div>
      </div>
      <div class="row admin-page-head-breadcrumb pt-1 px-2">
        <admin-bread-crumbs label="Recent Stories" />
      </div>
    </div>
    <admin-menu current="admin" />
    <div class="container-fluid admin-page-content mx-auto py-3">
      <div class="row m-0">
        <div class="col-8 pl-0">
          <div class="pb-3">
            <p class="m-0 admin-page-content-title">
              Recent Stories
            </p>
          </div>
          <recent-stories />
        </div>
        <div class="col-4 pl-2">
          <div class="pb-3">
            <p class="m-0 admin-page-content-title">
              Last Registered Users
            </p>
          </div>
          <last-registered-user />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import RecentStories from "@/components/Admin/RecentStories.vue";
import LastRegisteredUser from "@/components/Admin/LastRegisteredUser.vue";
import AdminBreadCrumbs from "@/components/Admin/AdminBreadCrumbs.vue";
import AdminMenu from "@/components/Admin/AdminMenu.vue";
</script>

<style scoped lang="scss">
  @use '@/assets/style/admin.scss' as *;
</style>
