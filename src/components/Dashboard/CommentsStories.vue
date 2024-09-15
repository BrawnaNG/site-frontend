<template>
  <div class="comments-stories">
    <b-col cols="12" class="comments-stories-title mx-auto pb-4 mb-4 px-0">
      <h2 class="font-weight-bold m-0">
        Comments
      </h2>
    </b-col>
    <b-col cols="12" class="comments-stories-content p-0">
      <div v-for="comment in 10"
           :key="`comment_${comment}`"
           class="comments-stories-content-card">
        <comments-card/>
      </div>
      <b-row class="justify-content-center m-0 pt-4">
        <b-pagination v-model="currentPage"
                      class="pagination-custom-style"
                      pills
                      :total-rows="rows"></b-pagination>
      </b-row>
    </b-col>
  </div>
</template>

<script>
import CommentsCard from "@/components/Card/CommentsCard";
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