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
                {{ current_chapter.title }}
              </h3>
            </div>

            <div 
              class="row pb-4 border-bottom"
            >
              <div 
                class="ql-editor"
                v-html="current_chapter.body"
              >
              </div>
            </div>

            <div 
              class="row p-2"
              v-if="story.comments && story.comments.length > 0"
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
                    >
                    </textarea>
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

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import CommentsCard from "@/components/Card/CommentsCard.vue";
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { useAuthStore } from '@/stores/auth';
import api from '@/services/api';
import { inject } from 'vue';
import { Collapse } from 'bootstrap';

const moment = inject('moment');

// Props
const props = defineProps({
  id: {
    type: String,
    default: null
  }
});

// Reactive state
const story = reactive({
  title: "",
  user: "",
  created_at: null,
  categories: [],
  tags: [],
  has_chapters: false,
  chapter_summaries: [],
  comments: []
});

const current_chapter = reactive({
  id: props.chapterid,
  index: -1,
  title: "",
  body: '\n'
});

const selected_chapter = ref({});
const comment_text = ref("");

// Lifecycle hooks
onMounted( async () => {
  await getStory();
  const chapter_id = story.chapter_summaries[0].id;
  await loadChapter(chapter_id);
});

// Computed properties
const chapters = computed( () =>{
  return story.chapter_summaries.map((chap) => {
    return {
      key: chap.id,
      data: (current_chapter.id && current_chapter.id == chap.id) ? current_chapter : chap,
      selectable: true,
      leaf: true
    }
  });
})

const isAuthenticated = computed( () => {
      const authStore = useAuthStore();
      return authStore.isAuthenticated;
});

// Methods
const getStory = async () => {
  const res = await api.get(`/story/detail/${props.id}`);
  Object.assign(story, res.data);
};

const loadChapter = async (chapter_id) => {
  selected_chapter.value = {};
  const res = await api.get(`/story/chapter/${chapter_id}/`);
  Object.assign(current_chapter, res.data);
  selected_chapter.value[current_chapter.id] = true;
}
  
const onChapterSelect = async (chap) => {
  await loadChapter(chap.key)
};

const addComment = async () => {
  const res = await api.post(`/comment/add/${props.id}/`,{
    body: comment_text.value
  });
  story.comments.push(res.data);
  comment_text.value = "";
  const commentBox = document.querySelector('#commentBox');
  if (commentBox) {
      new Collapse(commentBox, {
          toggle: false,
      }).hide();
  }
}
</script>

<style scoped lang="scss">
</style>
