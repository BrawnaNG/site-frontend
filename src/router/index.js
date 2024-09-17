import { createMemoryHistory, createRouter } from 'vue-router';
import Home from '../views/Home.vue';
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

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/search-results/search=:searchKey?',
    name: 'searchResults',
    component: SearchResults
  },
  {
    path: '/story/show-story/:id?',
    name: 'story',
    component: ShowStory
  },
  {
    path: '/story/add-edit-story/:id?',
    name: 'addEditStory',
    component: AddEditStory
  },
  {
    path: '/dashboard/your-stories',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/dashboard/saved-stories',
    name: 'savedStories',
    component: SavedStories
  },
  {
    path: '/dashboard/story-comments',
    name: 'commentsStory',
    component: CommentsStory
  },
  {
    path: '/dashboard/drafts',
    name: 'drafts',
    component: StoryDrafts
  },
  {
    path: '/admin/recent-stories',
    name: 'admin',
    component: Admin
  },
  {
    path: '/admin/user-account',
    name: 'users',
    component: UsersAccount
  },
  {
    path: '/admin/user-account/:username',
    name: 'userStories',
    component: UserStories
  },
  {
    path: '/admin/comments',
    name: 'comments',
    component: CommentsManagement
  },
  {
    path: '/admin/categories',
    name: 'categories',
    component: CategoryManagement
  },
]

export default createRouter({
  history: createMemoryHistory(),
  routes,
});