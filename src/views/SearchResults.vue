<template>
  <div class="search-result-page">

    <!-- Header -->
    <div class="container-flex search-result-page-head border-bottom pb-4">
      <div class="row my-0 mx-auto justify-content-start">
        <div class="col-md-auto p-2">
          <h2 class="m-0 pe-4 font-weight-bolder">
            Results for "{{ searchTextDisplay }}"
          </h2>
        </div>
        <div class="col-md-auto ps-1">
          <input
                v-model="searchTextInput"
                class="form-control"
                placeholder="Search story, author or tags"
                @keydown.enter="updateSearch"
              >
        </div>
        <div class="col-md-auto mt-2 ps-0">
          <button 
            class="btn btn-dark mx-2 mt-1"
            type="button"
            aria-label="Search"
            @click="updateSearch"
          >
          Search
          </button>
          <button 
            class="btn btn-secondary mx-2 mt-1"
            type="button"
            aria-label="Clear"
            @click="clearSearch"
          >
          Clear
          </button>
        </div>
      </div>
    </div>
    <!-- End header -->

    <!-- Story Results -->
    <div class="container-fluid mt-4">
      <div class="row">
        <h3 class="mb-2">
          Stories: {{stories.count}} found
        </h3>
      </div>
      <div v-if="stories.count > 0">
        <div class="row py-2">
          <div
            v-for="story in stories.results"
            :key="`story_${story.id}`"
            class="col-md-12 col-lg-4 pb-3"
          >
            <story-mini-card 
              :story-card="story"
            />
          </div>
        </div>
        <div class="row p-2">
          <div 
            v-if="stories.results.length < stories.count"
            class="col-xl-2 mx-auto">
            <button 
              class="px-4 py-2 rounded-pill story-default-btn"
              @click="advanceStorySearch">
              Show More
            </button>
          </div>
        </div>
      </div>  
      <!-- End Story Results -->
      <div v-else>
        <div class="row m-0 w-100 h-100 font-size-8 font-weight-bold text-secondary justify-content-center align-items-center">
          No Stories found.
        </div>
      </div>
    </div>

    <!-- Author Results -->
    <div class="container-flex mt-4">
      <div class="row mx-auto my-0">
        <div class="mb-2">
          <h3 class="m-0">
            Authors: {{authors.count}} found
          </h3>
        </div>
        <div v-if="authors.count > 0">
          <div class="row py-2">
            <div
              v-for="author in authors.results"
              :key="`author_${author.id}`"
              class="col-md-12 col-lg-4 pb-3"
            >
              <author-mini-card 
                :author-card="author"
              />
            </div>
          </div>
          <div 
            v-if="authors.results.length < authors.count"
            class="col-xl-2 mx-auto">
            <button 
              class="px-4 py-2 rounded-pill story-default-btn"
              @click="advanceAuthorSearch">
              Show More
            </button>
          </div>
        </div>
        <div v-else>
          <div class="row m-0 h-100 font-size-8 font-weight-bold text-secondary justify-content-center align-items-center">
            No Authors found.
          </div>
        </div>
      </div>
    </div>
    <!-- End Author results-->

    <div class="container-flex pt-4">
      <div class="row mx-auto my-0">
        <div class="mb-2">
          <h3 class="m-0">
            Tags: {{ tags.count }} found
          </h3>
        </div>
        <template v-if="tags.count > 0">
          <div class="row py-2">
            <div
                v-for="tag in tags.results"
                :key="`tag_${tag.id}`"
                class="col-md-12 col-lg-4 pb-3"
              >
                <tag-mini-card 
                  :tag-card="tag"
                />
            </div>
          </div>
          <div 
            v-if="tags.results.length < tags.count"
            class="col-xl-2 mx-auto">
            <button 
              class="px-4 py-2 rounded-pill story-default-btn"
              @click="advanceTagSearch">
              Show More
            </button>
          </div>
        </template>
        <template v-else>
          <div class="row m-0 h-100 font-size-8 font-weight-bold text-secondary justify-content-center align-items-center">
            No Tags found.
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import StoryMiniCard from "@/components/Card/StoryMiniCard.vue";
import AuthorMiniCard from "@/components/Card/AuthorMiniCard.vue";
import TagMiniCard from "@/components/Card/TagMiniCard.vue";
import {ref, watch, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '@/services/api';
import { useSearchStore } from "@/stores/search";
import { storeToRefs } from 'pinia';


const route = useRoute();
const router = useRouter();
const searchStore = useSearchStore();

const searchTextDisplay = ref();
const searchTextInput = ref();

const stories = reactive({
  results: [],
  count: 0,
  page: 1
});

const authors = reactive({
  results: [],
  count: 0,
  page: 1
});

const tags = reactive({
  results: [],
  count: 0,
  page: 1
});

const searchTextProps = ref(route.params.search);

const { searchText } = storeToRefs(searchStore);

watch(
  () => route.params.search,
  (newSearchText, oldSearchText) => {
    if (newSearchText && newSearchText != oldSearchText){
      searchStore.setSearchText(newSearchText);
      initialSearch();
    }
  }
)

onMounted( () => {
  searchStore.setSearchText(searchTextProps.value);
  initialSearch();
});

// Methods
const updateSearch = () => {
  searchStore.setSearchText(searchTextInput.value);
  router.push({name: 'searchResults',
    params: {
      search: searchTextInput.value
    }});
  initialSearch();  
}

const initialSearch = () => {
  searchTextDisplay.value = searchText.value;
  searchTextInput.value = searchText.value;
  storySearch(1, false);
  authorSearch(1, false);
  tagSearch(1, false);
}

const storySearch = async (page, append) => {
  if (searchText.value){
    stories.page = page;
    await api.get(`/story/search/story?q=${searchText.value}&page=${page}`).then(res => {
      if (append){
        stories.results = stories.results.concat(res.data.results);
      }
      else{
        stories.results = res.data.results;
      }
      stories.count = res.data.count;
    });
  }
}

const advanceStorySearch = () =>
{
  storySearch(stories.page + 1, true);
}

const authorSearch = async (page, append) => {
  if (searchText.value){
    authors.page = page;
    await api.get(`/story/search/author?author=${searchText.value}&page=${page}`).then(res => {
      if (append){
        authors.results = authors.results.concat(res.data.results);
      }
      else{
        authors.results = res.data.results;
      }
      authors.count = res.data.count;
    });
  }
}

const advanceAuthorSearch = () => {
  authorSearch(authors.page+1, true);
}

const tagSearch = async (page, append)  => {
  if (searchText.value){
    tags.page = page;
    await api.get(`/story/search/tag?tag=${searchText.value}&page=${page}`).then(res => {
      if (append){
        tags.results = tags.results.concat(res.data.results);
      }
      else{
        tags.results = res.data.results;
      }
      tags.count = res.data.count;
    })
  }
}
    
const advanceTagSearch = () => {
  authorSearch(tagPage.value+1, true);
}

const clearSearch = () => {
  stories.results = [];
  stories.count = 0;
  stories.page = 1;
  authors.results = [];
  authors.count = 0;
  authors.page = 1;
  tags.results = [];
  tags.count = 0;
  tags.page = 1;
  searchTextDisplay.value = "";
  searchTextInput.value = '';
  searchStore.setSearchText("");
}

</script>

<style scoped lang="scss">
  .search-result-page {
    padding-right: 5%;
    padding-left: 5%;
    padding-top: 2%;
  }
</style>