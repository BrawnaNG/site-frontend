<template>
  <div class="user-stories-page">
    <b-col cols="10" class="user-stories-page-head mx-auto py-3">
      <b-row class="h-100 m-0">
        <b-col cols="6" class="px-0">
          <b-col class="user-stories-page-head-title px-0">
            <h4 class="m-0 font-weight-bolder">
              Admin
            </h4>
          </b-col>
          <b-col class="user-stories-page-head-breadcrumb pt-1 px-0">
            <b-breadcrumb class="bg-transparent pb-0 px-0 m-0" :items="breadcrumb"></b-breadcrumb>
          </b-col>
        </b-col>
      </b-row>
    </b-col>
    <b-col cols="12" class="py-3 menu-bar-wrapper px-0">
      <b-row class="col-10 mx-auto my-0">
        <b-row class="col-10 m-0 px-0">
          <b-col cols="auto"
                 class="menu-bar-item cursor-pointer text-white text-center mr-3 pb-2">
            <router-link class="pb-2 px-1" :to="{name: 'admin'}">
              Recent Stories
            </router-link>
          </b-col>
          <b-col cols="auto"
                 class="menu-bar-item cursor-pointer text-white text-center mr-3 pb-2">
            <router-link class="pb-2 px-1" :to="{name: 'users'}">
              Users
            </router-link>
          </b-col>
          <b-col cols="auto"
                 class="menu-bar-item cursor-pointer text-white text-center mr-3 pb-2">
            <router-link class="pb-2 px-1" :to="{name: 'comments'}">
              Comments
            </router-link>
          </b-col>
          <b-col cols="auto"
                 class="menu-bar-item cursor-pointer text-white text-center mr-3 pb-2">
            <router-link class="pb-2 px-1" :to="{name: 'categories'}">
              Categories
            </router-link>
          </b-col>
        </b-row>
        <b-col cols="2" class="text-right p-0">
          <span class="text-white">
            Log out
          </span>
        </b-col>
      </b-row>
    </b-col>
    <b-col cols="10" class="users-account-content mx-auto py-5">
      <b-row class="m-0 justify-content-between">
        <b-col cols="auto" class="px-0">
          <div class="pb-5">
            <h2 class="m-0">
              {{username}}
            </h2>
            <div class="users-stories-account-content-detail pt-1">
              ali@gmail.com • Joined: 15 May 2020 11:00 pm • Posted {{userStories.total}} stories
            </div>
          </div>
        </b-col>
        <b-col cols="auto" class="users-account-content-action px-0 pt-3">
          <span @click="changePasswordModal.show = true" class="users-account-content-action-btn py-2 mr-3">
            change password
          </span>
          <span @click="showDisabledUserModal()" class="users-account-content-action-btn py-2">
            Disable User
          </span>
        </b-col>
      </b-row>
      <template v-if="userStories.data.length">
        <b-col v-for="storyCard in userStories.data"
               :key="`storyCard_${storyCard.id}`"
               cols="12" class="p-0">
          <story-large-card :story-card="storyCard"/>
        </b-col>
        <b-row class="justify-content-center m-0 pt-4">
          <b-pagination v-model="userStories.page"
                        class="pagination-custom-style"
                        pills
                        :total-rows="userStories.total"></b-pagination>
        </b-row>
      </template>
      <template v-else>
        <b-row class="m-0 p-5 justify-content-center align-items-center">
          <b-col cols="auto" class="p-4 text-center text-secondary">
            Empty Data
          </b-col>
        </b-row>
      </template>
    </b-col>

    <b-modal hide-footer
             hide-header
             @click="closeUserDisableDialog"
             v-model="disabledUserModal.show">
      <div class="p-4">
        <div class="text-center py-3">
          <h6>
            Are you sure you want to disable this user?
          </h6>
        </div>
        <b-row class="m-0 px-4 pt-4 justify-content-between">
          <b-button @click="closeUserDisableDialog()" pill variant="outline-dark"
                    class="story-default-btn saved-stories-btn px-3 py-2 font-weight-bold">
            No, Thanks
          </b-button>
          <b-button pill variant="dark"
                    @click="UserDisabled()"
                    class="story-default-btn saved-stories-btn px-3 py-2 font-weight-bold">
            Yes, disable it
          </b-button>
        </b-row>
      </div>
    </b-modal>

    <b-modal hide-footer
             size="sm"
             @hide="closeChangePasswordModal"
             v-model="changePasswordModal.show"
             title="Change Password">
      <div class="p-2 change-password-form">
        <b-row class="p-1 m-0 rounded border mt-3">
          <b-col cols="10" class="px-0">
            <b-form-input v-model="changePasswordModal.form.currentPassword.value"
                          :type="changePasswordModal.form.currentPassword.show ? 'text' : 'password'"
                          class="border-0 change-password-form-input"
                          placeholder="Current Password"/>
          </b-col>
          <b-col cols="2" class="text-right pr-2 pt-1">
            <img title="show password"
                 @click="changePasswordModal.form.currentPassword.show = !changePasswordModal.form.currentPassword.show "
                 class="cursor-pointer" src="../../assets/image/icon/Show.svg">
          </b-col>
        </b-row>
        <b-row class="p-1 m-0 rounded border mt-3">
          <b-col cols="10" class="px-0">
            <b-form-input v-model="changePasswordModal.form.newPassword.value"
                          :type="changePasswordModal.form.newPassword.show ? 'text' : 'password'"
                          class="border-0 change-password-form-input"
                          placeholder="New Password"/>
          </b-col>
          <b-col cols="2" class="text-right pr-2 pt-1">
            <img title="show password"
                 @click="changePasswordModal.form.newPassword.show = !changePasswordModal.form.newPassword.show "
                 class="cursor-pointer" src="../../assets/image/icon/Show.svg">
          </b-col>
        </b-row>
        <b-row class="p-1 m-0 rounded border mt-3">
          <b-col cols="10" class="px-0">
            <b-form-input v-model="changePasswordModal.form.reNewPassword.value"
                          :type="changePasswordModal.form.reNewPassword.show ? 'text' : 'password'"
                          class="border-0 change-password-form-input"
                          placeholder="Repeat New Password"/>
          </b-col>
          <b-col cols="2" class="text-right pr-2 pt-1">
            <img title="show password"
                 @click="changePasswordModal.form.reNewPassword.show = !changePasswordModal.form.reNewPassword.show "
                 class="cursor-pointer" src="../../assets/image/icon/Show.svg">
          </b-col>
        </b-row>
        <div class="pt-4">
          <b-button  @click="saveChangePassword()"
                     pill
                     variant="dark"
                     class="story-default-btn w-100 py-2 my-3 font-weight-bold">
            Change Password
          </b-button>
        </div>

      </div>
    </b-modal>
  </div>
</template>

<script>
import StoryLargeCard from "@/components/Card/StoryLargeCard";
export default {
  name: "UserStories",
  components: {StoryLargeCard},
  created() {
    this.username = this.$route.params.username
    this.breadcrumb.push({text: this.username})
  },
  mounted() {
    this.getUserStories()
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
  methods: {
    getUserStories() {
      // this.$axios.get(`story/list/?username=${this.username}`).then(res => {
      //   console.log(res.data);
      // })
      this.$axios.get(`/story/list/?page=${this.userStories.page}`).then(res => {
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

      this.$axios.get(`/accounts/disable-user-admin/${email}`).then( () => {
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
      this.$axios.put(`/accounts/change-password-admin/${this.username}`, {
        currentPassword: this.changePasswordModal.form.currentPassword.value,
        newPassword: this.changePasswordModal.form.newPassword.value,
      }).then(res => {
        console.log(res.data);
        this.closeChangePasswordModal()
      })
    }
  },
  watch: {
    'userStories.page'() {
      this.getUserStories()
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