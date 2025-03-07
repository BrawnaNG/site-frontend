<template>
  <div class="container-flex comments-stories">
    <div class="row comments-stories-title mx-auto pb-4 mb-4 px-0">
      <h2 class="font-weight-bold m-0">
        Comments
      </h2>
    </div>
    <div
      v-for="comment in 10"
      :key="`comment_${comment}`"
      class="row comments-stories-content-card"
    >
      <comments-card />
    </div>
    <div class="jrow ustify-content-center m-0 pt-4">
      TODO - Pagination
    </div>
  </div>
</template>

<script>
import CommentsCard from "@/components/Card/CommentsCard.vue";
export default {
  name: "CommentsStories",
  components: {CommentsCard},
  data() {
    return {
      addReply: false,
      rows: 100,
      currentPage: 1
    }
  }
}
</script>

<style scoped lang="scss">

</style>