<template>
  <div class="dashboard-page">
    <div class="container-fluid dashboard-page-head mx-auto py-3">
      <div class="row h-100 m-0">
        <div class="col-8 px-4 dashboard-page-head-title">
          <h4 class="m-0 px-4 bold">
            Dashboard
          </h4>
          <bread-crumbs 
            label="Your Stories"
            class="px-4"
          />
        </div>
        <div class="col-4 px-4 pt-2 mt-1 text-right">
          <add-story class="float-end" />
        </div>
      </div>
    </div>
    <user-menu />
    <div class="container-fluid story-drafts-page-content mx-auto py-5">
      <div class="row pb-2">
        <h2 class="mx-2 px-4">
          Your Stories
        </h2>
      </div>
      <template v-if="storyCount > 0">
        <div 
          v-for="(chunk, row) in chunks"
          :key="`storiesRow_${row}`"
          class="row p-2"
        >
          <div 
            v-for="storyCard in chunk"
            :key="`storycard_${storyCard.id}`"
            class="col-4"
          >
            <story-large-card
              :story-card="storyCard"
              :card-mode='"edit"'
            />
          </div>
        </div>
        <div class="row">
          <div 
            v-if="stories.length < storyCount"
            class="col-xl-2 mx-auto">
            <button 
              class="px-2 py-1 font-weight-bold rounded-pill home-default-btn"
              @click="advance">
              Show More
            </button>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="container-flex m-0 p-5 justify-content-center align-items-center">
          <div class="row p-4 text-center text-secondary">
            You have no published stories
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import StoryLargeCard from "@/components/Card/StoryLargeCard.vue";
import BreadCrumbs from "@/components/Dashboard/BreadCrumbs.vue";
import UserMenu from "@/components/Dashboard/UserMenu.vue";
import AddStory  from "@/components/Dashboard/AddStory.vue";
import api from '@/services/api';

const cols = 3;
const stories = ref([]);
const storyCount = ref(0);
const currentPage = ref(1);

const chunks = computed( () => {
  if (storyCount.value > 0){
    return chunkResults(stories.value);
  }
  return [];
});

const search = async (page, append) => {
    currentPage.value = page;
    await api.get(`/story/mine/?page=${page}`).then(res => {
      if (append){
        stories.value = stories.value.concat(res.data.results);
      }
      else{
        stories.value = res.data.results;
      }
      storyCount.value = res.data.count;
    });
}

onMounted( async () => {
    await initialSearch();
});

const initialSearch = () => {
  search(1, false);
}

const chunkResults = (results) => {
  let chunks = [];
  for (let i = 0; i < results.length; i+=cols){
    chunks.push(results.slice(i, i + cols));
  }
  return chunks;
}

const advance = () =>
{
  search(currentPage.value + 1, true);
}

</script>

<style scoped>

</style>