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
                field="index_1"
                style="width:20%">
              </Column>
              <Column 
                field="title"
                style="width: 80%">
              </Column>
            </TreeTable>
          </div>
        </div>
        <div class="row justify-content-center pt-2 px-2">
          <div class="col-9">
            <button 
              class="btn btn-secondary rounded m-2 p-2 w-100"
              v-if="story.has_chapters && current_chapter.index > 0"
              @click="newChapter(true)"
            >
              New Chapter Before
            </button>
          </div>
        </div>
        <div class="row justify-content-center px-2">
          <div class="col-9">
            <button 
              class="btn btn-secondary rounded m-2 p-2 w-100"
              v-if="story.has_chapters"
              @click="newChapter(false)"
            >
              New Chapter After
            </button>
          </div>
        </div>
        <div class="row justify-content-center px-2">
          <div class="col-9">
            <button 
              class="btn btn-danger rounded m-2 p-2 w-100"
              v-if="story.has_chapters && story.chapter_summaries.length > 1"
              data-bs-toggle="modal" 
              data-bs-target="#deleteChapterModal"
            >
              Delete Chapter
            </button>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="content-fluid">
          <div class="row pb-3">
            <div class="col-3">
              <label 
                for="titleInput"
                class="form-label pt-2 pb-2"
              >
                Story title
              </label>
            </div>
            <div class="col-9">
              <input 
                id="titleInput"
                v-model="story.title"
                type="text"
                class="form-control"
              >
            </div>
            <div class="row">
              <div class="col-3">
                <label>
                  Status
                </label>
              </div>
              <div class="col-9">
                <span 
                  v-if="!story.is_published"
                  class="badge rounded-pill text-bg-warning"
                >Draft</span>
                <span 
                  v-if="story.is_published"
                  class="badge rounded-pill text-bg-success"
                >Published</span>
              </div>
            </div>
          </div>
          <div class="row pb-1">
            <div class="col-3">
              <label
                for="flexSwitchCheckChecked"
                class="form-label"
              >
                Multiple chapters?
              </label>
            </div>
            <div class="col-3">
              <div class="form-check form-switch">
                <input 
                  class="form-check-input" 
                  type="checkbox" 
                  id="flexSwitchCheckChecked"
                  :checked="story.has_chapters"
                  :disabled="story.has_chapters && story.chapter_summaries.length > 1"
                  @click="toggleHasChapters"
                >
              </div>
            </div>
          </div>
          <div 
            class="row pb-2"
            v-if="story.has_chapters"
          >
            <div class="col-3">
              <label 
                for="chapterTitleInput"
                class="form-label pt-2"
              >
                Chapter title
              </label>
            </div>
            <div class="col-9">
              <input 
                id="chapterTitleInput"
                v-model="current_chapter.title"
                type="text"
                class="form-control"
              >
            </div>
          </div>
          <div class="row text-editor-chapter py-2 h-75">
              <QuillEditor 
                id="qe-editor"
                v-model:content="current_chapter.body"
                theme="snow" 
                content-type="html"
              />
          </div>
          <div class="row pt-2 m-0">
            <div class="col-12">
              <button 
                class="btn btn-secondary rounded me-2"
                @click="saveToDrafts()"
              >
                Save to Drafts
              </button>
              <button 
                class="btn btn-secondary rounded me-2"
                @click="publish()"
              >
                Publish
              </button>
              <button 
                class="btn btn-secondary rounded me-2"
                @click="cancel()">
                Cancel
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
              :autocomplete-items="filteredTags"
              :is-duplicate="isDuplicate"
              :validation="tag_validation"
              :placeholder="`Write and press enter to add`"
              @tags-changed="newTags => tags = newTags"
            />
          </div>
          <div class="row mt-4">
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

<div class="modal fade" id="deleteChapterModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header bg-danger text-white">
                <h5 class="modal-title" id="deleteModalLabel">Confirm Deletion</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p class="mb-0">Are you sure you want to delete this chapter? This action cannot be undone.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-danger" id="confirmDelete" data-bs-dismiss="modal" @click="deleteChapter()">Delete</button>
            </div>
        </div>
    </div>
</div>

</template>

<script async setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import BreadCrumbs from "@/components/Dashboard/BreadCrumbs.vue";
import UserMenu from "@/components/Dashboard/UserMenu.vue";
import AddStory from "@/components/Dashboard/AddStory.vue";
import VueTagsInput from '@sipec/vue3-tags-input';
import categorySort from "@/common/CategorySort";
import api from '@/services/api';
import { useRouter } from 'vue-router';

const router = useRouter();

// Props
const props = defineProps({
  id: {
    type: String,
    default: null
  },
  chapterid: {
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
  chapter_summaries: []
});

const current_chapter = reactive({
  id: props.chapterid,
  index: -1,
  title: "",
  body: '\n'
});

const new_tag = ref('');
const tags = ref([]);
const autocomplete_tags = ref([]);
const all_categories = ref([]);
const selected_categories = ref({});
const selected_chapter = ref({});
const chapter_guard = ref(false);

const tag_validation = [
  {
    classes: 'no-special',
    rule: /^[a-zA-Z\d\s:]/,
    disableAdd: true
  },
];

// Lifecycle hooks
onMounted( async () => {
  await getAllCategories();
  await getAllTags();
  await loadStory();
  await loadChapter(story.chapter_summaries[0].id);
});

// Computed properties
const filteredTags = computed(() => {
  return autocomplete_tags.value.filter(i => {
    return i.text.toLowerCase().indexOf(new_tag.value.toLowerCase()) !== -1;
  });
});

const chapters = computed( () =>{
  if (!chapter_guard.value){
    return story.chapter_summaries.map((chap,index) => {
      const item = {
        key: chap.id,
        data: (current_chapter.id && current_chapter.id == chap.id) ? current_chapter : chap,
        selectable: true,
        leaf: true
      };
      item.data.index_1 = index +1;
      return item;
    });
  } 
})

// Methods
const loadStory = async () => {
  const res = await api.get(`/story/detail/${props.id}`);
  Object.assign(story, res.data);

  tags.value = story.tags.map((tag) => {
    return {
      text: tag.name,
      id: tag.id
    }
  });

  selected_categories.value = story.categories.reduce((cats, cat) => {
    cats[cat.id] = true;
    return cats;
  }, {});
}

const loadChapter = async (chapter_id) => {
  selected_chapter.value = {};
  const res = await api.get(`/story/chapter/${chapter_id}/`);
  Object.assign(current_chapter, res.data);
  current_chapter.index = story.chapter_summaries.findIndex(cs => {
    return cs.id === chapter_id;
  });
  if (!current_chapter.body)
    current_chapter.body = '\n';
  selected_chapter.value[current_chapter.id] = true;
}

const toggleHasChapters = async () => {
  if (story.has_chapters){
    story.has_chapters = false;
    selected_chapter.value = {};
  }
  else{
    story.has_chapters = true;
    await loadChapter(story.chapter_summaries[0].id);
  }
};

const getAllCategories = async () => {
  try {
    const res = await api.get(`/category/list/`);
    const cats = res.data.sort(categorySort.sortCategories);
    const top = cats.filter((cat) => !cat.parent);
    all_categories.value = top.map((cat) => makeCategory(cats, cat));
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

const makeCategory = (categories, root) => {
  const children = categories.filter((cat) => {
    return cat.parent && cat.parent === root.id;
  });
  return {
    key: root.id,
    data: root,
    selectable: true,
    leaf: children && children.length > 0 ? false : true,
    children: children && children.length > 0 ? children.map((child) => {
      return makeCategory(categories, child);
    }) : null
  }
};

const getAllTags = async () => {
  try {
    const res = await api.get(`/tag/`);
    autocomplete_tags.value = res.data.results.map((tag) => {
      return {
        text: tag.name,
        id: tag.id
      }
    });
  } catch (error) {
    console.error("Error fetching tags:", error);
  }
};

const isDuplicate = (tagsArray, tag) => {
  return tagsArray.map(t => t.text.toLowerCase()).indexOf(tag.text.toLowerCase()) !== -1;
};

const saveToDrafts = () => {
  saveStory(false);
};

const publish = () => {
  saveStory(true);
};

const saveStory = async (is_published) => {
  try {
    await api.put(`/story/save-story/${props.id}/`,
      {
        title: story.title,
        is_published: is_published,
        has_chapters: story.has_chapters,
        categories: Object.keys(selected_categories.value).map((k) => {
          return {
            id: k
          }
        }),
        tags: tags.value.map((tag) => {
          return {
            name: tag.text,
            id: tag.id
          }
        })
      });
    await loadStory();
    await api.put(`/story/chapter-save/${current_chapter.id}/`,
    {
      title: current_chapter.title,
      body: current_chapter.body
    });    
  } catch (error) {
    console.error("Error saving story:", error);
  }
};

const cancel = () => {
  router.back();
};

const onChapterSelect = async (chap) => {
  await saveStory(story.is_published);
  await loadStory();
  await loadChapter(chap.key)
};

const newChapter = async (before) => {
  await saveStory(story.is_published);
  const res = await api.post(`/story/${story.id}/chapter/add/`,{
      pos: before ? current_chapter.index : current_chapter.index+1,
      title: "New Chapter",
      body: ""
    });
  chapter_guard.value = true;
  await loadStory();
  await loadChapter(res.data.id);
  chapter_guard.value = false;
};

const deleteChapter = async (before) => {
  await saveStory(story.is_published);
  const res = await api.delete(`/story/chapter-delete/${current_chapter.id}/`)
  await loadStory();
  await loadChapter(story.chapter_summaries[0].id);
};

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
  .btn {
    font-size: 0.8em;
    font-weight: bold;
  }
}
</style>
