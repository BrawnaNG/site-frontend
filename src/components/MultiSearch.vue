<template>
  <div class="multi-search">
    <div class="multi-search-input-wrapper border-bottom container">
      <div class="row border-bottom justify-content-between m-0">
        <div
          cols="auto"
          class="col text-center pr-0"
        >
          <img src="../assets/image/icon/search-normal.svg">
        </div>
        <div
          class="col col-10 p-0"
        >
          <input
            v-model="searchText"
            class="border-0 login-form-input form-control"
            placeholder="Search story, author ot tags"
            @keyup="advanceSearch()"
          >
        </div>
        <div
          class="text-right col col-2 pt-1 px-0"
        >
          <span
            class="badge px-2 py-1 cursor-pointer"
            variant="light"
            @click="searchText = ''"
          >
            clear
          </span>
        </div>
      </div>
    </div>
    <div class="multi-search-result-wrapper container mt-5">
      <div class="row m-0 p-2">
        <div class="col col-4 p-2">
          <h5 class="m-0 font-weight-bold pb-3">
            Stories
          </h5>
          <div class="col col-12 multi-search-result-box border p-3">
            <template v-if="storyResults.length">
              <div
                v-for="(story, index) in storyResults"
                :key="`story_res_card_${index}`"
                class="col col-12px-0 py-2 border-bottom"
              >
                <div class="result-box-title">
                  <h6 class="m-0">
                    {{ story.slug }}
                  </h6>
                </div>
                <div class="result-box-user color-gray font-size-8">
                  By : {{ story.user }}
                </div>
              </div>
            </template>
            <template v-else>
              <div class="row m-0 h-100 font-size-8 font-weight-bold text-secondary justify-content-center align-items-center">
                No Stories found.
              </div>
            </template>
          </div>
        </div>
        <div class="col col-4 p-2">
          <h5 class="m-0 font-weight-bold pb-3">
            Authors
          </h5>
          <div class="col col-12 multi-search-result-box border p-3">
            <template v-if="authorResults.length">
              <div
                v-for="(user, index) in authorResults"
                :key="`author_res_card_${index}`"
                class="col col-12 px-0 py-2 border-bottom"
              >
                <div class="row m-0 justify-content-between">
                  <div class="col p-0">
                    {{ user.user }}
                  </div>

                  <div class="col px-0 color-gray font-size-7 pt-1">
                    32 stories
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="row m-0 h-100 font-size-8 font-weight-bold text-secondary justify-content-center align-items-center">
                No Author found.
              </div>
            </template>
          </div>
        </div>
        <div class="col col-4 p-2">
          <h5 class="m-0 font-weight-bold pb-3">
            Tags
          </h5>
          <div class="col col-12 multi-search-result-box border p-5">
            <template v-if="tagResults.length">
              <div
                v-for="(tag, index) in tagResults"
                :key="`tag_res_card_${index}`"
                class="col col-12 px-0 py-2 border-bottom"
              >
                <div class="col p-0">
                  {{ tag.name }}
                </div>
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
      <div class="text-center py-3">
        <button
          pill
          :disabled="!storyResults.length && !authorResults.length && !tagResults.length"
          :to="{name: 'searchResults', params: {searchKey: searchText}}"
          variant="dark"
          class="story-default-btn px-3 py-2 font-weight-bold"
          @click="showSearchResultPage()"
        >
          Show more
        </button>
        <button
          pill
          variant="outline-dark"
          class="story-default-btn px-3 py-2 ml-3 font-weight-bold"
          @click="showSearchResultPage()"
        >
          close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MultiSearch",
  data() {
    return {
      searchText: '',
      storyResults: [],
      authorResults: [],
      tagResults: [],
    }
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

    showSearchResultPage() {
      this.$emit('closeMultiSearchDialog')
    }
  }
}
</script>

<style scoped lang="scss">

.multi-search-result {
  &-box {
    height: 300px;
    overflow-y: auto;
  }
}
</style>