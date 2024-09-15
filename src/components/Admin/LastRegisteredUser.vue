<template>
  <div class="last-register-user py-2 px-3">
    <template v-if="userList.length">
      <b-row v-for="(user, index) in userList" :key="`last_user_${index}`" class="card-user py-3 m-0">
        <b-row class="col-9 p-0 m-0">
          <b-col cols="auto" class="card-user-avatar p-0">
            <b-avatar text="BV" size="2.4rem"></b-avatar>
          </b-col>
          <b-col>
            <div class="card-user-name font-weight-bold">
              {{user.alias}}
            </div>
            <div class="card-user-email">
              {{user.email}}
            </div>
          </b-col>
        </b-row>
        <b-row class="col-3 m-0 justify-content-end align-items-center p-0">
          <b-col cols="auto" class="card-user-action p-0">
            <span class="mr-2">
              {{user.date_joined | moment("from")}}
            </span>
            <span class="cursor-pointer">
              <img src="../../assets/image/icon/Show.svg" alt="show">
            </span>
          </b-col>
        </b-row>
      </b-row>
    </template>
   </div>
</template>

<script>
export default {
  name: "LastRegisteredUser",
  mounted() {
    this.getLastRegisteredUserList()
  },
  data() {
    return {
      userList: []
    }
  },
  methods: {
    getLastRegisteredUserList() {
      this.$axios.get('/accounts/last-user').then(res => {
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