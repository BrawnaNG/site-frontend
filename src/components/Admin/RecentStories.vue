<template>
  <div class="recent-stories">
    <template v-if="recentStories.data.length">
      <b-col
        v-for="storyCard in recentStories.data"
        :key="`storyCard_${storyCard.id}`"
        cols="12"
        class="p-0"
      >
        <story-large-card :story-card="storyCard" />
      </b-col>
      <b-row class="justify-content-center m-0 pt-4">
        <b-pagination
          v-model="recentStories.page"
          class="pagination-custom-style"
          pills
          :total-rows="recentStories.total"
        />
      </b-row>
    </template>
    <template v-else>
      <b-row class="m-0 p-5 justify-content-center align-items-center">
        <b-col
          cols="auto"
          class="p-4 text-center text-secondary"
        >
          Empty Data
        </b-col>
      </b-row>
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