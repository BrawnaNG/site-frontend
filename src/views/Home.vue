<template>
  <div class="container-fluid home-wrapper">
    <div class="row">
      <div class="col">
        <div class="home-head-title bold">
          Stories
        </div>
      </div>
    </div>
    <template v-if="featuredStory">
      <div class="row pb-2">
        <div class="col home-section-title">
            Featured Story
        </div>
      </div>
      <div class="row pb-2">
        <div class="col">
          <story-large-card 
            :card-mode="'read'"
            :story-card="featuredStory"
          />
        </div> 
      </div>
    </template>
    <div class="row pb-2">
      <div class="col home-section-title">
          Recent Stories
      </div>
    </div>
    <div class="row pb-4">
      <div 
        v-for="storyCard in recentStories"
        :key="`recentStoryCard_${storyCard.id}`"
        class="col-md-12 col-lg-4 pb-3"
      >
        <story-mini-card 
          :story-card="storyCard"
        />
      </div>
    </div>
    <div class="row p-2">
      <div class="col-xl-2 mx-auto">
        <button 
          class="px-4 py-2 rounded-pill story-default-btn"
          @click="loadMore">
          Show More
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import StoryMiniCard from "@/components/Card/StoryMiniCard.vue";
import StoryLargeCard from "@/components/Card/StoryLargeCard.vue";
import api from "@/services/api";

const featuredStory = ref(null);
const recentStories = ref([]);
const page = ref(1);

// Lifecycle hooks
onMounted(() => {
  getFeaturedStory();
  getRecentStories();
});

// Methods
async function getFeaturedStory() {
  await api.get(`/story/featured/`).then( 
    (res) => {
      featuredStory.value = res.data[0];
    }
  );
}

async function getRecentStories() {
  page.value = 1;
  await api.get(`/story/list/?page=1`).then(
    (res) => {
      recentStories.value = res.data.results.slice(0, 12);
    }
  );
}

async function loadMore() {
  page.value++;
  await api.get(`/story/list/?page=${page.value}`).then(
    (res) => {
      const newstories = res.data.results.slice(0, 12);
      recentStories.value = recentStories.value.concat(newstories);
    }
  );
}

</script>
<style scoped lang="scss">
.home-wrapper {

  padding-right: 5%;
  padding-left: 5%;
  padding-top: 2%;

  .home-head {
    &-title {
      font-size: 3.5em;
      font-weight: 600;
    }
  }

  .home-section {
    &-title {
      color: #808080;
    }
    &-view-all {
      text-decoration: underline;
    }
  }

}
</style>
