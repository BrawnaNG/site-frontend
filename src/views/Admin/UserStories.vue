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

<script setup>
import { ref, reactive, watch, onMounted, getCurrentInstance } from 'vue';
import { useRoute } from 'vue-router';
import StoryLargeCard from "@/components/Card/StoryLargeCard.vue";
import AdminBreadCrumbs from "@/components/Admin/AdminBreadCrumbs.vue";
import AdminMenu from "@/components/Admin/AdminMenu.vue";
import api from '@/services/api';

const { proxy } = getCurrentInstance();
const route = useRoute();

const username = ref('');
const breadcrumb = ref([
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
]);

const userStories = reactive({
  data: [],
  page: 1,
  total: 0
});

const disabledUserModal = reactive({
  show: false,
  data: null
});

const changePasswordModal = reactive({
  show: false,
  form: {
    currentPassword: {
      value: '',
      show: false
    },
    newPassword: {
      value: '',
      show: false
    },
    reNewPassword: {
      value: '',
      show: false
    },
  }
});

async function getUserStories() {
  try {
    const res = await api.get(`/story/list-admin/?page=${userStories.page}&username=${username.value}`);
    userStories.total = res.data.count;
    userStories.data = res.data.results;
  } catch (error) {
    console.error('Error fetching user stories:', error);
  }
}

function showDisabledUserModal() {
  disabledUserModal.show = true;
  disabledUserModal.data = {
    email: username.value,
    alias: username.value
  };
}

function closeUserDisableDialog() {
  disabledUserModal.show = false;
  disabledUserModal.data = null;
}

function UserDisabled() {
  UserDisabledSave(disabledUserModal.data.email, disabledUserModal.data.alias);
  closeUserDisableDialog();
}

async function UserDisabledSave(email, alias) {
  try {
    await api.get(`/accounts/disable-user-admin/${email}`);
    proxy.$toasted.show(`user ${alias} successfully disabled`, {
      duration: 3000,
      type: 'dark',
    });
    // Note: getAccountList() method doesn't exist in this component
  } catch (err) {
    proxy.$toasted.show(`Failed`, {
      duration: 3000,
      type: 'error',
    });
    console.log(err);
  }
}

function closeChangePasswordModal() {
  changePasswordModal.show = false;
  changePasswordModal.form = {
    currentPassword: {
      value: '',
      show: false
    },
    newPassword: {
      value: '',
      show: false
    },
    reNewPassword: {
      value: '',
      show: false
    },
  };
}

async function saveChangePassword() {
  try {
    const res = await api.put(`/accounts/change-password-admin/${username.value}`, {
      currentPassword: changePasswordModal.form.currentPassword.value,
      newPassword: changePasswordModal.form.newPassword.value,
    });
    console.log(res.data);
    closeChangePasswordModal();
  } catch (error) {
    console.error('Error changing password:', error);
  }
}

watch(() => userStories.page, () => {
  getUserStories();
});

onMounted(() => {
  username.value = route.params.username;
  breadcrumb.value.push({text: username.value});
  getUserStories();
});
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
