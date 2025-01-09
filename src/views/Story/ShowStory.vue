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
          TO DO TREE
        </div>
        <div class="col-7">
          <div class="container-fluid">
            <div 
              v-if="story.chapters.length > 0 && story.chapters.title"
              class="row pb-4"
            >
              <h3>
                {{ story.chapters[0].title }}
              </h3>
            </div>
            <div 
              v-if="story.chapters.length > 0"
              class="row pb-4"
            >
              {{ story.chapters[0].body }}
            </div>
            <div
              v-if="isAuthenticated" 
              class="row pb-4"
            >
              <div class="container-fluid">
                <div class="row  pb-2">
                  <div class="col-2">
                    AVATAR
                  </div>
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
            <div
              v-for="comment in story.comments"
              :key="`comment_${comment}`"
              class="row comments-stories-content-card"
            >
              <comments-card 
                :comment-card="comment"
              />
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
import store from '@/store';
export default {
  name: "ShowStory",
  components: {CommentsCard},
  props: {
    id: {
      type: String,
      default: null
    }, 
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
          comments: [],
          chapters: []
        },
      comment_text: "",
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.auth.status.isAuthenticated;
    }
  },
  mounted() {
    this.getStory()
  },
  methods: {
    getStory() {
      this.axios.get(`/story/detail/${this.id}`).then(res => {
        this.story = res.data;
      })
    },
    addComment() {
      this.axios.post(`/comment/add/${this.id}/`,
        {
          body: this.comment_text
        }).then(res => {
          this.story.comments.push(res.data);
          this.comment_text = "";
        })
    }
  }
}
</script>

<style scoped lang="scss">
</style>