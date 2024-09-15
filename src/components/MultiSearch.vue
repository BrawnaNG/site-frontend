<template>
  <div class="multi-search">
    <div class="multi-search-input-wrapper border-bottom">
      <b-row class="m-0 border-bottom justify-content-between p-1">
        <b-col cols="auto" class="pr-0 text-center">
          <img src="../assets/image/icon/search-normal.svg">

        </b-col>
        <b-col cols="10" class="p-0">
          <b-form-input @keyup="advanceSearch()"
                        v-model="searchText"
                        class="border-0 login-form-input"
                        placeholder="Search story, author ot tags"/>
        </b-col>
        <b-col cols="1" class="text-right pt-1 px-0">
          <b-badge @click="searchText = ''" class="px-2 py-1 cursor-pointer" variant="light">clear</b-badge>
        </b-col>
      </b-row>
    </div>
    <div class="multi-search-result-wrapper mt-5">
      <b-row class="m-0 p-2">
        <b-col cols="4" class="p-2">
          <h5 class="m-0 font-weight-bold pb-3">
            Stories
          </h5>
          <b-col cols="12" class="multi-search-result-box border p-3">
            <template v-if="storyResults.length">
              <b-col v-for="(story, index) in storyResults"
                     :key="`story_res_card_${index}`"
                     cols="12"
                     class="px-0 py-2 border-bottom">
                <div class="result-box-title">
                 <h6 class="m-0"> {{story.slug}}</h6>
                </div>
                <div class="result-box-user color-gray font-size-8">
                  By : {{story.user}}
                </div>
              </b-col>
            </template>
            <template v-else>
              <b-row class="m-0 h-100 font-size-8 font-weight-bold text-secondary justify-content-center align-items-center">
                No Stories found.
              </b-row>
            </template>
          </b-col>
        </b-col>
        <b-col cols="4" class="p-2">
          <h5 class="m-0 font-weight-bold pb-3">
            Authors
          </h5>
          <b-col cols="12" class="multi-search-result-box border p-3">
            <template v-if="authorResults.length">
              <b-col v-for="(user, index) in authorResults"
                     :key="`author_res_card_${index}`"
                     cols="12"
                     class="px-0 py-2 border-bottom">
                <b-row class="m-0 justify-content-between">
                  <b-col cols="auto" class="p-0">
                    {{user.user}}
                  </b-col>

                  <b-col cols="auto" class="px-0 color-gray font-size-7 pt-1">
                    32 stories
                  </b-col>
                </b-row>
              </b-col>
            </template>
            <template v-else>
              <b-row class="m-0 h-100 font-size-8 font-weight-bold text-secondary justify-content-center align-items-center">
                No Author found.
              </b-row>
            </template>
          </b-col>
        </b-col>
        <b-col cols="4" class="p-2">
          <h5 class="m-0 font-weight-bold pb-3">
            Tags
          </h5>
          <b-col cols="12" class="multi-search-result-box border p-5">
            <template v-if="tagResults.length">
              <b-col v-for="(tag, index) in tagResults"
                     :key="`tag_res_card_${index}`"
                     cols="12"
                     class="px-0 py-2 border-bottom">
                <b-col cols="auto" class="p-0">
                  {{tag.name}}
                </b-col>
              </b-col>
            </template>
            <template v-else>
              <b-row class="m-0 h-100 font-size-8 font-weight-bold text-secondary justify-content-center align-items-center">
                No Tags found.
              </b-row>
            </template>
          </b-col>
        </b-col>
      </b-row>
      <div class="text-center py-3">
        <b-button  pill
                   :disabled="!storyResults.length && !authorResults.length && !tagResults.length"
                   :to="{name: 'searchResults', params: {searchKey: this.searchText}}"
                   @click="showSearchResultPage()"
                   variant="dark"
                   class="story-default-btn px-3 py-2 font-weight-bold">
          Show more
        </b-button>
        <b-button  pill
                   @click="showSearchResultPage()"
                   variant="outline-dark"
                   class="story-default-btn px-3 py-2 ml-3 font-weight-bold">
          close
        </b-button>
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
      this.$axios.get(`/story/search/?q=${this.searchText}`).then(res => {
        this.storyResults = res.data
      })
    },

    advanceAuthorSearch() {
      this.$axios.get(`/story/search/?user=${this.searchText}`).then(res => {
        this.authorResults = res.data
      })
    },

    advanceTagSearch() {
      this.$axios.get(`/story/search/?tag==${this.searchText}`).then(res => {
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