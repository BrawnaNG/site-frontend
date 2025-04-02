<template>
  <div class="saved-stories-page">
    <div class="container-fluid saved-stories-head border-bottom">
      <div class="row m-0 py-3 justify-content-between col-10 my-0 mx-auto">
        <div class="col px-0">
          <h2 class="m-0 pt-1">
            {{ story.title }}
          </h2>
          <div class="pt-3">
            {{ story.user }} • {{ moment(story.created_at).format('MMM YY') }} 
            | 
            {{ (story.categories.length ? story.categories[0].name : '') }}
          </div>
        </div>
        <div class="col pt-4 px-0">
          <div class="float-end">
            <span class="pr-3">
              <img
                class="pt-1 cursor-pointer"
                src="../../assets/image/icon/Bookmark.svg"
                alt=""
              >
            </span>
            <span>
              <img
                class="pt-1 cursor-pointer"
                src="../../assets/image/icon/Send.svg"
                alt=""
              >
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid border border-warning mx-auto pt-5 px-4 py-4">
      <div class="row">

        <div class="col-3">
          <div 
          class="container-fluid saved-stories-tags pt-2"
            v-if="story.has_chapters"
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
        </div>

        <div class="col-6">
          <div class="container-fluid">

            <div class="row">
              <h3>
                {{ chapter.title }}
              </h3>
            </div>

            <div 
              class="row pb-4 border-bottom"
            >
              <div 
                class="ql-editor"
                v-html="chapter.body"
              >
              </div>
            </div>

            <div 
              class="row p-2"
            >
              <h6>Comments</h6>
            </div>
            <div
              v-for="comment in story.comments"
              :key="`comment_${comment}`"
              class="row comments-stories-content-card pb-2"
            >
              <comments-card 
                :comment-card="comment"
              />
            </div>

            <div
              v-if="isAuthenticated" 
              class="row py-4"
            >
            <button 
              class="btn btn-primary" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#commentBox" 
              aria-expanded="false" 
              aria-controls="#commentBox">
              Add Comment
            </button>
              <div 
                class="container-fluid collapse pt-4"
                id="commentBox"
              >
                <div class="row  pb-2">
                  <div class="col-10">
                    <textarea 
                      v-model="comment_text"
                      class="form-control"
                    />
                  </div>
                </div>
                
                <div class="row">
                  <div class="col-10">
                    &nbsp;
                  </div>
                  <div class="col-2">
                    <button 
                      class="float-end rounded-pill m-1"
                      @click="addComment()"
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div
          class="col-3"
        >
          <div 
            class="container-fluid saved-stories-tags pt-2"
            v-if="story.tags && story.tags.length > 0"
          >
              <div class="row">
                <h6>Tags</h6>
              </div>
              <div class="row">
                <div>
                    <Tag
                      v-for="tag in story.tags"
                      :value="`${tag.name}`"
                      class="mb-2 me-2"
                    >
                    </Tag>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject } from 'vue';
import CommentsCard from "@/components/Card/CommentsCard.vue";
import '@vueup/vue-quill/dist/vue-quill.snow.css';
export default {
  name: "ShowStory",
  components: {
    CommentsCard
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
  setup() {
      const moment = inject('moment');
      return { moment };
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
          comments: [],
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
      chapters: [],
      selected_chapter: {},
      comment_text: ""
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.auth.isAuthenticated;
    }
  },
  mounted() {
    this.getStory();
  },
  methods: {
    getStory() {
      this.axios.get(`/story/detail/${this.id}`).then(
        res => {
          this.story = res.data;
          if (this.story.chapters && this.story.chapters.length > 0){
            if (!this.chapter.id) {
              this.chapter.id = this.story.chapters[0].id;
            }
            this.axios.get(`/story/chapter/${this.chapter.id}`).then(
              chap_res => {
                this.chapter.body = chap_res.data.body;
                this.chapter.title = chap_res.data.title;
              }
            );
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
            this.selected_chapter = {};
            this.selected_chapter[this.chapter.id] = true;
          }

        }
      );
    },
    addComment() {
      this.axios.post(`/comment/add/${this.id}/`,
        {
          body: this.comment_text
        }).then(res => {
          this.story.comments.push(res.data);
          this.comment_text = "";
        })
    },
    async onChapterSelect(chap){
      this.chapter.id = chap.key;
      this.getStory();
    },
  }
}
</script>

<style scoped lang="scss">
</style>