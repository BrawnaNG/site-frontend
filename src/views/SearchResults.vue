<template>
  <div class="search-result-page">
    <div class="search-result-page-head border-bottom py-4">
      <b-row class="my-0 col-10 mx-auto justify-content-between">
        <b-col
          cols="5"
          class="p-0"
        >
          <h1 class="m-0 font-weight-bolder">
            Results for “Emily”
          </h1>
        </b-col>
        <b-row class="m-0 col-6 border-bottom justify-content-between p-1">
          <b-col
            cols="auto"
            class="pr-0 text-center"
          >
            <img src="../assets/image/icon/search-normal.svg">
          </b-col>
          <b-col
            cols="9"
            class="p-0"
          >
            <b-form-input
              v-model="searchText"
              class="border-0 login-form-input"
              placeholder="Search story, author ot tags"
              @keyup="advanceSearch()"
            />
          </b-col>
          <b-col
            cols="1"
            class="text-right pt-1 px-0"
          >
            <b-badge
              class="px-2 py-1 cursor-pointer"
              variant="light"
              @click="clearSearch()"
            >
              clear
            </b-badge>
          </b-col>
        </b-row>
      </b-row>
    </div>
    <div class="search-result-page-content my-4 p-5">
      <b-col
        cols="10"
        class="mx-auto p-0"
      >
        <div class="pb-4 px-3">
          <h3 class="m-0">
            Stories
          </h3>
        </div>
        <b-row class="search-result-page-content-story col-12 m-0 py-4 px-0">
          <template v-if="storyResults.length">
            <b-col
              v-for="index in 6"
              :key="`story_${index}`"
              cols="4"
              class="p-3"
            >
              <story-mini-card />
            </b-col>
          </template>
          <template v-else>
            <div class="px-3 w-100">
              <b-row class="m-0 border w-100 h-100 font-size-8 font-weight-bold text-secondary justify-content-center align-items-center">
                No Stories found.
              </b-row>
            </div>
          </template>
        </b-row>
      </b-col>
      <b-row class="col-10 mx-auto my-0">
        <b-col
          cols="6"
          class="pl-0"
        >
          <div class="pb-4">
            <h3 class="m-0">
              Authors
            </h3>
          </div>
          <div class="search-result-page-content-author p-3 border">
            <template v-if="authorResults.length">
              <b-row
                v-for="(user, index) in authorResults"
                :key="`last_user_${index}`"
                class="card-user py-3 m-0"
              >
                <b-row class="col-9 p-0 m-0">
                  <b-col
                    cols="auto"
                    class="card-user-avatar p-0"
                  >
                    <b-avatar
                      text="BV"
                      size="2.4rem"
                    />
                  </b-col>
                  <b-col>
                    <div class="card-user-name font-weight-bold">
                      {{ user.user }}
                    </div>
                    <div class="card-user-email">
                      admin@gmail.com
                    </div>
                  </b-col>
                </b-row>
                <b-row class="col-3 m-0 justify-content-end align-items-center p-0">
                  <b-col
                    cols="auto"
                    class="card-user-action p-0"
                  >
                    <span class="mr-2">
                      32 stories
                    </span>
                    <span class="cursor-pointer">
                      <img
                        src="../assets/image/icon/Show.svg"
                        alt="show"
                      >
                    </span>
                  </b-col>
                </b-row>
              </b-row>
            </template>
            <template v-else>
              <b-row class="m-0 h-100 font-size-8 font-weight-bold text-secondary justify-content-center align-items-center">
                No Authors found.
              </b-row>
            </template>
          </div>
        </b-col>
        <b-col
          cols="6"
          class="pr-0"
        >
          <div class="pb-4">
            <h3 class="m-0">
              Tags
            </h3>
          </div>
          <div class="search-result-page-content-tag p-3 border">
            <template v-if="tagResults.length">
              <b-row
                v-for="(tag, index) in tagResults"
                :key="`tag_user_${index}`"
                class="card-user py-3 m-0"
              >
                <div class="card-user-name font-weight-bold">
                  {{ tag.name }}
                </div>
              </b-row>
            </template>
            <template v-else>
              <b-row class="m-0 h-100 font-size-8 font-weight-bold text-secondary justify-content-center align-items-center">
                No Tags found.
              </b-row>
            </template>
          </div>
        </b-col>
      </b-row>
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