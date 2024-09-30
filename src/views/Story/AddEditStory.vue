<template>
  <div class="container-flex add-edit-story-page">
    <bread-crumbs label="Create Story" />
    <user-menu />
    <div class="row my-0 mx-auto py-5">
      <div class="col-3 pl-0">
        <!--          <vue-tree-navigation :items="items"  :defaultOpenLevel="defaultOpenLevel"/>-->
      </div>
      <div class="col-6 p-0 saved-stories">
        <span class="saved-stories-upload-file font-weight-bold py-2 cursor-pointer">
          Upload Document
        </span>
      </div>
      <div class="row pb-5 m-0 justify-content-between">
        <h6 class="m-0">
          Are there multiple chapters in your story?
        </h6>
        <div class="form-check">
          <input 
            id="check-button" 
            class="form-check-input" 
            type="checkbox" 
            value=""
          >
        </div>
      </div>
      <div class="row saved-stories-title pb-3">
        <label 
          for="titleInput"
          class="form-label"
        >
          Title
        </label>
        <input 
          id="titleInput"
          type="text"
          class="form-control"
        >
      </div>
      <div class="row text-editor-chapter py-2">
        <VueEditor :editor-toolbar="customToolbar" />
      </div>
      <div class="row pt-3 justify-content-between m-0">
        <div class="col p-0">
          <button
            pill
            variant="outline-dark"
            class="story-default-btn saved-stories-btn px-2 py-1 mr-2 font-weight-bold"
          >
            Cancel
          </button>
          <button
            pill
            variant="outline-dark"
            class="story-default-btn saved-stories-btn px-2 py-1 font-weight-bold"
          >
            Save to Drafts
          </button>
        </div>
        <div class="col p-0">
          <button
            pill
            variant="outline-dark"
            class="story-default-btn saved-stories-btn px-2 py-1 mr-2 font-weight-bold"
          >
            Next Chapter
          </button>
          <button
            pill
            variant="dark"
            class="story-default-btn saved-stories-btn px-2 py-1 font-weight-bold"
          >
            Publish Story
          </button>
        </div>
      </div>
      <div class="row pr-0 pl-4">
        <div class="saved-stories-tags pt-2">
          <h6>Tags</h6>
          <input
            class="text saved-stories-tags-input mt-4 py-3"
            placeholder="Write and press enter to add"
            trim
          >
          <div class="saved-stories-tags-badge mt-2 py-2" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {VueEditor} from "vue2-editor";
import BreadCrumbs from "@/components/Dashboard/BreadCrumbs.vue";
import UserMenu from "@/components/Dashboard/UserMenu.vue";

export default {
  name: "AddEditStory",
  components: {VueEditor, BreadCrumbs, UserMenu},
  data() {
    return {
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
  mounted() {
    this.addStory()
  },
  methods: {
    addStory() {
      this.axios.post('story/add/').then(() => {
        // console.log(res.data);
      })
    },

    getTagList() {
      this.axios.get(`tag/?page=1`).then(res=> {
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