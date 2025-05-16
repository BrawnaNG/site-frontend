import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Dashboard from '../views/Dashboard/DashboardPage.vue';
import Admin from '../views/Admin/AdminPage.vue';
import UsersAccount from "@/views/Admin/UsersAccount.vue";
import UserStories from "@/views/Admin/UserStories.vue";
import CommentsManagement from "@/views/Admin/CommentsManagement.vue";
import CategoryManagement from "@/views/Admin/CategoryManagement.vue";
import SavedStories from "@/views/Dashboard/SavedStories.vue";
import CommentsStory from "@/views/Dashboard/StoriesComment.vue";
import StoryDrafts from "@/views/Dashboard/StoryDrafts.vue";
import ShowStory from "@/views/Story/ShowStory.vue";
import AddEditStory from "@/views/Story/AddEditStory.vue";
import SearchResults from "@/views/SearchResults.vue";
import { useAuthStore } from '@/stores';
import SingleCategory from '@/views/SingleCategory.vue';
import AllCategories from '@/views/AllCategories.vue';
import SingleTag from '@/views/SingleTag.vue';
import AllTags from '@/views/AllTags.vue';
import SingleAuthor from '@/views/SingleAuthor.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      authRequired: 'false',
    },
  },
  {
    path: '/search-results/search=:search?',
    name: 'searchResults',
    props: true,
    component: SearchResults,
    meta: {
      authRequired: 'false',
    },
  },
  {
    path: '/story/show-story/:id/:chapterid?',
    name: 'story',
    props: true,
    component: ShowStory,
    meta: {
      authRequired: 'false',
    },
  },
  {
    path: '/story/add-edit-story/:id/:chapterid?',
    name: 'addEditStory',
    props: true,
    component: AddEditStory,
    meta: {
      authRequired: 'true',
      roles: ['admin','author']
    },
  },
  {
    path: '/dashboard/your-stories',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      authRequired: 'true',
      roles: ['admin','author']
    },
  },
  {
    path: '/dashboard/saved-stories',
    name: 'savedStories',
    component: SavedStories,
    meta: {
      authRequired: 'true',
      roles: ['admin','author']
    },
  },
  {
    path: '/dashboard/story-comments',
    name: 'commentsStory',
    component: CommentsStory,
    meta: {
      authRequired: 'true',
      roles: ['admin','author']
    },
  },
  {
    path: '/dashboard/drafts',
    name: 'drafts',
    component: StoryDrafts,
    meta: {
      authRequired: 'true',
      roles: ['admin','author']
    },
  },
  {
    path: '/admin/recent-stories',
    name: 'admin',
    component: Admin,
    meta: {
      authRequired: 'true',
      roles: ['admin']
    },
  },
  {
    path: '/admin/user-account',
    name: 'users',
    component: UsersAccount,
    meta: {
      authRequired: 'true',
      roles: ['admin']
    },
  },
  {
    path: '/admin/user-account/:username',
    name: 'userStories',
    component: UserStories,
    meta: {
      authRequired: 'true',
      roles: ['admin']
    },
  },
  {
    path: '/admin/comments',
    name: 'comments',
    component: CommentsManagement,
    meta: {
      authRequired: 'true',
      roles: ['admin']
    },
  },
  {
    path: '/admin/categories',
    name: 'categories',
    component: CategoryManagement,
    meta: {
      authRequired: 'true',
      roles: ['admin']
    },
  },
  {
    path: '/about',
    name: 'about',
    component: About,
    meta: {
      authRequired: 'false'
    },
  },
  {
    path: '/categories',
    name: 'all-categories',
    component: AllCategories,
    meta: {
      authRequired: 'false'
    },
  },
  {
    path: '/category/:category_id',
    name: 'single-category',
    component: SingleCategory,
    meta: {
      authRequired: 'false'
    },
  },
  {
    path: '/tags',
    name: 'all-tags',
    component: AllTags,
    meta: {
      authRequired: 'false'
    },
  },
  {
    path: '/tag/:tag_id',
    name: 'single-tag',
    component: SingleTag,
    meta: {
      authRequired: 'false'
    },
  },
  {
    path: '/author/:author_id',
    name: 'single-author',
    component: SingleAuthor,
    meta: {
      authRequired: 'false'
    },
  },
]

var router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {

  if (to.meta.authRequired === 'true'){
    const authStore = useAuthStore();
    let role = authStore.role;
    if (to.meta.roles.includes('admin') && role.isAdmin){
      return next()
    }
    else if (to.meta.roles.includes('author') && role.isAuthor){
      return next()
    }
    else{
      router.push({
        name: 'home'
      })
    }
  }
  else{
    return next()
  }
});

export default router;