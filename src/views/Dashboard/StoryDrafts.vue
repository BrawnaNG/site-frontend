<template>
  <div class="story-drafts-page">
    <b-col
      cols="10"
      class="story-drafts-page-head mx-auto py-3"
    >
      <b-row class="h-100 m-0">
        <b-col
          cols="6"
          class="px-0"
        >
          <b-col class="story-drafts-page-head-title px-0">
            <h4 class="m-0 font-weight-bolder">
              Dashboard
            </h4>
          </b-col>
          <b-col class="story-drafts-page-head-breadcrumb pt-1 px-0">
            <b-breadcrumb
              class="bg-transparent pb-0 px-0 m-0"
              :items="breadcrumb"
            />
          </b-col>
        </b-col>
        <b-col
          cols="6"
          class="px-0 pt-2 mt-1 text-right"
        >
          <b-button
            pill
            variant="dark"
            :to="{name: 'addEditStory'}"
            class="story-default-btn pl-3 pr-2 py-2 font-weight-bold"
          >
            Create Story
            <img
              src="../../assets/image/icon/add.svg"
              class="ml-2"
              alt="go"
            >
          </b-button>
        </b-col>
      </b-row>
    </b-col>
    <b-col
      cols="12"
      class="py-3 menu-bar-wrapper px-0"
    >
      <b-row class="col-10 mx-auto my-0">
        <b-row class="col-10 m-0 px-0">
          <b-col
            cols="auto"
            class="menu-bar-item cursor-pointer text-white text-center mr-3 px-1 pb-2"
          >
            <router-link
              class="pb-2 px-1"
              :to="{name: 'dashboard'}"
            >
              Your Stories
            </router-link>
          </b-col>
          <b-col
            cols="auto"
            class="menu-bar-item cursor-pointer text-white text-center mr-3 px-1 pb-2"
          >
            <router-link
              class="pb-2 px-1"
              :to="{name: 'savedStories'}"
            >
              Saved Stories
            </router-link>
          </b-col>
          <b-col
            cols="auto"
            class="menu-bar-item cursor-pointer text-white text-center mr-3 px-1 pb-2"
          >
            <router-link
              class="pb-2 px-1"
              :to="{name: 'commentsStory'}"
            >
              Comments
            </router-link>
          </b-col>
          <b-col
            cols="auto"
            class="menu-bar-item cursor-pointer text-white text-center mr-3 px-1 pb-2"
          >
            <router-link
              class="pb-2 px-1"
              :to="{name: 'drafts'}"
            >
              Drafts
            </router-link>
          </b-col>
        </b-row>
        <b-col
          cols="2"
          class="text-right p-0"
        >
          <span class="text-white">
            Log out
          </span>
        </b-col>
      </b-row>
    </b-col>
    <b-col
      cols="10"
      class="story-drafts-page-content mx-auto py-5"
    >
      <div class="pb-5">
        <h2 class="m-0">
          Drafts
        </h2>
      </div>

      <div>
        <template v-if="draftList.data.length">
          <b-col
            v-for="storyCard in draftList.data"
            :key="`storyCard_${storyCard.id}`"
            cols="12"
            class="p-0"
          >
            <story-large-card :story-card="storyCard" />
          </b-col>
          <b-row class="justify-content-center m-0 pt-4">
            <b-pagination
              v-model="draftList.page"
              class="pagination-custom-style"
              pills
              :total-rows="draftList.total"
            />
          </b-row>
        </template>
        <template v-else>
          <b-row class="m-0 p-5 justify-content-center align-items-center">
            <b-col
              cols="auto"
              class="p-4 text-center text-secondary"
            >
              Empty Data
            </b-col>
          </b-row>
        </template>
      </div>
    </b-col>
  </div>
</template>

<script>
import StoryLargeCard from "@/components/Card/StoryLargeCard.vue";

export default {
  name: "StoryDrafts",
  components: {StoryLargeCard},
  data() {
    return {
      breadcrumb: [
        {
          text: 'Home',
          href: '/'
        },
        {
          text: 'Dashboard',
          href: '#/dashboard/your-stories'
        },
        {
          text: 'Drafts',
        }
      ],
      draftList: {
        data: [],
        page: 1,
        total: 0
      }
    }
  },
  watch: {
    'draftList.page'() {
      this.getRecentStories()
    }
  },
  mounted() {
    this.getRecentStories()
  },
  methods: {

    getRecentStories() {
      this.axios.get(`/story/list/?page=${this.draftList.page}`).then(res => {
        this.draftList.total = res.data.count
        this.draftList.data = res.data.results
      })
    }
  }
}
</script>

<style scoped>

</style>