<template>
  <div class="user-stories-page">
    <div class="container-flex user-stories-page-head mx-auto py-3">
      <div class="row h-100 m-0">
        <div class="col-6 px-0">
          <h4 class="m-0 font-weight-bolder">
            Admin
          </h4>
        </div>
      </div>
      <div class="row admin-page-head-breadcrumb pt-1 px-0">
        <admin-bread-crumbs label="User Stories" />
      </div>
    </div>
  </div>
  <admin-menu />
  <div class="container-flex users-account-content mx-auto py-5">
    <div class="row m-0 justify-content-between">
      <div class="col px-0">
        <h2 class="m-0">
          {{ username }}
        </h2>
        <div class="users-stories-account-content-detail pt-1">
          ali@gmail.com • Joined: 15 May 2020 11:00 pm • Posted {{ userStories.total }} stories
        </div>
      </div>
    </div>
    <div class="row users-account-content-action px-0 pt-3" >
      <span
        class="users-account-content-action-btn py-2 mr-3"
        @click="changePasswordModal.show = true"
      >
        change password
      </span>
      <span
        class="users-account-content-action-btn py-2"
        @click="showDisabledUserModal()"
      >
        Disable User
      </span>
    </div>
    <template v-if="userStories.data.length">
      <div
        v-for="storyCard in userStories.data"
        :key="`storyCard_${storyCard.id}`"
        cols="12"
        class="row p-0"
      >
        <story-large-card :story-card="storyCard" />
      </div>
      <div class="row justify-content-center m-0 pt-4">
        TODO - PAGINATION
      </div>
    </template>
    <template v-else>
      <div class="row m-0 p-5 justify-content-center align-items-center">
        No User Stories
      </div>
    </template>
  </div>
</template>

<script>
import StoryLargeCard from "@/components/Card/StoryLargeCard.vue";
import AdminBreadCrumbs from "@/components/Admin/AdminBreadCrumbs.vue";
import AdminMenu from "@/components/Admin/AdminMenu.vue";
export default {
  name: "UserStories",
  components: {
    StoryLargeCard,
    AdminBreadCrumbs,
    AdminMenu
  },
  data() {
    return {
      username: '',
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
          href: '#/admin/user-account'
        },
      ],
      userStories: {
        data: [],
        page: 1,
        total: 0
      },
      disabledUserModal: {
        show: false,
        data: null
      },
      changePasswordModal: {
        show: false,
        form: {
          currentPassword: {
            value: '',
            show: false
          },
          newPassword:  {
            value: '',
            show: false
          },
          reNewPassword:  {
            value: '',
            show: false
          },
        }
      }
    }
  },
  watch: {
    'userStories.page'() {
      this.getUserStories()
    }
  },
  created() {
    this.username = this.$route.params.username
    this.breadcrumb.push({text: this.username})
  },
  mounted() {
    this.getUserStories()
  },
  methods: {
    getUserStories() {
      this.axios.get(`/story/list-admin/?page=${this.userStories.page}&username=${this.username}`).then(res => {
        this.userStories.total = res.data.count
        this.userStories.data = res.data.results
      })
    },

    showDisabledUserModal() {
      this.disabledUserModal = {
        show: true,
        data: {
          email: this.username,
          alias: this.username
        }
      }
    },

    closeUserDisableDialog() {
      this.disabledUserModal = {
        show: false,
        data: null
      }
    },

    UserDisabled() {
      this.UserDisabledSave(this.disabledUserModal.data.email, this.disabledUserModal.data.alias)
      this.closeUserDisableDialog()
    },

    UserDisabledSave(email, alias) {

      this.axios.get(`/accounts/disable-user-admin/${email}`).then( () => {
        this.$toasted.show(`user ${alias} successfully disabled`, {
          duration: 3000,
          type: 'dark',
        });
        this.getAccountList()
      }).catch(err => {
        this.$toasted.show(`Failed`, {
          duration: 3000,
          type: 'error',
        });
        console.log(err);
      })
    },

    closeChangePasswordModal() {
      this.changePasswordModal =  {
        show: false,
        form: {
          currentPassword: {
            value: '',
            show: false
          },
          newPassword:  {
            value: '',
            show: false
          },
          reNewPassword:  {
            value: '',
            show: false
          },
        }
      }
    },

    saveChangePassword() {
      this.axios.put(`/accounts/change-password-admin/${this.username}`, {
        currentPassword: this.changePasswordModal.form.currentPassword.value,
        newPassword: this.changePasswordModal.form.newPassword.value,
      }).then(res => {
        console.log(res.data);
        this.closeChangePasswordModal()
      })
    }
  }
}
</script>

<style scoped lang="scss">
.users-stories-account-content-detail {
  color: #707070;
  font-size: .64em;
}

.users-account-content-action-btn {
  border-bottom: 2px solid black;
  font-size: .8em;
  cursor: pointer;
}
.change-password-form-input {
  font-size: .8em;
  &:focus {
    outline: unset;
    box-shadow: unset;
  }

}
</style>