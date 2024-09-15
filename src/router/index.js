import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Dashboard from '../views/Dashboard/DashboardPage'
import Admin from '../views/Admin/AdminPage'
import UsersAccount from "@/views/Admin/UsersAccount";
import UserStories from "@/views/Admin/UserStories";
import CommentsManagement from "@/views/Admin/CommentsManagement";
import CategoryManagement from "@/views/Admin/CategoryManagement";
import SavedStories from "@/views/Dashboard/SavedStories";
import CommentsStory from "@/views/Dashboard/StoriesComment";
import StoryDrafts from "@/views/Dashboard/StoryDrafts";
import ShowStory from "@/views/Story/ShowStory";
import AddEditStory from "@/views/Story/AddEditStory";
import SearchResults from "@/views/SearchResults";

Vue.use(VueRouter)

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

const router = new VueRouter({
  routes
})

export default router
