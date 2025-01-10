<template>
  <div class="users-account-page">
    <b-col
      cols="10"
      class="admin-page-head mx-auto py-3"
    >
      <b-row class="h-100 m-0">
        <b-col
          cols="6"
          class="px-0"
        >
          <b-col class="admin-page-head-title px-0">
            <h4 class="m-0 font-weight-bolder">
              Admin
            </h4>
          </b-col>
          <b-col class="admin-page-head-breadcrumb pt-1 px-0">
            <b-breadcrumb
              class="bg-transparent pb-0 px-0 m-0"
              :items="breadcrumb"
            />
          </b-col>
        </b-col>
      </b-row>
    </b-col>
    <b-col
      cols="12"
      class="py-3 menu-bar-wrapper px-0"
    >
      <b-row class="col-10 mx-auto my-0">
        <b-row class="col-10 m-0 px-0">
          <b-col
            cols="auto"
            class="menu-bar-item cursor-pointer text-white text-center mr-3 pb-2"
          >
            <router-link
              class="pb-2 px-1"
              :to="{name: 'admin'}"
            >
              Recent Stories
            </router-link>
          </b-col>
          <b-col
            cols="auto"
            class="menu-bar-item cursor-pointer text-white text-center mr-3 pb-2"
          >
            <router-link
              class="pb-2 px-1"
              :to="{name: 'users'}"
            >
              Users
            </router-link>
          </b-col>
          <b-col
            cols="auto"
            class="menu-bar-item cursor-pointer text-white text-center mr-3 pb-2"
          >
            <router-link
              class="pb-2 px-1"
              :to="{name: 'comments'}"
            >
              Comments
            </router-link>
          </b-col>
          <b-col
            cols="auto"
            class="menu-bar-item cursor-pointer text-white text-center mr-3 pb-2"
          >
            <router-link
              class="pb-2 px-1"
              :to="{name: 'categories'}"
            >
              Categories
            </router-link>
          </b-col>
        </b-row>
        <b-col
          cols="2"
          class="text-right p-0"
        >
          <span class="text-white">
            Log out
          </span>
        </b-col>
      </b-row>
    </b-col>
    <b-col
      cols="10"
      class="users-account-content mx-auto py-5"
    >
      <div class="pb-5">
        <h2 class="m-0">
          User
        </h2>
      </div>
      <user-list />
    </b-col>
  </div>
</template>

<script>
import UserList from "@/components/Admin/UserList.vue";
export default {
  name: "UserAccount",
  components: {UserList},
  data() {
    return {
      breadcrumb: [
        {
          text: 'Home',
          href: '/'
        },
        {
          text: 'Admin',
          href: '#/admin/recent-stories'
        },
        {
          text: 'Users',
        }
      ],
    }
  },
}
</script>

<style scoped>

</style>