<template>
  <div class="saved-stories-page">
    <div class="saved-stories-head border-bottom">
      <b-row class="m-0 py-3 justify-content-between col-10 my-0 mx-auto">
        <b-col cols="auto" class="px-0">
          <h2 class="m-0 pt-1">
            You Don`t fill my pain
          </h2>
          <div class="pt-3">
            Username • Sep 22  | Category
          </div>
        </b-col>
        <b-col cols="auto" class="pt-4 px-0">
          <span class="pr-3">
            <img class="pt-1 cursor-pointer" src="../../assets/image/icon/Bookmark.svg" alt="">
          </span>
          <span>
            <img class="pt-1 cursor-pointer" src="../../assets/image/icon/Send.svg" alt="">
          </span>
        </b-col>

      </b-row>
    </div>
    <b-col cols="10" class="border border-warning mx-auto pt-5 px-0">
      <b-row class="m-0 ">
        <b-col cols="3" class="m-0 border">

        </b-col>
        <b-col cols="6" class="m-0 border">

          <div class="border pb-5">
            <h4 class="m-0 font-weight-bolder pt-1">
              Chapter01:Daily Plans Foor You
            </h4>
          </div>
          <div class="border pt-5">
            <div class="card-content-add-reply pt-4 mt-1">
              <b-row class="card-content-add-reply-input m-0">
                <b-col cols="auto" class="border p-0">
                  <b-avatar text="BV" size="3rem"></b-avatar>
                </b-col>
                <b-col cols="auto" class="border">
                  <b-form-textarea placeholder="Write your reply"
                                   rows="3"
                                   no-resize
                  ></b-form-textarea>
                </b-col>

              </b-row>
              <div class="card-content-add-reply-btn text-right mt-3">
                <b-button @click="addReply = false" pill variant="dark" class="font-weight-bold px-4 py-2">
                  Post
                </b-button>
              </div>
            </div>
          </div>
          <div class="border mt-3">
            <div v-for="comment in 10"
                 :key="`comment_${comment}`"
                 class="comments-stories-content-card">
              <comments-card/>
            </div>
          </div>
          <div class="border"></div>
        </b-col>
      </b-row>
    </b-col>
    <b-col cols="10" class="saved-stories-footer px-0 py-4 mt-4 mx-auto">
      <b-row class="py-2 m-0">
        <b-col cols="6" class="home-section-title px-0">
          <h4 class="m-0 font-weight-bold">
            Title for this section
          </h4>
        </b-col>
        <b-col cols="6" class="px-0 text-right">
          <router-link to="/">
            <h4 class="home-section-view-all m-0 text-dark font-weight-bold ">
              View All
            </h4>
          </router-link>
        </b-col>
      </b-row>
      <b-row class="home-content-story-card my-0 py-4 px-0">

          <b-col v-for="index in 4"
                 :key="`story_${index}`"
                 cols="3" class="p-3">
           <story-mini-card  card-mode="mini"/>
          </b-col>
        </b-row>
    </b-col>
  </div>
</template>

<script>
import CommentsCard from "@/components/Card/CommentsCard";
import StoryMiniCard from "@/components/Card/StoryMiniCard";
export default {
  name: "ShowStory",
  components: {CommentsCard, StoryMiniCard},
}
</script>

<style scoped lang="scss">
</style>