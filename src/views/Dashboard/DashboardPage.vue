<template>
  <div class="dashboard-page">
    <div class="container-fluid dashboard-page-head mx-auto py-3">
      <div class="row h-100 m-0 justify-content-between">
        <div class="col dashboard-page-head-title">
          <h4 class="m-0 bold">
            Dashboard
          </h4>
          <bread-crumbs 
            label="Your Stories"
          />
        </div>
        <div class="col">
          <add-story class="float-end" />
        </div>
      </div>
    </div>
    <user-menu />
    <div class="container-fluid story-drafts-page-content mx-auto py-3">
      <div class="row pb-2 ps-2">
        <h2>
          Your Stories
        </h2>
      </div>
      <template v-if="storyCount > 0">
        <div class="row p-2">
          <div 
            v-for="storyCard in stories"
            :key="`storycard_${storyCard.id}`"
            class="col-md-12 col-lg-4 pb-3"
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
import { ref, onMounted } from 'vue';
import StoryLargeCard from "@/components/Card/StoryLargeCard.vue";
import BreadCrumbs from "@/components/Dashboard/BreadCrumbs.vue";
import UserMenu from "@/components/Dashboard/UserMenu.vue";
import AddStory  from "@/components/Dashboard/AddStory.vue";
import api from '@/services/api';

const stories = ref([]);
const storyCount = ref(0);
const currentPage = ref(1);

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

const advance = () =>
{
  search(currentPage.value + 1, true);
}

</script>