<template>
  <div class="last-register-user py-2 px-3">
    <template v-if="userList.length">
      <div
        v-for="(user, index) in userList"
        :key="`last_user_${index}`"
        class="container-flex card-user py-3 m-0"
      >
        <div class="row p-0 m-0">
          <div class="col card-user-avatar p-0">
            TODO - AVATAR
          </div>
          <div class="col">
            <div class="card-user-name font-weight-bold">
              {{ user.alias }}
            </div>
            <div class="card-user-email">
              {{ user.email }}
            </div>
          </div>
        </div>
        <div class="row m-0 justify-content-end align-items-center p-0">
          <div class="row card-user-action p-0">
            <span class="mr-2">
              {{ moment(user.date_joined).from() }}
            </span>
            <span class="cursor-pointer">
              <img
                src="../../assets/image/icon/Show.svg"
                alt="show"
              >
            </span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { inject } from 'vue';
export default {
  name: "LastRegisteredUser",
  setup() {
    const moment = inject('moment');
    return { moment };
  },
  data() {
    return {
      userList: []
    }
  },
  mounted() {
    this.getLastRegisteredUserList()
  },
  methods: {
    getLastRegisteredUserList() {
      this.axios.get('/accounts/last-user').then(res => {
        this.userList = res.data
      })
    }
  }
}
</script>

<style scoped lang="scss">
.last-register-user {
  border: .8px solid #EFEFEF;

  .card-user {
    border-bottom: .8px solid #EFEFEF;
    &:last-child {
      border-bottom: none;
    }

    &-name {
      font-size: .8em;
    }
    &-email {
      font-size: .66em;
      color: #A7A7A7;
    }
    &-action {
      font-size: .6em;
      color: #A7A7A7;
      img {
        width: 1.3vw;
      }
    }
  }
}
</style>