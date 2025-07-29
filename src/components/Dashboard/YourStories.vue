<template>
  <div class="search-result-page">
    <div class="container-fluid search-result-page-content my-2 p-2">
      <div class="row pb-4 px-3">
        <h3 class="m-0">
          {{resultsCount}} stories
        </h3>
      </div>
      <template v-if="resultsCount > 0">
        <div 
          v-for="(chunk, row) in chunks"
          :key="`chunk_${row}`"
          class="row p-2"
        >
          <div
            v-for="story in chunk"
            :key="`story_${story.id}`"
            class="col-4"
          >
            <story-large-card 
              :story-card="story"
            />
          </div>
        </div>
        <div class="row p-2">
          <div 
            v-if="results.length < resultsCount"
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
        <div class="row m-0 p-5 justify-content-center align-items-center">
          <div class="col p-4 text-center text-secondary">
            You have not submitted any stories
          </div>
        </div>
      </template>
     </div> 
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import StoryLargeCard from "@/components/Card/StoryLargeCard.vue";
import api from '@/services/api';

const cols = 3;
const results = ref([]);
const page = ref(1);
const resultsCount = ref(0);

onMounted(() => {
  getStories;
});

const chunks = computed( () => {
  if (resultsCount.value > 0){
    return chunkResults(results.value);
  }
  return [];
});

const chunkResults = (results) => {
  let chunks = [];
  for (let i = 0; i < results.length; i+=cols){
    chunks.push(results.slice(i, i + cols));
  }
  return chunks;
}

const getStories = async () => {
  await api.get(`/story/mine/?page=${page.value}`).then(res => {
    results.value = res.data.results;
    resultsCount.value = res.data.count;
  });
};

</script>

<style scoped lang="scss">

</style>