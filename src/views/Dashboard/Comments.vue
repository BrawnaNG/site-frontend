<template>
  <div class="stories-comment-page">

    <!-- header -->
    <div class="container-fluid stories-comment-page-head mx-auto py-3">
      <div class="row h-100 m-0">
        <div class="col-8 px-4 dashboard-page-head-title">
          <h4 class="m-0 px-4 bold">
            Dashboard
          </h4>
          <bread-crumbs 
            label="Comments"
            class="px-4"
          />
        </div>
        <div class="col-4 px-4 pt-2 mt-1 text-right">
          <add-story class="float-end" />
        </div>
      </div>
    </div>
    <!-- end header -->

    <user-menu />
    <div class="container-fluid stories-comment-page-head mx-auto py-3">
      <div class="row stories-comment-page-content mx-auto pt-4">
        <div class="row pb-2">
          <h2 class="mx-2 px-4">
            Comments
          </h2>
        </div>
      </div>
      <div 
        class="row comments-stories-content-card justify-content-left p-2 px-4"
        v-for="comment in comments.data"
        :key="`comment_${comment.id}`"
      >
        <div class="col-6 px-4">
          <comments-card 
            :comment-card="comment"
            :card-mode="'story'"
          />
        </div>
      </div>
      <div class="row p-2">
        <div 
          v-if="comments.data.length < comments.data.total"
          class="col-xl-2 mx-auto">
          <button 
            class="px-4 py-2 rounded-pill story-default-btn"
            @click="comments.page++">
            Show More
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, watch } from 'vue';
import CommentsCard from "@/components/Card/CommentsCard.vue";
import BreadCrumbs from "@/components/Dashboard/BreadCrumbs.vue";
import UserMenu from "@/components/Dashboard/UserMenu.vue";
import AddStory from "@/components/Dashboard/AddStory.vue";

// Lifecycle hooks
onMounted( async () => {
  await getComments();
});

import api from '@/services/api';

const comments = reactive({
  data: [],
  page: 1,
  total: 0
});

async function getComments() {
  try {
    const res = await api.get(`/comment/user-comment/?page=${comments.page}`);
    comments.total = res.data.count;
    comments.data = res.data.results;
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
}

watch(() => comments.page, () => {
  getComments();
});

onMounted(() => {
  getComments();
});


</script>