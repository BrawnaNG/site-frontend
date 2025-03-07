<template>
  <div class="user-list-page">
    <div class="user-list-table py-3 px-4 mb-4">
      <DataTable 
        :value="userList.data"
        table-style="min-width: 50rem"
        paginator
        :rows="10"
        :rowsPerPageOptions="[10, 20, 50]"
      >
        <Column 
          v-for="field of userList.fields"
          :key="field.key"
          :field="field.key"
          :header="field.label">
        </Column>
        <Column header="Action">
          <template #body="slotProps">
            <span class="cursor-pointer">
              <img
                src="../../assets/image/icon/Delete.svg"
                @click="showDisabledUserModal(slotProps.data)"
              >
            </span>
            <span class="cursor-pointer">
              <img src="../../assets/image/icon/Edit.svg">
            </span>
            <span class="cursor-pointer">
              <router-link :to="{name: 'userStories', params: {username: slotProps.data.alias}}">
                <img src="../../assets/image/icon/Show.svg">
              </router-link>
            </span>
          </template>

        </Column>
      </DataTable>
    </div>
  </div>

  <div
    id="userDisableModal"
    class="modal"
    tabindex="-1"
    aria-labelledby="userDisableModalLabel" 
    aria-hidden="true"
    @click="closeUserDisableDialog"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 
            id="userDisableModalLabel"
            class="modal-title"
          >
            Disable User
          </h5>
        </div>
        <div class="modal-body">
          <div class="container-flex">
            <div class="row text-center py-3">
              <h6>
                Are you sure you want to disable this user?
              </h6>
            </div>
            <div class="row m-0 px-4 pt-4 justify-content-between">
              <button
                pill
                variant="outline-dark"
                class="story-default-btn saved-stories-btn px-3 py-2 font-weight-bold"
                @click="closeUserDisableDialog()"
              >
                Cancel
              </button>
              <button
                pill
                variant="dark"
                class="story-default-btn saved-stories-btn px-3 py-2 font-weight-bold"
                @click="UserDisabled()"
              >
                Disable User
              </button>
            </div>
          </div>
        </div>  
      </div>
    </div>
  </div>
</template>

<script>
import { inject } from 'vue';
export default {
  name: "UserList",
  setup() {
      const moment = inject('moment');
      return { moment };
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
          }
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
  mounted() {
    this.getAccountList()
  },
  methods: {

    getAccountList() {
      this.axios.get('/accounts/list/').then((res) =>{
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