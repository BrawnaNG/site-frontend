<template>
  <div class="dashboard-page">
    <div class="container-fluid dashboard-page-head mx-auto py-3">
      <div class="row h-100 m-0">
        <div class="col-8 px-4 dashboard-page-head-title">
          <h4 class="m-0 px-4 bold">
            Dashboard
          </h4>
          <bread-crumbs 
            label="Drafts"
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
          Drafts
        </h2>
      </div>
      <template v-if="draftList.data.length">
        <div 
          v-for="(chunk, row) in recent_story_chunks"
          :key="`draftStoriesRow_${row}`"
          class="row p-2"
        >
          <div 
            v-for="storyCard in chunk"
            :key="`draftStoryCard_${storyCard.id}`"
            class="col-4"
          >
            <story-large-card
              :story-card="storyCard"
              :card-mode='"edit"'
            />
          </div>
        </div>
        <div class="row p-2">
          <div 
            v-if="draftList.data.length < draftList.total"
            class="col-xl-2 mx-auto">
            <button 
              class="px-4 py-2 rounded-pill story-default-btn"
              @click="draftList.page++">
              Show More
            </button>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="container-flex m-0 p-5 justify-content-center align-items-center">
          <div class="row p-4 text-center text-secondary">
            You have no story drafts
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue';
import StoryLargeCard from "@/components/Card/StoryLargeCard.vue";
import BreadCrumbs from "@/components/Dashboard/BreadCrumbs.vue";
import UserMenu from "@/components/Dashboard/UserMenu.vue";
import AddStory from "@/components/Dashboard/AddStory.vue";
import api from '@/services/api';

const cols = ref(3);
const draftList = reactive({
  data: [],
  total: 0,
  page: 1
});

const recent_story_chunks = computed(() => {
  let chunks = [];
  for (let i = 0; i < draftList.data.length; i += cols.value) {
    chunks.push(draftList.data.slice(i, i + cols.value));
  }
  return chunks;
});

async function getDraftStories() {
  try {
    const res = await api.get(`/story/mine/?page=${draftList.page}&draft=1`);
    draftList.total = res.data.count;
    draftList.data = res.data.results;
  } catch (error) {
    console.error('Error fetching draft stories:', error);
  }
}

watch(() => draftList.page, () => {
  getDraftStories();
});

onMounted(() => {
  getDraftStories();
});
</script>

<style scoped>

</style>
