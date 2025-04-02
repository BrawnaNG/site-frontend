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
        <admin-bread-crumbs label="Users" />
      </div>
    </div>
    <admin-menu current="users"/>
    <div class="container-flex admin-page-content mx-auto py-3">
      <div class="pb-3">
        <p class="m-0 admin-page-content-title">
          Users
        </p>
      </div>
      <user-list />
    </div>
  </div>
</template>

<script>
import UserList from "@/components/Admin/UserList.vue";
import AdminBreadCrumbs from "@/components/Admin/AdminBreadCrumbs.vue";
import AdminMenu from "@/components/Admin/AdminMenu.vue";
export default {
  name: "UserAccount",
  components: {UserList, AdminBreadCrumbs, AdminMenu },
}
</script>

<style scoped lang="scss">
  @import '@/assets/style/admin.scss';
</style>