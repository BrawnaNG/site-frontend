<template>
  <div>
    <!-- Header  -->
    <div class="container-fluid pb-2 story-header">

      <div class="row m-3 justify-content-md-start">
        <div class="col-md-auto">
          <div class="m-0 pt-1 story-title">
            {{ story.title }}
          </div>
        </div>
      </div>

      <div class="row m-3 justify-content-md-start">
        <div class="col-md-auto">
          <div class="text-nowrap">
            <RouterLink
              :to="{name: 'single-parent', params: {type: 'accounts', id: story.user_id}}"
            >
              {{ story.user }}
            </RouterLink>
             | {{ moment(story.created_at).format('MMM YY') }} 
            <span class="text-nowrap"
              v-if="story.categories.length">
              |
              <RouterLink
                :to="{name: 'single-parent', params: {type: 'category', id: story.categories[0].id}}"
              >
              {{ story.categories[0].name }}
              </RouterLink>
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- End Header -->

    <!-- Story Container-->
    <div class="container-fluid mx-auto pt-4 px-4">
      <div class="row justify-content-md-start">

        <!-- Chapters -->
        <div class="col-md-auto mb-4">
          <div 
            class="container-fluid pt-2"
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
        <!-- End Chapters-->

        <!-- Story Content-->
        <div class="col-lg">
          <div class="container-fluid">

            <div 
              class="row chapter-title ps-2"
              v-if="story.has_chapters"
            >
              {{ current_chapter.title }}
            </div>

            <div 
              class="row story-content"
            >
              <div 
                id="show-story"
                class="ql-editor"
                v-html="current_chapter.body"
              >
              </div>
            </div>
          </div>
        </div>
        <!-- End Story Content-->

        <!-- Tags -->
        <div class="col-2">
          <div 
            class="container-fluid"
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
                  @click="gotoTag(tag.id)"
                >
                </Tag>
              </div>
            </div>
          </div>
        </div>
        <!-- End Tags-->
      </div>
    </div>
    <!-- End Story Container -->

    <!-- Comments Container-->
    <div class="container-fluid w-75 pb-4">
      <!-- Old Comments -->
      <div class="row m-3 justify-content-md-start mt-4">
        <h4>Comments</h4>
      </div>
      <div 
        class="row m-3 ms-4 justify-content-md-start"
        v-if="!story.comments || story.comments.length === 0"
      >
        There are no comments on this story
      </div>
      <div
        v-for="comment in story.comments"
        :key="`comment_${comment}`"
        class="row comments-stories-content-card m-3"
      >
        <comments-card 
          :comment-card="comment"
        />
      </div>

      <!-- End Old Comments -->

      <!-- Add new comment -->
      <div v-if="isAuthenticated">
        <div 
          id="addCommentRow"
          class="row justify-content-md-center collapse show">
          <div class="col-md-auto my-3">
            <button 
              class="btn btn-primary" 
              type="button"
              @click="toggleCommentControls"
            >
              Add Comment
            </button>
          </div>
        </div>
        <div 
          class="container-fluid collapse pt-4"
          id="commentBox"
        >
          <div class="row justify-content-md-center">
            <div class="col-9">
              <textarea 
                v-model="comment_text"
                class="form-control border-primary"
                rows="4"
              >
              </textarea>
            </div>
          </div>
          <div class="row justify-content-md-end">
            <div class="col-md-auto mt-2">
              <button
                  class="btn btn-secondary rounded"
                  @click="cancelComment"
              >
                  Cancel
              </button>
            </div>
            <div class="col col-2 mt-2">
              <button
                  class="btn btn-primary rounded active"
                  @click="addComment"
              >
                  Comment
              </button>
            </div>
            <div class="col-1">
              &nbsp;
            </div>
          </div>
        </div>
      </div>
      <!-- End Add new comment-->
    </div>
    <!-- End Comment Container -->
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue';
import CommentsCard from "@/components/Card/CommentsCard.vue";
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { useAuthStore } from '@/stores/auth';
import api from '@/services/api';
import { inject } from 'vue';
import { Collapse } from 'bootstrap';
import { useRouter } from 'vue-router';

const router = useRouter();
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
  user_id: null,
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

const addCommentCollapse = ref(null);
const commentBoxCollapse = ref(null);

const toggleCommentControls = () => {
  if (!addCommentCollapse.value){
    addCommentCollapse.value = new Collapse(document.getElementById('addCommentRow'),
    {
      toggle: true
    });
  }
  if (!commentBoxCollapse.value){
    commentBoxCollapse.value = new Collapse(document.getElementById('commentBox'),
    {
      toggle: true
    });
  }
  addCommentCollapse.value.toggle();
  commentBoxCollapse.value.toggle();
}

const cancelComment = () => {
  comment_text.value = "";
  toggleCommentControls();
}

watch(current_chapter, (val) => {
  if (!containsHtmlRegex(val.body)){
    // A bit of a hack. But for older stories that are just text, paragraph breaks are often missing.
    // This looks for those and adds another line-end to space them out.
    let newText = val.body.replace(/(?<=\S)(?<!\r?\n)(\r?\n)(?!\r?\n)/gm, '\n\n');
    val.body = newText;
    const editor = document.getElementById("show-story");
    if (editor)
      editor.innerText = val.body;
  }
});

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
  if (!comment_text.value)
    return;
  await api.post(`/comment/add/${props.id}/`,{
    body: comment_text.value
  }).then(
    (res) => {
      story.comments.push(res.data);
      comment_text.value = "";
    toggleCommentControls();
    }
  );
}

const gotoTag = (id) => {
  router.push({name: 'single-parent', params: { type: 'tag', id: id } });
}

function containsHtmlRegex(text) {
  // This regex checks for the presence of opening or closing HTML tags.
  // It's a general check and might not catch all valid HTML or differentiate from malformed tags.
  return /<\/?[a-z][\s\S]*>/i.test(text); 
}

</script>

<style scoped lang="scss">

.chapter-title {
  font-size: 1.4em;
  font-weight: 600;
}

.story-title {
  font-size: 2em;
  font-weight: 600;
}

</style>