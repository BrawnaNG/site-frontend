<template>
  <div class="dashboard-page">
    <div class="container-fluid dashboard-page-head mx-auto py-3">
      <div class="row h-100 m-0 justify-content-between">
        <div class="col dashboard-page-head-title">
          <h4 class="m-0 bold">
            Dashboard
          </h4>
          <bread-crumbs 
            label="Drafts"
          />
        </div>
        <div class="col">
          <add-story class="float-end" />
        </div>
      </div>
    </div>
    <user-menu />
    <div class="container-fluid story-drafts-page-content mx-auto py-3">
      <div class="row pb-2 ps-3">
        <h2>
          Drafts
        </h2>
      </div>
      <template v-if="draftList.data.length">
        <div class="row p-2">
          <div 
            v-for="storyCard in draftList.data"
            :key="`draftStoryCard_${storyCard.id}`"
            class="col-md-12 col-lg-4 pb-3"
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
import { reactive, watch, onMounted } from 'vue';
import StoryLargeCard from "@/components/Card/StoryLargeCard.vue";
import BreadCrumbs from "@/components/Dashboard/BreadCrumbs.vue";
import UserMenu from "@/components/Dashboard/UserMenu.vue";
import AddStory from "@/components/Dashboard/AddStory.vue";
import api from '@/services/api';

const draftList = reactive({
  data: [],
  total: 0,
  page: 1
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