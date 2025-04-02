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
      <div class="row pb-4">
        <div class="col">
          <story-large-card 
            :card-mode="'read'"
            :story-card="featuredStory"
          />
        </div> 
      </div>
    </template>
    <div class="row">
      <div class="col home-section-title">
        <h6>
          Recent Stories
        </h6>
      </div>
    </div>
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
    <div class="row p-2">
      <div class="col-xl-2 mx-auto">
        <button 
          class="px-2 py-1 font-weight-bold rounded-pill home-default-btn"
          @click="loadMore">
          Show More
        </button>
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
      cols: 3,
      page: 1
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
    async getFeaturedStory() {
      await this.axios.get(`/story/featured/`).then(res => {
        this.featuredStory = res.data[0];
      })
    },
    async getRecentStories(){
      this.page = 1;
      await this.axios.get(`/story/list/?page=1`).then(res => {
        this.recentStories = res.data.results.slice(0,12);
      })
    },
    async loadMore(){
      this.page++;
      await this.axios.get(`/story/list/?page=${this.page}`).then(res => {
        let newstories = res.data.results.slice(0,12);
        this.recentStories = this.recentStories.concat(newstories);
      })
    },
  }
}
</script>
<style scoped lang="scss">
.home-wrapper {

  padding-right: 5%;
  padding-left: 5%;
  padding-top: 2%;
  font-family: NotoSerif-Regular;

  .home-head {
    &-title {
      font-family: NotoSerif-Bold;
      font-size: 6em;
    }
  }

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

  .home-section {
    &-title {
      color: #A7A7A7;
    }
    &-view-all {
      text-decoration: underline;
    }
  }

  .home-default-btn {
    background-color: black;
    color: white;
    img {
      width: 2vw;
    }
  }

}
</style>