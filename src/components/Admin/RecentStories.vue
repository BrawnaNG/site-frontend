<template>
  <div class="container-flex recent-stories">
    <template v-if="recentStories.data.length">
      <div
        v-for="storyCard in recentStories.data"
        :key="`storyCard_${storyCard.id}`"
        cols="12"
        class="row p-0"
      >
        <story-large-card :story-card="storyCard" />
      </div>
      <div class="row justify-content-center m-0 pt-4">
        TODO - PAGINATION
      </div>
    </template>
    <template v-else>
      <div class="row m-0 p-5 justify-content-center align-items-center">
        <div class="col p-4 text-center text-secondary">
          No recent stories
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from 'vue';
import StoryLargeCard from "@/components/Card/StoryLargeCard.vue";
import api from '@/services/api';

const recentStories = reactive({
  data: [],
  page: 1,
  total: 0
});

async function getRecentStories() {
  try {
    const res = await api.get(`/story/list/?page=${recentStories.page}`);
    recentStories.total = res.data.count;
    recentStories.data = res.data.results;
  } catch (error) {
    console.error('Error fetching recent stories:', error);
  }
}

watch(() => recentStories.page, () => {
  getRecentStories();
});

onMounted(() => {
  getRecentStories();
});
</script>

<style scoped lang="scss">

</style>
