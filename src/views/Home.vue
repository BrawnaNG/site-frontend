<template>
  <div class="container-fluid home-wrapper">
    <div class="row">
      <div class="col">
        <h1 class="home-head-title">
          Stories
        </h1>
      </div>
    </div>
    <template v-if="featuredStory">
      <div class="row">
        <div class="col big-card-head-title">
          <h6>
            Featured Story
          </h6>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <story-large-card 
            :card-mode="'read'"
            :story-card="featuredStory"
          />
        </div> 
      </div>
    </template>
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
        <story-mini-card 
          :card-mode="'mini'"
          :story-card="storyCard"
        />
      </div>
    </div>
  </div>
</template>
<script>

import StoryMiniCard from "@/components/Card/StoryMiniCard.vue";
import StoryLargeCard from "@/components/Card/StoryLargeCard.vue";
export default {
  name: 'HomeView',
  components: {StoryMiniCard, StoryLargeCard},
  data() {
    return {
      featuredStory: null,
      recentStories: [],
      cols: 3
    }
  },
  computed:{
    recent_story_chunks () {
      let chunks = [];
      for (let i = 0; i < this.recentStories.length; i+=this.cols){
        chunks.push(this.recentStories.slice(i, i + this.cols));
      }
      return chunks;
    }
  },
  mounted() {
    this.getFeaturedStory();
    this.getRecentStories();
  },
  methods: {
    getFeaturedStory() {
      this.axios.get(`/story/featured/`).then(res => {
        this.featuredStory = res.data[0]
      })
    },
    getRecentStories(){
      this.axios.get(`/story/list/?page=1`).then(res => {
        this.recentStories = res.data.results.slice(0,6)
      })
    }
  }
}
</script>
<style scoped lang="scss">
.home-wrapper {

  .home-head {
    &-title {
      font-size: 6em;
    }
  }

  .home-content {
    &-big-card {
      border: .8px solid #EFEFEF;
      .big-card {
        &-head-title {
          color: #A7A7A7;
        }
        &-content {
          font-size: .9em;
          color: #363636;
        }
        &-footer {
          font-size: .74em;
          color: #A7A7A7;
        }
      }
    }

    &-row {
      background-color: black;

    }
  }
  .home-section {
    &-title {
      color: #A7A7A7;
    }
    &-view-all {
      text-decoration: underline;
    }
  }

}
</style>