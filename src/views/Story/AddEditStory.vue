<template>
  <div class="container-flex add-edit-story-page">
    <div class="container-fluid saved-stories-page-head mx-auto py-3">
      <div class="row h-100 m-0">
        <div class="col-8 px-4 dashboard-page-head-title">
          <h4 class="m-0 px-4 font-weight-bolder">
            Create Story
          </h4>
          <bread-crumbs 
            label="Create Story"
            class="px-4"
          />
        </div>
        <div class="col-4 px-4 pt-2 mt-1 text-right">
          <add-story class="float-end" />
        </div>
      </div>
    </div>
    <user-menu />
    <div class="row my-0 mx-auto py-5 h-100">
      <div class="col-3 pl-0">
        <!--          <vue-tree-navigation :items="items"  :defaultOpenLevel="defaultOpenLevel"/>-->
      </div>
      <div class="col-6">
        <div class="content-fluid">
          <div class="row pb-4">
            <div class="col-2">
              <label 
                for="titleInput"
                class="form-label"
              >
                Story title
              </label>
            </div>
            <div class="col-7">
              <input 
                id="titleInput"
                v-model="story.title"
                type="text"
                class="form-control"
              >
            </div>
            <div class="col-3">
              <span>
                Upload Document
              </span>
            </div>
          </div>
          <div class="row pb-4">
            <div class="col-2">
              <label 
                for="chapterTitleInput"
                class="form-label"
              >
                Chapter title
              </label>
            </div>
            <div class="col-7">
              <input 
                id="chapterTitleInput"
                v-model="chapter.title"
                type="text"
                class="form-control"
              >
            </div>
          </div>
          <div class="row pb-4 m-0 justify-content-between">
            <div class="col-9">
              <h6 class="m-0">
                Are there multiple chapters in your story?
              </h6>
            </div>
            <div class="col-3">
              <input 
                id="chapters-yes"
                type="radio"
                v-model="has_chapters"
                value="true">
              <label for="chapters-yes">Yes</label>
              <input 
                id="chapters-no"
                type="radio"
                v-model="has_chapters"
                value="false">
              <label for="chapters-yes">No</label>
            </div>
          </div>
          <div class="row text-editor-chapter py-2 h-75">
            <QuillEditor 
              id="qe-editor"
              v-model:content="chapter.body"
              theme="snow" 
              content-type="html"
            />
          </div>
          <div class="row pt-3 justify-content-between m-0">
            <div class="col-6 p-0 px-4">
              <button class="story-default-btn saved-stories-btn px-2 py-1 mr-2 font-weight-bold rounded-pill">
                Cancel
              </button>
              <button 
                class="story-default-btn saved-stories-btn px-2 py-1 font-weight-bold rounded-pill"
                @click="saveToDrafts()"
              >
                Save to Drafts
              </button>
            </div>
            <div class="col-6 p-0">
              <button 
                class="story-default-btn saved-stories-btn px-2 py-1 mr-2 font-weight-bold rounded-pill"
                v-if="has_chapters === 'true'"
                @click="nextChapter()"
              >
                Next Chapter
              </button>
              <button class="story-default-btn saved-stories-btn px-2 py-1 font-weight-bold rounded-pill">
                Publish Story
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-3 pr-0 pl-4">
        <div class="container-fluid saved-stories-tags pt-2">
          <div class="row">
            <h6>Tags</h6>
          </div>
          <div class="row">
            <input
              class="text saved-stories-tags-input mt-4 py-3"
              placeholder="Write and press enter to add"
              trim
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import BreadCrumbs from "@/components/Dashboard/BreadCrumbs.vue";
import UserMenu from "@/components/Dashboard/UserMenu.vue";
import AddStory from "@/components/Dashboard/AddStory.vue";

export default {
  name: "AddEditStory",
  components: {QuillEditor, BreadCrumbs, UserMenu, AddStory},
  props: {
    id: {
      type: String,
      default: null
    },
    chapterid: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      story:{
          title : "",
          user: "",
          created_at: null,
          categories: [],
          tags: [],
          has_chapters: false,
          chapters:[
            {
              title : "",
              body: ""
            }
          ]
      },
      chapter:{
        title : "",
        body: '\n'
      },
      has_chapters: "false",
      current_chapter_id: null,
      current_chapter_index: -1,
      defaultOpenLevel: 1,
      content: '\n',
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
      ]
    }
  },
  mounted() {
    this.getStory();
  },
  methods: {
    getStory() {
      this.axios.get(`/story/detail/${this.id}`).then(res => {
        this.story = res.data;
        this.has_chapters = this.story.has_chapters ? "true" : "false";

        if (res.data.chapter_ids && res.data.chapter_ids.length > 0){
          var index = -1;
          if (this.chapterid){
            index = res.data.chapter_ids.findIndex( (c) => c.id === this.chapterid);
          }
          else if (this.current_chapter_index > -1){
            index = this.current_chapter_index;
          }

          if (index == -1){
            index = 0;
          }

          this.current_chapter_index = index;
          if (res.data.chapter_ids.length > index){
            this.current_chapter_id = res.data.chapter_ids[index].id;
          }
          else{
            this.current_chapter_id = null;
          }

          if (this.current_chapter_id){
            this.axios.get(`/story/chapter/${this.current_chapter_id}`).then(res => {
              this.chapter = res.data;
            })
          }
          else{
            this.chapter.body = '\n';
          }
        }
      })
    },
    saveToDrafts() {
      this.axios.post(`/story/save-story/${this.id}/`,
        {
          title: this.story.title,
          chapter_id: this.story.current_chapter_id,
          chapter_title: this.chapter.title,
          body: this.chapter.body,
          is_published: false,
          has_chapters: this.has_chapters === "true"
        })
    },
    nextChapter(){
      this.axios.post(`/story/save-story/${this.id}/`,
        {
          title: this.story.title,
          chapter_id: this.current_chapter_id,
          chapter_title: this.chapter.title,
          body: this.content,
          is_published: this.story.is_published,
          has_chapters: this.has_chapters === "true"
        }).then( () => {
            this.current_chapter_index++;
            this.getStory();
        });
    }
  }
}
</script>

<style scoped lang="scss">
.add-edit-story-page{
  .text-editor-chapter .ql-container {
    height: 500px;
  }
  :deep(.ql-editor) {
    height: 250px;
    max-height: 250px;
    overflow: auto;
  }
  #qe-editor {
    height: 500px;
  }
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