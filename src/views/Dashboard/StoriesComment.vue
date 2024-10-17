<template>
  <div class="stories-comment-page">
    <div class="container-fluid stories-comment-page-head mx-auto py-3">
      <div class="row h-100 m-0">
        <div class="col-8 px-4 dashboard-page-head-title">
          <h4 class="m-0 px-4 font-weight-bolder">
            Dashboard
          </h4>
          <bread-crumbs 
            label="Comments"
            class="px-4"
          />
        </div>
        <div class="col-4 px-4 pt-2 mt-1 text-right">
          <add-story class="float-end" />
        </div>
      </div>
    </div>
    <user-menu />
    <div class="row stories-comment-page-content mx-auto py-5">
      <div class="row pb-2">
        <h2 class="mx-2 px-4">
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
import AddStory from "@/components/Dashboard/AddStory.vue";
export default {
  name: "StoriesComment",
  components: {CommentsCard,BreadCrumbs,UserMenu,AddStory},
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