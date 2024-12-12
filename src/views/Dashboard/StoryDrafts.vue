<template>
  <div class="dashboard-page">
    <div class="container-fluid dashboard-page-head mx-auto py-3">
      <div class="row h-100 m-0">
        <div class="col-8 px-4 dashboard-page-head-title">
          <h4 class="m-0 px-4 font-weight-bolder">
            Dashboard
          </h4>
          <bread-crumbs 
            label="Drafts"
            class="px-4"
          />
        </div>
        <div class="col-4 px-4 pt-2 mt-1 text-right">
          <add-story class="float-end" />
        </div>
      </div>
    </div>
    <user-menu />
    <div class="container-fluid story-drafts-page-content mx-auto py-5">
      <div class="row pb-2">
        <h2 class="mx-2 px-4">
          Drafts
        </h2>
      </div>
      <template v-if="draftList.data.length">
        <div 
          v-for="(chunk, row) in recent_story_chunks"
          :key="`draftStoriesRow_${row}`"
          class="row p-2"
        >
          <div 
            v-for="storyCard in chunk"
            :key="`draftStoryCard_${storyCard.id}`"
            class="col-4"
          >
            <story-large-card
              :story-card="storyCard"
              :card-mode='"edit"'
            />
          </div>
        </div>
        <div class="row">
          TODO PAGINATION
        </div>
      </template>
      <template v-else>
        <div class="container-flex m-0 p-5 justify-content-center align-items-center">
          <div class="row p-4 text-center text-secondary">
            You have no story drafts
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import StoryLargeCard from "@/components/Card/StoryLargeCard.vue";
import BreadCrumbs from "@/components/Dashboard/BreadCrumbs.vue";
import UserMenu from "@/components/Dashboard/UserMenu.vue";
import AddStory  from "@/components/Dashboard/AddStory.vue";

export default {
  name: "StoryDrafts",
  components: {StoryLargeCard, BreadCrumbs, UserMenu, AddStory },
  data() {
    return {
      cols: 3,
      draftList: {
        data: [],
        total: 0,
        page: 1
      }
    }
  },
  computed:{
    recent_story_chunks () {
      let chunks = [];
      for (let i = 0; i < this.draftList.data.length; i+=this.cols){
        chunks.push(this.draftList.data.slice(i, i + this.cols));
      }
      return chunks;
    }
  },
  watch: {
    'draftList.page'() {
      this.getDraftStories()
    }
  },
  mounted() {
    this.getDraftStories()
  },
  methods: {
    getDraftStories() {
      this.axios.get(`/story/mine/?page=${this.draftList.page}&draft=1`).then(res => {
        this.draftList.total = res.data.count
        this.draftList.data = res.data.results
      })
    }
  }
}
</script>

<style scoped>

</style>