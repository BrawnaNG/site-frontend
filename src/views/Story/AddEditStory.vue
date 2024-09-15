<template>
  <div class="add-edit-story-page">
    <b-col cols="10" class="saved-stories-head mx-auto py-3">
      <b-row class="h-100 m-0">
        <b-col cols="6" class="px-0">
          <b-col class="saved-stories-page-head-title px-0">
            <h4 class="m-0 font-weight-bolder">
              Dashboard
            </h4>
          </b-col>
          <b-col class="saved-stories-page-head-breadcrumb pt-1 px-0">
            <b-breadcrumb class="bg-transparent pb-0 px-0 m-0" :items="breadcrumb"></b-breadcrumb>
          </b-col>
        </b-col>
        <b-col cols="6" class="px-0 pt-2 mt-1 text-right">
          <b-button pill variant="dark"
                    :to="{name: 'addEditStory'}"
                    class="story-default-btn pl-3 pr-2 py-2 font-weight-bold">
            Create Story
            <img src="../../assets/image/icon/add.svg" class="ml-2" alt="go">
          </b-button>
        </b-col>
      </b-row>
    </b-col>
    <b-col cols="12" class="py-3 menu-bar-wrapper px-0">
      <b-row class="col-10 mx-auto my-0">
        <b-row class="col-10 m-0 px-0">
          <b-col cols="auto"
                 class="menu-bar-item cursor-pointer text-white text-center mr-3 px-1 pb-2">
            <router-link class="pb-2 px-1" :to="{name: 'dashboard'}">
              Your Stories
            </router-link>
          </b-col>
          <b-col cols="auto"
                 class="menu-bar-item cursor-pointer text-white text-center mr-3 px-1 pb-2">
            <router-link class="pb-2 px-1" :to="{name: 'savedStories'}">
              Saved Stories
            </router-link>
          </b-col>
          <b-col cols="auto"
                 class="menu-bar-item cursor-pointer text-white text-center mr-3 px-1 pb-2">
            <router-link class="pb-2 px-1" :to="{name: 'commentsStory'}">
              Comments
            </router-link>
          </b-col>
          <b-col cols="auto"
                 class="menu-bar-item cursor-pointer text-white text-center mr-3 px-1 pb-2">
            <router-link class="pb-2 px-1" :to="{name: 'drafts'}">
              Drafts
            </router-link>
          </b-col>
        </b-row>
        <b-col cols="2" class="text-right p-0">
          <span class="text-white">
            Log out
          </span>
        </b-col>
      </b-row>
    </b-col>
    <b-row class="col-10 my-0 mx-auto py-5">
      <b-col cols="3" class="pl-0">
        <!--          <vue-tree-navigation :items="items"  :defaultOpenLevel="defaultOpenLevel"/>-->
      </b-col>
      <b-col cols="6" class="p-0 saved-stories">
        <b-row class="pb-4 m-0 justify-content-between">
          <h3 class="m-0 font-weight-bolder pt-1">
            Saved Stories
          </h3>
          <span class="saved-stories-upload-file font-weight-bold py-2 cursor-pointer">
              Upload Document
            </span>
        </b-row>
        <b-row class="pb-5 m-0 justify-content-between">
          <h6 class="m-0">
            Are there multiple chapters in your story?
          </h6>
          <span>
               <b-form-checkbox name="check-button" switch/>
            </span>
        </b-row>
        <div class="saved-stories-title pb-3">
          <label class="pl-2 saved-stories-title-label" for="inputLive">
            Title
          </label>
          <b-form-input
              class="saved-stories-title-input py-3"
              id="inputLive"
              placeholder="Chapter01:introduction"
              trim
          ></b-form-input>
        </div>
        <div class="text-editor-chapter py-2">
          <VueEditor  :editorToolbar="customToolbar"/>
        </div>
        <b-row class="pt-3 justify-content-between m-0">
          <b-col cols="auto" class="p-0">
            <b-button pill variant="outline-dark"
                      class="story-default-btn saved-stories-btn px-2 py-1 mr-2 font-weight-bold">
              Cancel
            </b-button>
            <b-button pill variant="outline-dark"
                      class="story-default-btn saved-stories-btn px-2 py-1 font-weight-bold">
              Save to Drafts
            </b-button>
          </b-col>
          <b-col cols="auto" class="p-0">
            <b-button pill variant="outline-dark"
                      class="story-default-btn saved-stories-btn px-2 py-1 mr-2 font-weight-bold">
              Next Chapter
            </b-button>
            <b-button pill variant="dark"
                      class="story-default-btn saved-stories-btn px-2 py-1 font-weight-bold">
              Publish Story
            </b-button>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="3" class="pr-0 pl-4">
        <div class="saved-stories-tags pt-2">
          <h6>Tags</h6>
          <b-form-input
              class="saved-stories-tags-input mt-4 py-3"
              placeholder="Write and press enter to add"
              trim
          ></b-form-input>

          <div class="saved-stories-tags-badge mt-2 py-2">

          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {VueEditor} from "vue2-editor";

export default {
  name: "AddEditStory",
  components: {VueEditor},
  mounted() {
    this.addStory()
  },
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
          text: 'Saved Stories',
        }
      ],
      items: [
        { name: 'Products', children: [
            { name: 'Shoes', path: '#' }
          ]},
        { name: 'About',
          path: '#',
          children: [
            {
              name: 'Contact',
              path: '#',
            }
          ]},
        { name: 'Github' },
      ],
      defaultOpenLevel: 1,
      customToolbar: [
        [{ font: [] }],
        [{ header: [false, 1, 2, 3, 4, 5, 6] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{align: ""}, {align: "center"}, {align: "right"}, {align: "justify"}],
        [{ list: "ordered" }, { list: "bullet" }],
        [{indent: "-1"}, {indent: "+1"}],
        ["blockquote", "code-block"],
        [{ 'script': 'sub'}, { 'script': 'super' }],
      ],
      tags: {
        data:[],
        form: ''
      }
    }
  },
  methods: {
    addStory() {
      this.$axios.post('story/add/').then(() => {
        // console.log(res.data);
      })
    },

    getTagList() {
      this.$axios.get(`tag/?page=1`).then(res=> {
        console.log(res.data);
      })
    }
  }
}
</script>

<style scoped lang="scss">
.add-edit-story-page {
  .saved-stories {
    &-tags {
      &-input {
        font-size: .68em;
      }
    }
    &-upload-file {
      font-size: .7em;
      border-bottom: 2.6px solid black;
    }
    &-title {
      color: #707070;
      font-size: .8em;
      &-input {
        font-size: .9em;
      }
    }
    &-btn {
      font-size: .7em;
    }
  }
}
</style>