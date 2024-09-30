<template>
  <div class="container-flex story-drafts-page">
    <div class="row h-100 m-0">
      <div class="col-6 px-0">
        <div class="story-drafts-page-head-title px-0">
          <h4 class="m-0 font-weight-bolder">
            Dashboard
          </h4>
        </div>
        <bread-crumbs label="Drafts" />
      </div>
      <div class="col-6 px-0 pt-2 mt-1 text-right">
        <add-story />
      </div>
    </div>
    <user-menu />
    <div class="row story-drafts-page-content mx-auto py-5">
      <div class="pb-5">
        <h2 class="m-0">
          Drafts
        </h2>
      </div>

      <div>
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