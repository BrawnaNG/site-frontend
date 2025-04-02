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
        <div 
          class="container-fluid saved-stories-tags pt-2"
          v-if="has_chapters === 'true'"
          >
          <div class="row">
            <h6>Chapters</h6>
          </div>
          <div class="row">
            <TreeTable
              :value="chapters"
              selectionMode="single"
              v-model:selectionKeys="selected_chapter"
              @nodeSelect="onChapterSelect"
            >
              <Column 
                field="title"
                style="width: 100%">
              </Column>
            </TreeTable>
          </div>
        </div>

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
          </div>
          <div 
            class="row pb-4"
            v
          >
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
            <div class="col-2 p-0 px-4">
              <button class="story-default-btn saved-stories-btn px-2 py-1 mr-2 font-weight-bold rounded-pill">
                Cancel
              </button>
            </div>
            <div class="col-3 p-0 px-4">
              <button 
                class="story-default-btn saved-stories-btn px-2 py-1 font-weight-bold rounded-pill"
                @click="saveToDrafts()"
              >
                Save to Drafts
              </button>
            </div>
            <div class="col-2 p-0">
              <button 
                class="story-default-btn saved-stories-btn px-2 py-1 mr-2 font-weight-bold rounded-pill"
                v-if="has_chapters === 'true' && chapter.index > 0"
                @click="prevChapter()"
              >
                Prev Chapter
              </button>
            </div>
            <div class="col-2 p-0">
              <button 
                class="story-default-btn saved-stories-btn px-2 py-1 mr-2 font-weight-bold rounded-pill"
                v-if="has_chapters === 'true'"
                @click="nextChapter()"
              >
                Next Chapter
              </button>
            </div>
            <div class="col-2 p-0"> 
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
            <vue-tags-input
              v-model="new_tag"
              :tags="tags"
              :autocomplete-items="filteredItems"
              :is-duplicate="isDuplicate"
              :validation="tag_validation"
              :placeholder="`Write and press enter to add`"
              @tags-changed="newTags => tags = newTags"
            />
          </div>
          <div class="row pt-2">
            <h6>Categories</h6>
          </div>
          <div class="row">
            <TreeTable
              :value="all_categories"
              selectionMode="multiple"
              v-model:selectionKeys="selected_categories"
            >
              <Column 
                field="name"
                expander
                style="width: 100%">
              </Column>

            </TreeTable>
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
import VueTagsInput from '@sipec/vue3-tags-input';
import categorySort from "@/common/CategorySort";

export default {
  name: "AddEditStory",
  components: {
    QuillEditor, 
    BreadCrumbs, 
    UserMenu, 
    AddStory, 
    VueTagsInput,
  },
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
              id : ""
            }
          ]
      },
      chapter: 
      {
        id: this.chapterid,
        index: -1,
        title : "",
        body: '\n'
      },
      has_chapters: "false",
      defaultOpenLevel: 1,
      new_tag: '',
      tags: [],
      autocomplete_tags: [],
      all_categories: [],
      selected_categories: {},
      selectedKey: "id",
      chapters: [],
      selected_chapter: {},
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
      tag_validation: [
        {
          classes: 'no-special',
          rule: /^[a-zA-Z\d\s:]/,
          disableAdd: true
        },
      ],
    }
  },
  computed:{
    filteredItems() {
      return this.autocomplete_tags.filter(i => {
        return i.text.toLowerCase().indexOf(this.new_tag.toLowerCase()) !== -1;
      });
    }
  },
  mounted() {
    this.getAllCategories();
    this.getAllTags();
    this.getStory();
  },
  methods: {
    getStory() {
      this.axios.get(`/story/detail/${this.id}`).then(async (res) => {
        this.story = res.data;
        this.has_chapters = this.story.has_chapters ? "true" : "false";
        this.tags = this.story.tags.map( (tag) => {
          return {
            text: tag.name,
            id: tag.id
          }
        });
          this.selected_categories = this.story.categories.reduce( (cats, cat) => {
            cats[cat.id] = true;
            return cats;
          }, {});
          if (this.story.chapters &&this.story.chapters.length > 0){
            var index = -1;
            if (this.chapter.id){
              index = this.story.chapters.findIndex( (c) => c.id === this.chapter.id);
            }
            else if (this.chapter.index > -1){
              index = this.chapter.index;
            }
            if (index == -1){
              index = 0;
            }
            this.chapter.index = index;
            if (this.story.chapters.length > index){
              this.chapter.id = this.story.chapters[index].id;
              await this.axios.get(`/story/chapter/${this.chapter.id}`).then(chap_res => {
                this.chapter.body = chap_res.data.body;
                this.chapter.title = chap_res.data.title;
              })
            }
            else{
              this.chapter.id = null;
              this.chapter.title = `Chapter ${this.chapter.index+1}`;
              this.chapter.body = '\n';
            }
          }
          if (this.story.has_chapters){
            this.chapters = this.story.chapters.map( (chap) => {
              return {
                  key: chap.id,
                  data: this.chapter.id == chap.id ? this.chapter : chap,
                  selectable: true,
                  leaf: true
              }
            });

            if (!this.chapter.id){
              this.chapters.push(
                  {
                    key: -1,
                    data: this.chapter,
                    selectable: true,
                    leaf: true
                  }
                );
                this.selected_chapter = {};
                this.selected_chapter[-1] = true;
            }
            else{
              this.selected_chapter = {};
              this.selected_chapter[this.chapter.id] = true;
            }
          }
        }
      );
    },
    getAllCategories() {
      this.axios.get(`/category/list/`).then(res =>{
        var cats = res.data.sort(categorySort.sortCategories);
        var top = cats.filter( (cat) => !cat.parent );
        this.all_categories = top.map((cat) => this.makeCategory(cats, cat));
      });
    },
    makeCategory(categories, root){
      var children = categories.filter( (cat) => {
        return cat.parent && cat.parent === root.id;;
      });
      return {
        key: root.id,
        data: root,
        selectable: true,
        leaf: children && children.length > 0 ? false : true,
        children: children && children.length > 0 ? children.map( (child) => {
          return this.makeCategory(categories, child);
        }) : null
      }
    },
    getAllTags() {
      this.axios.get(`/tag/`).then(res => {
        this.autocomplete_tags = res.data.results.map( (tag) => {
          return {
            text: tag.name,
            id: tag.id
          }
        });
      });
    },
    isDuplicate(tags, tag) {
      return tags.map(t => t.text.toLowerCase()).indexOf(tag.text.toLowerCase()) !== -1;
    },
    ciEquals(a, b) {
      return typeof a === 'string' && typeof b === 'string'
          ? a.localeCompare(b, undefined, { sensitivity: 'accent' }) === 0
          : a === b;
    },
    saveToDrafts() {
      this.saveStory(false, () => {
        this.getStory();
      })
    },
    publishStory() {
      this.saveStory(true, () => {
        this.getStory();
      })
    },
    saveStory(is_published, callback){
      this.axios.put(`/story/save-story/${this.id}/`,
        {
          title: this.story.title,
          is_published: is_published,
          has_chapters: this.has_chapters === "true",
          categories: Object.keys(this.selected_categories).map( (k) => {
            return {
              id: k
            }
          }),
          tags: this.tags.map( (tag) => {
            return {
              name: tag.text,
              id: tag.id
            }
          })
        }).then( () => {
          if (!this.chapter.id){
            this.axios.post(`/story/${this.id}/chapter/add/`,
            {
              title: this.chapter.title,
              body: this.chapter.body   
            }).then( () => {
              callback();
            });
        }
        else {
          this.axios.put(`/story/save-chapter/${this.chapter.id}/`,
          {
            title: this.chapter.title,
            body: this.chapter.body
          }).then( () => {
            callback()
          });
        }
      });
    },
    async onChapterSelect(chap){
      this.saveStory(this.story.is_published, () => {
        this.chapter.id = chap.key;
        this.getStory();
      });
    },
    nextChapter(){
      this.saveStory(this.story.is_published, () => {
        this.chapter.index++;
        this.chapter.id = null;
        this.getStory();
      });
    },
    prevChapter(){
      this.saveStory(this.story.is_published, () => {
        this.chapter.index--;
        this.chapter.id = null;
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