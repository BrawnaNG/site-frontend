<template>
  <div class="search-result-page">

    <!-- Header -->
    <div class="container-flex search-result-page-head border-bottom py-4">
      <div class="row my-0 mx-auto justify-content-start">
        <div class="col-md-auto p-0">
          <h2 class="m-0 pe-4 font-weight-bolder">
            Results for "{{ searchTextDisplay }}"
          </h2>
        </div>
        <div class="col-6">
          <input
                v-model="searchTextInput"
                class="form-control"
                placeholder="Search story, author or tags"
                @keydown.enter="updateSearch"
              >
        </div>
        <div class="col-md-auto">
          <button 
            class="btn btn-dark mx-2" 
            type="button"
            aria-label="Search"
            @click="updateSearch"
          >
          Search
          </button>
          <button 
            class="btn btn-secondary" 
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
    <div class="container-fluid search-result-page-content mt-4">
      <div class="row">
        <h3 class="mb-2">
          Stories: {{storyResultsCount}} found
        </h3>
      </div>
      <div v-if="storyResultsCount > 0">
        <div 
          v-for="(chunk, row) in storyChunks"
          :key="`storySearch_${row}`"
          class="row py-2"
        >
          <div
            v-for="story in chunk"
            :key="`story_${story.id}`"
            class="col-4"
          >
            <story-mini-card 
              :story-card="story"
            />
          </div>
        </div>
        <div class="row p-2">
          <div 
            v-if="storyResults.length < storyResultsCount"
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
    <div class="container-flex search-result-page-content mt-4">
      <div class="row mx-auto my-0">
        <div class="mb-2">
          <h3 class="m-0">
            Authors: {{authorResultsCount}} found
          </h3>
        </div>
        <div v-if="authorResultsCount > 0">
          <div 
            v-for="(chunk, row) in authorChunks"
            :key="`authorSearch_${row}`"
            class="row py-2"
          >
            <div
              v-for="author in chunk"
              :key="`author_${author.id}`"
              class="col-4"
            >
              <author-mini-card 
                :author-card="author"
              />
            </div>
          </div>
          <div 
            v-if="authorResults.length < authorResultsCount"
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

    <div class="container-flex search-result-page-content pt-4">
      <div class="row mx-auto my-0">
        <div class="mb-2">
          <h3 class="m-0">
            Tags: {{ tagResultsCount }} found
          </h3>
        </div>
        <template v-if="tagResultsCount > 0">
          <div 
            v-for="(chunk, row) in tagChunks"
            :key="`tagSearch_${row}`"
            class="row py-2"
          >
            <div
                v-for="tag in chunk"
                :key="`tag_${tag.id}`"
                class="col-4"
              >
                <tag-mini-card 
                  :tag-card="tag"
                />
            </div>
          </div>
          <div 
            v-if="tagResults.length < tagResultsCount"
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
import {ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '@/services/api';
import { useSearchStore } from "@/stores/search";
import { storeToRefs } from 'pinia';

const route = useRoute();
const router = useRouter();
const searchStore = useSearchStore();

const searchTextDisplay = ref();
const searchTextInput = ref();

const storyResults = ref([]);
const storyResultsCount = ref(0);
const authorResults = ref([]);
const authorResultsCount = ref(0);
const tagResults = ref([]);
const tagResultsCount = ref(0)
const searchTextProps = ref(route.params.search);

const cols = 3;
const storyPage = ref(1);
const authorPage = ref(1);
const tagPage = ref(1);

const { searchText } = storeToRefs(searchStore);

const storyChunks = computed( () => {
  if (storyResultsCount.value > 0){
    return chunkResults(storyResults.value);
  }
  return [];
});

const authorChunks = computed( () => {
  if (authorResultsCount.value > 0){
    return chunkResults(authorResults.value);
  }
  return [];
});

const tagChunks = computed( () => {
  if (tagResultsCount.value > 0){
    return chunkResults(tagResults.value);
  }
  return [];
});

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

const chunkResults = (results) => {
  let chunks = [];
  for (let i = 0; i < results.length; i+=cols){
    chunks.push(results.slice(i, i + cols));
  }
  return chunks;
}

const storySearch = async (page, append) => {
  if (searchText.value){
    storyPage.value = page;
    await api.get(`/story/search/story?q=${searchText.value}&page=${page}`).then(res => {
      if (append){
        storyResults.value = storyResults.value.concat(res.data.results);
      }
      else{
        storyResults.value = res.data.results;
      }
      storyResultsCount.value = res.data.count;
    });
  }
}

const advanceStorySearch = () =>
{
  storySearch(storyPage.value + 1, true);
}

const authorSearch = async (page, append) => {
  if (searchText.value){
    authorPage.value = page;
    await api.get(`/story/search/author?author=${searchText.value}&page=${page}`).then(res => {
      if (append){
        authorResults.value = authorResults.value.concat(res.data.results);
      }
      else{
        authorResults.value = res.data.results;
      }
      authorResultsCount.value = res.data.count;
    });
  }
}

const advanceAuthorSearch = () => {
  authorSearch(authorPage.value+1, true);
}

const tagSearch = async (page, append)  => {
  if (searchText.value){
    tagPage.value = page;
    await api.get(`/story/search/tag?tag=${searchText.value}&page=${page}`).then(res => {
      if (append){
        tagResults.value = tagResults.value.concat(res.data.results);
      }
      else{
        tagResults.value = res.data.results;
      }
      tagResultsCount.value = res.data.count;
    })
  }
}
    
const advanceTagSearch = () => {
  authorSearch(tagPage.value+1, true);
}

const clearSearch = () => {
  storyResults.value = [];
  storyResultsCount.value = 0;
  authorResults.value = [];
  authorResultsCount.value = 0;
  tagResults.value = [];
  tagResultsCount.value = 0;
  storyPage.value = 1;
  authorPage.value = 1;
  tagPage.value = 1;
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
.card-author-card {
  border-bottom: .8px solid #EFEFEF;
  &:last-child {
    border-bottom: none;
  }

  &-name {
    font-size: .8em;
  }
  &-email {
    font-size: .66em;
    color: #A7A7A7;
  }
  &-action {
    font-size: .6em;
    color: #A7A7A7;
    img {
      width: 1.3vw;
    }
  }
}
</style>