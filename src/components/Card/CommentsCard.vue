<template>
  <div class="container-flex comments-card">
    <div class="row card-content">
      TODO COMMENTS
    </div>
  </div>
</template>

<script>
export default {
  name: "CommentsCard",
  data() {
    return {
      addReply: false
    }
  },
  mounted() {
    this.getCommentList()
  },
  methods: {
    getCommentList() {
      this.axios.get('/comment/list/').then(() => {
        // console.log(res.data);
      })
    }
  }
}
</script>

<style scoped lang="scss">
.comments-card {
  border: .8px solid #EFEFEF;
  &-title {
    color: #707070;
  }

  &-content {
    .card-content {
      &-name {
        font-family: NotoSerif-Bold;
      }
      &-date {
        font-size: .7em;
        color: #A7A7A7;
      }
    }
  }

}
</style>