<template>
  <div class="dashboard-page">
    <b-col
      cols="10"
      class="dashboard-page-head mx-auto py-3"
    >
      <b-row class="h-100 m-0">
        <b-col
          cols="6"
          class="px-0"
        >
          <b-col class="dashboard-page-head-title px-0">
            <h4 class="m-0 font-weight-bolder">
              Dashboard
            </h4>
          </b-col>
          <b-col class="dashboard-page-head-breadcrumb pt-1 px-0">
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
      class="dashboard-page-content mx-auto py-5"
    >
      <div class="pb-5">
        <h2 class="m-0">
          Your Stories
        </h2>
      </div>
      <your-stories />
    </b-col>
  </div>
</template>

<script>
import YourStories from "@/components/Dashboard/YourStories.vue";
export default {
  name: "DashboardPage",
  components: {YourStories},
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
          text: 'Your Stories',
        }
      ],
      tabState: 'yourStories'
    }
  },
}
</script>

<style scoped lang="scss">
</style>