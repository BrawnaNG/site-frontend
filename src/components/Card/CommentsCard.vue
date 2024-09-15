<template>
  <b-col cols="12" class="comments-card p-4 mb-4">
    <div class="comments-card-title pb-3 px-1">
      <h5 class="m-0 font-weight-bold">
        Climate impact of plastics
      </h5>
    </div>
    <b-row class="comments-card-content m-0 pr-5">
      <b-col cols="auto" class="card-content-avatar p-0">
        <b-avatar text="BV" size="3rem"></b-avatar>
      </b-col>
      <b-col class="card-content pr-5">
        <div class="card-content-name">
          Devon Lane
        </div>
        <div class="card-content-date">
          Jan 1, 2021 at 01:49 pm
        </div>
        <div class="card-content-comment mt-2">
          This is how Neo sees the world
        </div>
        <div class="card-content-action mt-2">
<!--          <span @click="addReply = !addReply" class="font-weight-bold mr-3 cursor-pointer">-->
<!--            Reply-->
<!--          </span>-->
          <span class="font-weight-bold cursor-pointer">
            Remove
          </span>
        </div>
        <template v-if="addReply">
          <div class="card-content-add-reply pt-4 mt-1">
            <div class="card-content-add-reply-input">
              <b-form-textarea placeholder="Write your reply"
                               rows="3"
                               no-resize
              ></b-form-textarea>
            </div>
            <div class="card-content-add-reply-btn text-right mt-3">
              <b-button @click="addReply = false" pill variant="dark" class="font-weight-bold px-4 py-2">
                Post
              </b-button>
            </div>
          </div>
        </template>
        <template v-if="false">
          <div class="card-content-show-reply pt-4">
            <b-row class="m-0">
              <b-col cols="auto" class="card-content-avatar p-0">
                <b-avatar text="BV" size="2.5rem"></b-avatar>
              </b-col>
              <b-col class="card-content pr-5">
                <div class="card-content-name">
                  Devon Lane
                </div>
                <div class="card-content-date">
                  Jan 1, 2021 at 01:49 pm
                </div>
                <div class="card-content-comment mt-2">
                  This is how Neo sees the world
                </div>
                <div class="card-content-action mt-2">
<!--          <span @click="addReply = !addReply" class="font-weight-bold mr-3 cursor-pointer">-->
<!--            Reply-->
<!--          </span>-->
                  <span class="font-weight-bold cursor-pointer">
                  Remove
                </span>
                </div>

                <template v-if="addReply">
                  <div class="card-content-reply pt-4 mt-1">
                    <div class="card-content-reply-input">
                      <b-form-textarea placeholder="Write your reply"
                                       rows="3"
                                       no-resize
                      ></b-form-textarea>
                    </div>
                    <div class="card-content-reply-btn text-right mt-3">
                      <b-button @click="addReply = false" pill variant="dark" class="font-weight-bold px-4 py-2">
                        Post
                      </b-button>
                    </div>
                  </div>
                </template>
              </b-col>
            </b-row>
          </div>
        </template>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
export default {
  name: "CommentsCard",
  mounted() {
    this.getCommentList()
  },
  data() {
    return {
      addReply: false
    }
  },
  methods: {
    getCommentList() {
      this.$axios.get('/comment/list/').then(() => {
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