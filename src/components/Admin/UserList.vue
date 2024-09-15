<template>
  <div class="user-list-page">
    <div class="user-list-table py-3 px-4 mb-4">
      <b-table borderless
               sort-icon-left
               :items="userList.data"
               :fields="userList.fields">
        <template #cell(date_joined)="data">
          {{data.item.date_joined | moment("DD MMM YYYY, hh:mm a")}}
        </template>
        <template #cell(action)="data">
          <div class="user-list-table-action">
            <span class="mr-3 cursor-pointer">
              <img @click="showDisabledUserModal(data.item)" src="../../assets/image/icon/Delete.svg">
            </span>
            <span class="mr-3 cursor-pointer">
              <img src="../../assets/image/icon/Edit.svg">
            </span>
            <span class="cursor-pointer">
              <router-link :to="{name: 'userStories', params: {username: data.item.alias}}">
                <img src="../../assets/image/icon/Show.svg">
              </router-link>
            </span>
          </div>
        </template>
      </b-table>
    </div>
<!--    <b-row class="justify-content-center m-0 pt-4">-->
<!--      <b-pagination v-model="userList.page"-->
<!--                    class="pagination-custom-style"-->
<!--                    pills-->
<!--                    :total-rows="userList.total"></b-pagination>-->
<!--    </b-row>-->

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
  </div>
</template>

<script>
export default {
  name: "UserList",
  mounted() {
    this.getAccountList()
  },
  data() {
    return {
      userList: {
        data: [],
        fields: [
          { key: 'alias',
            label: 'Name',
            sortable: true,
            sortDirection: 'desc',
            class: 'user-table',
          },
          { key: 'email',
            label: 'Email Address',
            sortable: true,
            sortDirection: 'desc',
            class: 'user-table'
          },
          { key: 'story_count',
            label: 'Stories',
            sortable: true,
            sortDirection: 'desc',
            class: 'user-table'
          },
          { key: 'date_joined',
            label: 'Joined Date',
            sortable: true,
            sortDirection: 'desc',
            class: 'user-table'
          },
          { key: 'action',
            label: 'Operations',
            class: 'user-table'
          },
        ],
        total: 0,
        page: 1
      },
      disabledUserModal: {
        show: false,
        data: null
      }
    }
  },
  methods: {

    getAccountList() {
      this.$axios.get('/accounts/list/').then((res) =>{
        this.userList.data = res.data.results
      })
    },

    showDisabledUserModal(user) {
      this.disabledUserModal = {
        show: true,
        data: user
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
    }
  }
}
</script>

<style lang="scss">
.user-list-page {
  .user-list-table {
    border: .8px solid #EFEFEF;
    &-action {
      img {
        width: 1.2vw;
      }
    }
  }
}

table {
  th.user-table {
    font-size: .68em;
    color: #707070;
    font-weight: 400;
    line-height: 2vw;
  }

  td.user-table {
    border-bottom: .6px solid #EFEFEF;
    font-size: .8em;
    line-height: 2vw;
    &:first-child {
      font-size: .9em;
      font-family: NotoSerif-Bold;
    }
  }
  tr:last-child {
    td.user-table {
      border-bottom: none;
    }
  }
}

</style>