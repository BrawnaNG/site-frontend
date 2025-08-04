<template>
  <div class="saved-stories-page">
    <div class="container-fluid saved-stories-page-head mx-auto py-3">
      <div class="row h-100 m-0 justify-content-between">
        <div class="col dashboard-page-head-title">
          <h4 class="m-0 bold">
            Dashboard
          </h4>
          <bread-crumbs 
            label="Saved Stories"
          />
        </div>
        <div class="col">
          <add-story class="float-end" />
        </div>
      </div>
    </div>
    <user-menu />
    <div class="container-fluid saved-stories-page-content mx-auto py-3">
      <div class="row pb-2 ps-2">
        <h2>
          Saved Stories
        </h2>
      </div>
      <div>
        <div class="saved-stories container-flex">
          <template v-if="stories.data.length">
            <div class="row p-2">
              <div 
                v-for="storyCard in stories.data"
                :key="`recentStoryCard_${storyCard.id}`"
                class="col-md-12 col-lg-4 pb-3"
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
import { reactive, watch, onMounted } from 'vue';
import StoryLargeCard from "@/components/Card/StoryLargeCard.vue";
import BreadCrumbs from "@/components/Dashboard/BreadCrumbs.vue";
import UserMenu from "@/components/Dashboard/UserMenu.vue";
import AddStory from "@/components/Dashboard/AddStory.vue";
import api from '@/services/api';

const stories = reactive({
  data: [],
  page: 1,
  total: 0
});

async function getSavedStories() {
  try {
    const res = await api.get(`/story/save-story-list/?page=${stories.page}`);
    stories.total = res.data.count;
    stories.data = res.data.results;
  } catch (error) {
    console.error('Error fetching saved stories:', error);
  }
}

watch(() => stories.page, () => {
  getSavedStories();
});

onMounted(() => {
  getSavedStories();
});

</script>
