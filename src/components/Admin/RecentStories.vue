<template>
  <div class="container-flex recent-stories">
    <template v-if="recentStories.data.length">
      <div
        v-for="storyCard in recentStories.data"
        :key="`storyCard_${storyCard.id}`"
        cols="12"
        class="row p-0"
      >
        <story-large-card :story-card="storyCard" />
      </div>
      <div class="row justify-content-center m-0 pt-4">
        TODO - PAGINATION
      </div>
    </template>
    <template v-else>
      <div class="row m-0 p-5 justify-content-center align-items-center">
        <div class="col p-4 text-center text-secondary">
          No recent stories
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import StoryLargeCard from "@/components/Card/StoryLargeCard.vue";

export default {
  name: "RecentStories",
  components: {StoryLargeCard},
  data() {
    return {
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
      this.axios.get(`/story/list/?page=${this.recentStories.page}`).then(res => {
        this.recentStories.total = res.data.count
        this.recentStories.data = res.data.results
      })
    }
  }
}
</script>

<style scoped lang="scss">

</style>