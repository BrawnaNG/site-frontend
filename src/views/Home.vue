<template>
  <div class="home-wrapper">
    <b-col
      cols="12"
      class="home-head border"
    >
      <div class="pb-6 px-1">
        <h1 class="m-0 home-head-title">
          Stories
        </h1>
      </div>
    </b-col>
    <b-col
      cols="10"
      class="home-content mx-auto py-4 px-2"
    >
      <template v-if="featuredStory">
        <b-col cols="12">
          <b-col
            cols="12"
            class="home-content-big-card p-4"
          >
            <div class="big-card-head-title pb-3 px-1">
              <h6 class="m-0">
                Featured Story
              </h6>
            </div>
            <story-large-card 
              :card-mode="read"
              :story-card="featuredStory"
            />
          </b-col>
        </b-col>
      </template>

      <b-row class="home-content-story-card col-10 mx-auto my-0 py-4 px-0">
        <b-col
          v-for="storyCard in recentStories"
          :key="`storyCard_${storyCard.id}`"
          cols="3"
          class="p-3"
        >
          <story-mini-card 
            :card-mode="mini"
            :story-card="storyCard"
          />
        </b-col>
      </b-row>
    </b-col>
    
    <!--
    <b-col
      cols="12"
      class="home-section border-bottom mx-auto py-4 px-2"
    >
      <b-row class="col-10 py-2 mx-auto">
        <b-col
          cols="6"
          class="home-section-title px-0"
        >
          <h4 class="m-0 font-weight-bold">
            Title for this section
          </h4>
        </b-col>
        <b-col
          cols="6"
          class="px-0 text-right"
        >
          <router-link to="/">
            <h4 class="home-section-view-all m-0 text-dark font-weight-bold ">
              View All
            </h4>
          </router-link>
        </b-col>
      </b-row>

    <b-col
      cols="12"
      class="home-section border-bottom mx-auto py-4 mt-2 px-2"
    >
      <b-row class="col-10 py-2 mx-auto">
        <b-col
          cols="6"
          class="home-section-title px-0"
        >
          <h4 class="m-0 font-weight-bold">
            Title for this section
          </h4>
        </b-col>
        <b-col
          cols="6"
          class="px-0 text-right"
        >
          <router-link to="/">
            <h4 class="home-section-view-all m-0 text-dark font-weight-bold ">
              View All
            </h4>
          </router-link>
        </b-col>
      </b-row>
      <b-row class="home-content-story-card col-10 mx-auto my-0 py-4 px-0">
        <b-col
          v-for="index in 4"
          :key="`story_${index}`"
          cols="3"
          class="p-3"
        >
          <story-mini-card card-mode="mini" />
        </b-col>
      </b-row>
      <b-col
        cols="12"
        class="py-4 text-center"
      >
        <b-button
          pill
          variant="outline-dark"
          class="story-default-btn pl-4 pr-2 py-2 font-weight-bold"
        >
          Show More
          <img
            src="../assets/image/icon/Go.svg"
            class="ml-2"
            alt="go"
          >
        </b-button>
      </b-col>
    </b-col>-->
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
      recentStories: []
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