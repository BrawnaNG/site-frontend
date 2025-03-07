<template>
  <div class="comments-page">
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
        <admin-bread-crumbs label="Comments" />
      </div>
    </div>
    <admin-menu />
    <div class="container-flex comments-content mx-auto py-5">
      <div class="rowpb-5">
        <h2 class="m-0">
          Comments
        </h2>
      </div>
      <div 
        v-for="com in comments"
        :key="`com_card_${com}`"
        class="row"
      >
        <comments-card />
      </div>
      <div class="justify-content-center m-0 pt-4">
        TODO - PAGINATION
      </div>
    </div>
  </div>
</template>

<script>
import CommentsCard from "@/components/Card/CommentsCard.vue";
import AdminBreadCrumbs from "@/components/Admin/AdminBreadCrumbs.vue";
import AdminMenu from "@/components/Admin/AdminMenu.vue";
export default {
  name: "CommentsManagement",
  components: {CommentsCard, AdminBreadCrumbs, AdminMenu},
  data() {
    return {
      currentPage: 1,
      comments: []
    }
  },
}
</script>

<style scoped>

</style>