<template>
  <div class="saved-stories-page">
    <div class="container=fluid saved-stories-page-head mx-auto py-3">
      <div class="row h-100 m-0">
        <div class="col-6 px-0">
          <div class="col-6 dashboard-page-head-title px-0">
            <h4 class="m-0 font-weight-bolder">
              Dashboard
            </h4>
          </div>
          <bread-crumbs label="Saved Stories" />
        </div>
      </div>
    </div>
    <user-menu />
    <div class="container-flex saved-stories-page-content mx-auto py-5">
      <div class="pb-5">
        <h2 class="m-0">
          Saved Stories
        </h2>
      </div>
      <div>
        <div class="saved-stories container-flex">
          <template v-if="recentStories.data.length">
            <div 
              v-for="(chunk, row) in recent_story_chunks"
              :key="`recentStoriesRow_${row}`"
              class="row p-2"
            >
              <div 
                v-for="storyCard in chunk"
                :key="`recentStoryCard_${storyCard.id}`"
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
            <div class="row m-0 p-5 justify-content-center align-items-center">
              <div class="col p-4 text-center text-secondary">
                You have not saved any stories
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StoryLargeCard from "@/components/Card/StoryLargeCard.vue";
import BreadCrumbs from "@/components/Dashboard/BreadCrumbs.vue";
import UserMenu from "@/components/Dashboard/UserMenu.vue";

export default {
  name: "SavedStories",
  components: {StoryLargeCard, BreadCrumbs, UserMenu},
  data() {
    return {
      breadcrumb: [
        {
          text: 'Home',
          href: '/'
        },
        {
          text: 'Dashboard',
          href: '#/dashboard/your-stories'
        },
        {
          text: 'Saved Stories',
        }
      ],
      recentStories: {
        data: [],
        page: 1,
        total: 0
      }
    }
  },
  watch: {
    'recentStories.page'() {
      this.getRecentStories()
    }
  },
  mounted() {
    this.getRecentStories()
  },
  methods: {

    getRecentStories() {
      this.axios.get(`/story/save-story-list/?page=${this.recentStories.page}`).then(res => {
        this.recentStories.total = res.data.count
        this.recentStories.data = res.data.results
      })
    }
  }
}
</script>

<style scoped>

</style>