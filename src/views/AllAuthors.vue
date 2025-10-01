<template>
  <div class="authors-result-page">
    <div class="container-fluid authors-result-page-content my-2 p-3">
        <div class="row my-2 pb-3 col-12 mx-auto justify-content-between">
            <h2 class="m-0 bold">
                Authors
            </h2>
        </div>
      <div class="row pb-4 px-3">
        <h3 class="m-0">
          {{resultsCount}} authors found
        </h3>
      </div>
      <div class="row pb-4 px-3">
        <div class="col-md-auto" >
          <h3 @click="sortBy='alias'" :class="sortBy == 'alias' ? 'text-decoration-underline' :''">By Alias</h3>
        </div>
        <div class="col-md-auto" >
          <h3 @click="sortBy='storyCount'" :class="sortBy == 'storyCount' ? 'text-decoration-underline' :''">By Story Count</h3>
        </div>
      </div>
      <template v-if="resultsCount > 0">
        <div class="row pb-4 px-3">
          <div 
            v-for="(author) in authors"
            :key="`author_${author.id}`"
            class="col-md-12 col-lg-4 pb-3"
          >
              <router-link :to="{name: 'single-parent', params: {type: 'accounts', id: author.id}}">
                {{ author.alias }} ({{ author.story_count }})
              </router-link>
          </div>
        </div>
      </template>
    </div>
  </div>   
</template>

<script setup>
import {ref, onMounted, computed} from 'vue';
import api from '@/services/api';

const results = ref([]);
const resultsCount = ref(0);
const sortBy = ref('alias')

onMounted( () => {
    fetchAuthors();
});

const fetchAuthors = async () => {
    await api.get(`/story/list/author/`).then(res => {
        if (res && res.data){
            results.value = res.data;
            resultsCount.value = res.data.length;
        }
    });
};

const authors = computed( () => {
  if (sortBy.value === 'alias')
    return results.value.sort((a, b) => a.alias.localeCompare(b.alias));
  else 
    return results.value.sort((a, b) => b.story_count - a.story_count);
});

</script>
