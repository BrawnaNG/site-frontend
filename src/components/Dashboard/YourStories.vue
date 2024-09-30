<template>
  <div class="your-stories container-flex">
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
  computed:{
    recent_story_chunks () {
      let chunks = [];
      for (let i = 0; i < this.recentStories.data.length; i+=this.cols){
        chunks.push(this.recentStories.data.slice(i, i + this.cols));
      }
      return chunks;
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