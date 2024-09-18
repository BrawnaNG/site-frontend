<template>
  <div class="home-wrapper">
    <b-col
      cols="12"
      class="home-head border"
    />
    <b-col
      cols="10"
      class="home-content mx-auto py-4 px-2"
    >
      <b-col cols="12">
        <b-col
          cols="12"
          class="home-content-big-card p-4"
        >
          <div class="big-card-head-title pb-3 px-1">
            <h6 class="m-0">
              Featured Article
            </h6>
          </div>
          <div class="big-card-title pb-3 px-1">
            <h2 class="m-0">
              Cats are great
            </h2>
          </div>
          <div class="big-card-content pb-4 px-1">
            <p class="m-0">
              The common house cat is a welcome addition to any family.
            </p>
          </div>
          <div class="big-card-footer pt-3 px-1">
            Username.Sep 24 | Category
          </div>
        </b-col>
      </b-col>


      <b-row class="home-content-story-card col-12 m-0 py-4 px-0">
        <b-col
          v-for="index in 6"
          :key="`story_${index}`"
          cols="4"
          class="p-3"
        >
          <story-mini-card />
        </b-col>
      </b-row>
    </b-col>
    <b-col
      cols="12"
      class="home-content-row py-4 my-5 px-0"
    >
      <b-row class="h-100 col-10 mx-auto px-3 my-0">
        <b-col
          cols="6"
          class="px-0"
        >
          <h3 class="m-0 text-white font-weight-bold">
            Want to learn more about how we help clients in Chemicals?
          </h3>
        </b-col>
        <b-col
          cols="6"
          class="text-right px-0 pt-1"
        >
          <b-button
            pill
            variant="light"
            class="story-default-btn bg-white pl-4 pr-2 py-2 font-weight-bold"
          >
            CTA Title Here
            <img
              src="../assets/image/icon/Go.svg"
              class="ml-2"
              alt="go"
            >
          </b-button>
        </b-col>
      </b-row>
    </b-col>
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
    </b-col>
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
    </b-col>
  </div>
</template>

<script>

import StoryMiniCard from "@/components/Card/StoryMiniCard.vue";
export default {
  name: 'HomeView',
  components: {StoryMiniCard},
}
</script>
<style scoped lang="scss">
.home-wrapper {

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