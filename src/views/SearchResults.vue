<template>
  <div class="search-result-page">
    <div class="container-flex search-result-page-head border-bottom py-4">
      <div class="row my-0 col-10 mx-auto justify-content-between">
        <div class="col-5 p-0">
          <h1 class="m-0 font-weight-bolder">
            Results for {{ searchText }}
          </h1>
        </div>
        <div class="m-0 col-6 border-bottom justify-content-between p-1">
          <div class="pr-0 text-center">
            <img src="../assets/image/icon/search-normal.svg">
          </div>
          <div class="p-0">
            <input
              v-model="searchText"
              class="border-0 login-form-input"
              placeholder="Search story, author ot tags"
              @keyup="advanceSearch()"
            >
          </div>
          <div class="text-right pt-1 px-0">
            <span
              class="badge px-2 py-1 cursor-pointer"
              variant="light"
              @click="clearSearch()"
            >
              clear
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="container-flex search-result-page-content my-4 p-5">
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
        <div class="row m-0 border w-100 h-100 font-size-8 font-weight-bold text-secondary justify-content-center align-items-center">
          No Stories found.
        </div>
      </template>
    </div>
    <div class="container-flex search-result-page-content my-4 p-5">
      <div class="row col-10 mx-auto my-0">
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
            <div class="col-9 p-0 m-0">
              TODO - AVATAR
            </div>
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
  data() {
    return {
      searchText: '',
      storyResults: [],
      authorResults: [],
      tagResults: [],

    }
  },
  created() {
    this.searchText = this.$route.params.searchKey
    this.advanceSearch()
  },
  methods: {
    advanceSearch() {
      this.advanceStorySearch()
      this.advanceAuthorSearch()
      this.advanceTagSearch()
    },

    advanceStorySearch() {
      this.axios.get(`/story/search/?q=${this.searchText}`).then(res => {
        this.storyResults = res.data
      })
    },

    advanceAuthorSearch() {
      this.axios.get(`/story/search/?user=${this.searchText}`).then(res => {
        this.authorResults = res.data
      })
    },

    advanceTagSearch() {
      this.axios.get(`/story/search/?tag==${this.searchText}`).then(res => {
        this.tagResults = res.data
      })
    },

    clearSearch() {
      this.searchText = '';
      this.advanceSearch()
      this.$router.push({name: 'searchResults'})
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