<template>
  <div class="saved-stories-page">
    <div class="container-fluid saved-stories-page-head mx-auto py-3">
      <div class="row h-100 m-0">
        <div class="col-8 px-4 dashboard-page-head-title">
          <h4 class="m-0 px-4 bold">
            Dashboard
          </h4>
          <bread-crumbs 
            label="Saved Stories"
            class="px-4"
          />
        </div>
        <div class="col-4 px-4 pt-2 mt-1 text-right">
          <add-story class="float-end" />
        </div>
      </div>
    </div>
    <user-menu />
    <div class="container-fluid saved-stories-page-content mx-auto py-5">
      <div class="row pb-2">
        <h2 class="mx-2 px-4">
          Saved Stories
        </h2>
      </div>
      <div>
        <div class="saved-stories container-flex">
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
          </template>
          <template v-else>
            <div class="row m-0 p-5 justify-content-center align-items-center">
              <div class="col p-4 text-center text-secondary">
                You have not saved any stories
              </div>
            </div>
          </template>
        </div>
      </div>
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

const recentStories = reactive({
  data: [],
  page: 1,
  total: 0
});

const cols = ref(3);

const recent_story_chunks = computed(() => {
  let chunks = [];
  for (let i = 0; i < recentStories.data.length; i += cols.value) {
    chunks.push(recentStories.data.slice(i, i + cols.value));
  }
  return chunks;
});

async function getRecentStories() {
  try {
    const res = await api.get(`/story/save-story-list/?page=${recentStories.page}`);
    recentStories.total = res.data.count;
    recentStories.data = res.data.results;
  } catch (error) {
    console.error('Error fetching saved stories:', error);
  }
}

watch(() => recentStories.page, () => {
  getRecentStories();
});

onMounted(() => {
  getRecentStories();
});

</script>

<style scoped>

</style>
