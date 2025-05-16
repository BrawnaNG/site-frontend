<template>
    <div class="search-result-page">

        <div class="container-fluid search-result-page-content my-2 p-2">
            <div class="row my-2 pb-3 col-12 mx-auto justify-content-between">
                <h2 class="m-0 font-weight-bolder">
                    Author: {{authorName}}
                </h2>
            </div>

          <div class="row pb-4 px-3">
            <h3 class="m-0">
              {{resultsCount}} stories found
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
                <story-mini-card 
                  :card-mode="'mini'"
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
            <div class="row m-0 w-100 h-100 font-size-8 font-weight-bold text-secondary justify-content-center align-items-center">
              No Stories found.
            </div>
          </template>
        </div>
    </div>
</template>

<script setup>
import StoryMiniCard from "@/components/Card/StoryMiniCard.vue";
import {ref, onMounted, computed} from 'vue';
import api from '@/services/api';
import { useRoute } from 'vue-router';

const route = useRoute();
const results = ref([]);
const resultsCount = ref(0);
const cols = 3;
const currentPage = ref(1);
const authorName = ref("");
const author_id= ref(route.params.author_id);

onMounted( async () => {
    await authorInfo();
    await initialSearch();
});

const chunks = computed( () => {
  if (resultsCount.value > 0){
    return chunkResults(results.value);
  }
  return [];
});

const initialSearch = () => {
  authorSearch(1, false);
}

const authorInfo = async () => {
    await api.get(`/accounts/info/${author_id.value}/`).then(res => {
        if (res && res.data){
            authorName.value = res.data.name;
        }
    });
};

const chunkResults = (results) => {
  let chunks = [];
  for (let i = 0; i < results.length; i+=cols){
    chunks.push(results.slice(i, i + cols));
  }
  return chunks;
}

const authorSearch = async (page, append) => {
    currentPage.value = page;
    await api.get(`/story/byauthor/${author_id.value}?page=${page}`).then(res => {
      if (append){
        results.value = results.value.concat(res.data.results);
      }
      else{
        results.value = res.data.results;
      }
      resultsCount.value = res.data.count;
    });
}

const advance = () =>
{
  authorSearch(currentPage.value + 1, true);
}

</script>

<style scoped lang="scss">
    .search-result-page {
    &-content {
        &-story {
        height: 570px;
        overflow-y: auto;
        }
        &-author,
        &-tag {
        height: 300px;
        overflow-y: auto;
        }
    }
    }
</style>