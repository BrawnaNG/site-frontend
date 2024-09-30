<template>
  <div class="container-flex stories-comment-page">
    <div class="row stories-comment-page-head mx-auto py-3 h-100 m-0">
      <div class="row h-100 m-0">
        <div class="col-6 px-0">
          <div class="col-6 dashboard-page-head-title px-0">
            <h4 class="m-0 font-weight-bolder">
              Dashboard
            </h4>
          </div>
          <bread-crumbs label="Comments" />
        </div>
      </div>
    </div>
    <user-menu />
    <div class="row stories-comment-page-content mx-auto py-5">
      <div class="pb-5">
        <h2 class="m-0">
          Comments
        </h2>
      </div>
    </div>
    <div class="row comments-stories-content p-0">
      <div
        v-for="comment in commentList.data"
        :key="`comment_${comment}`"
        class="comments-stories-content-card"
      >
        <comments-card />
      </div>
    </div>
    <div class="row justify-content-center m-0 pt-4">
      TO DO - PAGINATION
    </div>
  </div>
</template>

<script>
import CommentsCard from "@/components/Card/CommentsCard.vue";
import BreadCrumbs from "@/components/Dashboard/BreadCrumbs.vue";
import UserMenu from "@/components/Dashboard/UserMenu.vue";
export default {
  name: "StoriesComment",
  components: {CommentsCard,BreadCrumbs},
  data() {
    return {
      addReply: false,
      commentList: {
        data: [],
        page: 1,
        total: 0
      }
    }
  },
}
</script>

<style scoped>

</style>