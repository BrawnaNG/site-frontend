<template>
  <div class="search-result-page">
    <div class="container-flex search-result-page-head border-bottom py-4">
      <div class="row my-0 col-10 mx-auto justify-content-between">
        <div class="col-4 p-0">
          <h2 class="m-0 font-weight-bolder">
            Results for "{{ searchText }}"
          </h2>
        </div>
        <div class="col-6">
          <input
                v-model="searchTextInput"
                class="form-control"
                placeholder="Search story, author or tags"
                @keydown.enter="advanceSearch"
              >
        </div>
        <div class="col-2">
          <button 
            class="btn btn-primary mx-2" 
            type="button"
            aria-label="Search"
            @click="advanceSearch"
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
    <div class="container-flex search-result-page-content my-2 p-2">
      <div class="row pb-4 px-3">
        <h3 class="m-0">
          Stories
        </h3>
      </div>
      <template v-if="storyResults.length">
        <div
          v-for="story in storyResults"
          :key="`story_${story}`"
          cols="4"
          class="row p-3"
        >
          <story-mini-card 
            :card-mode="'mini'"
            :story-card="story"
          />
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
            v-for="(user, index) in authorResults"
            :key="`last_user_${index}`"
            class="row card-user py-3 m-0"
          >
            <div class="card-user-name font-weight-bold">
              {{ user.user }}
            </div>
            <div class="card-user-email">
              {{ user.email }}
            </div>            
            <div class="col-3 m-0 justify-content-end align-items-center p-0">
              <span class="mr-2">
                TODO - STORy COUNT
              </span>
              <span class="cursor-pointer">
                <img
                  src="../assets/image/icon/Show.svg"
                  alt="show"
                >
              </span>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="row m-0 h-100 font-size-8 font-weight-bold text-secondary justify-content-center align-items-center">
            No Authors found.
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
      storyResults: [],
      authorResults: [],
      tagResults: [],
    }
  },
  created() {
    this.advanceSearch()
  },
  methods: {
    advanceSearch() {
      this.advanceStorySearch()
      this.advanceAuthorSearch()
      this.advanceTagSearch()
    },

    advanceStorySearch() {
      if (this.searchTextInput){
        this.axios.get(`/story/search/?q=${this.searchTextInput}`).then(res => {
          this.storyResults = res.data;
        });
      }
    },

    advanceAuthorSearch() {
      if (this.searchTextInput){
        this.axios.get(`/story/search/?user=${this.searchTextInput}`).then(res => {
          this.authorResults = res.data;
        });
      }
    },

    advanceTagSearch() {
      if (this.searchTextInput){
        this.axios.get(`/story/search/?tag==${this.searchTextInput}`).then(res => {
          this.tagResults = res.data;
        })
      }
    },

    clearSearch() {
      this.searchTextInput = '';
      this.storyResults = [];
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