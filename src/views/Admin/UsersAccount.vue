<template>
  <div class="users-account-page">
    <div class="container-flex admin-page-head mx-auto py-3">
      <div class="row h-100 m-0">
        <div class="col px-0">
          <h4 class="m-0 font-weight-bolder">
            Admin
          </h4>
        </div>
      </div>>
      <div class="row admin-page-head-breadcrumb pt-1 px-0">
        <admin-bread-crumbs label="Users" />
      </div>
    </div>
    <admin-menu />
    <div class="container-flex users-account-content mx-auto py-5">
      <div class="pb-5">
        <h2 class="m-0">
          Users
        </h2>
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

<style scoped>

</style>