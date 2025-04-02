<template>
  <div class="search-result-page">
    <div class="container-flex search-result-page-head border-bottom py-4">
      <div class="row my-0 col-10 mx-auto justify-content-between">
        <div class="col-4 p-0">
          <h2 class="m-0 font-weight-bolder">
            Results for "{{ searchTextDisplay }}"
          </h2>
        </div>
        <div class="col-6">
          <input
                v-model="searchTextInput"
                class="form-control"
                placeholder="Search story, author or tags"
                @keydown.enter="initialSearch"
              >
        </div>
        <div class="col-2">
          <button 
            class="btn btn-primary mx-2" 
            type="button"
            aria-label="Search"
            @click="initialSearch"
          >
          Search
          </button>
          <button 
            class="btn btn-secondary" 
            type="button"
            aria-label="Clear"
            @click="initialSearch"
          >
          Clear
          </button>
        </div>
      </div>
    </div>
    <div class="container-fluid search-result-page-content my-2 p-2">
      <div class="row pb-4 px-3">
        <h3 class="m-0">
          Stories: {{storyResultsCount}} found
        </h3>
      </div>
      <template v-if="storyResults.length">
        <div 
          v-for="(chunk, row) in storyChunks"
          :key="`storySearch_${row}`"
          class="row p-2"
        >
          <div
            v-for="story in chunk"
            :key="`story_${story.id}`"
            class="col-4"
          >
            <story-mini-card 
              :card-mode="'mini'"
              :story-card="story"
            />
          </div>
        </div>
        <div class="row p-2">
        <div 
          v-if="storyResults.length < storyResultsCount"
          class="col-xl-2 mx-auto">
          <button 
            class="px-2 py-1 font-weight-bold rounded-pill home-default-btn"
            @click="advanceStorySearch">
            Show More
          </button>
        </div>
      </div>

      </template>
      <template v-else>
        <div class="row m-0 w-100 h-100 font-size-8 font-weight-bold text-secondary justify-content-center align-items-center">
          No Stories found.
        </div>
      </template>
    </div>
    <div class="container-flex search-result-page-content my-2 p-2">
      <div class="row mx-auto my-0">
        <div class="pb-4">
          <h3 class="m-0">
            Authors
          </h3>
        </div>
        <template v-if="authorResults.length">
          <div 
            v-for="(chunk, row) in authorChunks"
            :key="`authorSearch_${row}`"
            class="row p-2"
          >
            <div
              v-for="(user, index) in chunk"
              :key="`user_${index}`"
              class="col-4 border"
            >
              <div class="card-user-name font-weight-bold">
                {{ user.alias }}
              </div>
              <div class="card-user-email">
                {{ user.email }}
              </div>            
              <div class="col-3 m-0 justify-content-end align-items-center p-0">
                <span class="mr-2">
                  {{ user.story_count }} stories
                </span>
                <span 
                  class="cursor-pointer"
                  v-if="user.story_count > 0">
                  <img
                    src="../assets/image/icon/Show.svg"
                    alt="show"
                  >
                </span>
              </div>
            </div>
          </div>
          <div 
            v-if="authorResults.length < authorResultsCount"
            class="col-xl-2 mx-auto">
            <button 
              class="px-2 py-1 font-weight-bold rounded-pill home-default-btn"
              @click="advanceAuthorSearch">
              Show More
            </button>
          </div>
        </template>
        <template v-else>
          <div class="row m-0 h-100 font-size-8 font-weight-bold text-secondary justify-content-center align-items-center">
            No Authors found.
          </div>
        </template>
      </div>
    </div>

    <div class="container-flex search-result-page-content my-2 p-2">
      <div class="row mx-auto my-0">
        <div class="pb-4">
          <h3 class="m-0">
            Tags
          </h3>
        </div>
        <template v-if="tagResults.length">
          <div 
            v-for="(chunk, row) in tagChunks"
            :key="`tagSearch_${row}`"
            class="row p-2"
          >
            <div
              v-for="(tag, index) in chunk"
              :key="`tag_${index}`"
              class="col-4 border"
            >
              <div class="card-user-name font-weight-bold">
                {{ tag.name }}
              </div>          
              <div class="col-3 m-0 justify-content-end align-items-center p-0">
                <span class="mr-2">
                  {{ tag.story_count }} stories
                </span>
                <span 
                  v-if="tag.story_count > 0"
                  class="cursor-pointer"
                  >
                  <img
                    src="../assets/image/icon/Show.svg"
                    alt="show"
                  >
                </span>
              </div>
            </div>
          </div>
          <div 
            v-if="tagResults.length < tagResultsCount"
            class="col-xl-2 mx-auto">
            <button 
              class="px-2 py-1 font-weight-bold rounded-pill home-default-btn"
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

<script>
import StoryMiniCard from "@/components/Card/StoryMiniCard.vue";
export default {
  name: "SearchResults",
  components: {StoryMiniCard},
  props: {
    searchText: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      searchTextInput: this.searchText,
      searchTextDisplay: this.searchText,
      storyResults: [],
      shortResultsCount: 0,
      authorResults: [],
      tagResults: [],
      cols: 3,
      storyPage: 1,
      authorPage: 1,
      tagPage: 1
    }
  },
  computed:{
    storyChunks() { return this.chunkResults(this.storyResults); },
    authorChunks()  { return this.chunkResults(this.authorResults); },
    tagChunks()  { return this.chunkResults(this.tagResults); },
  },
  created() {
    this.initialSearch()
  },
  methods: {
    initialSearch() {
      this.searchTextDisplay = this.searchTextInput;
      this.storySearch(1, false);
      this.authorSearch(1, false);
      this.tagSearch(1, false);
    },

    async storySearch(page, append) {
      if (this.searchTextInput){
        this.storyPage = page;
        await this.axios.get(`/story/search/story?q=${this.searchTextInput}&page=${page}`).then(res => {
          if (append){
            this.storyResults = this.storyResults.concat(res.data.results);
          }
          else{
            this.storyResults = res.data.results;
          }
          this.storyResultsCount = res.data.count;
        });
      }
    },

    advanceStorySearch()
    {
      this.storySearch(this.storyPage+1, true);
    },

    async authorSearch(page, append) {
      if (this.searchTextInput){
        this.authorPage = page;
        await this.axios.get(`/story/search/author?author=${this.searchTextInput}&page=${page}`).then(res => {
          if (append){
            this.authorResults = this.authorResults.concat(res.data.results);
          }
          else{
            this.authorResults = res.data.results;
          }
          this.authorResultsCount = res.data.count;
        });
      }
    },

    advanceAuthorSearch()
    {
      this.authorSearch(this.authorPage+1, true);
    },

    async tagSearch(page, append) {
      if (this.searchTextInput){
        await this.axios.get(`/story/search/tag?tag==${this.searchTextInput}&page=${page}`).then(res => {
          if (append){
            this.tagResults = this.tagResults.concat(res.data.results);
          }
          else{
            this.tagResults = res.data.results;
          }
          this.tagResultsCount = res.data.count;
        })
      }
    },
    
    async advanceTagSearch() {
      this.authorSearch(this.tagPage+1, true);
    },

    clearSearch() {
      this.searchTextInput = '';
      this.storyResults = [];
      this.authorResults = [];
      this.tagResults = [];
      this.page = 1;
    },
    chunkResults(results) {
      let chunks = [];
      for (let i = 0; i < results.length; i+=this.cols){
        chunks.push(results.slice(i, i + this.cols));
      }
      return chunks;
    }
  }
}
</script>

<style scoped lang="scss">
.search-result-page {
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
.card-user {
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