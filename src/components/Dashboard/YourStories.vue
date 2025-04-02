<template>
  <div class="your-stories container-flex">
    <template v-if="recentStories.data.length">
      <div 
        v-for="storyCard in recentStories.data"
        :key="`recentStoryCard_${storyCard.id}`"
        class="col-12"
      >
        <story-large-card
          :story-card="storyCard"
          :card-mode="'edit'"
        />
      </div>
      <div class="row">
        TODO PAGINATION
      </div>
    </template>
    <template v-else>
      <div class="row m-0 p-5 justify-content-center align-items-center">
        <div class="col p-4 text-center text-secondary">
          You have not submitted any stories
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import StoryLargeCard from "@/components/Card/StoryLargeCard.vue";

export default {
  name: "YourStories",
  components: {StoryLargeCard},
  data() {
    return {
      cols: 3,
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
      this.axios.get(`/story/mine/?page=${this.recentStories.page}`).then(res => {
        this.recentStories.total = res.data.count
        this.recentStories.data = res.data.results
      })
    }
  }

}
</script>

<style scoped lang="scss">

</style>