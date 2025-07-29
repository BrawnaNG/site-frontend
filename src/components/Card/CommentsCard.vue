<template>
  <div class="container-flex comments-card border">
    <div class="row card-content my-2">
      <div class="col-10">
        <h6>
          {{ commentCard.user }}
          {{ moment(commentCard.created_at).format(' - MMM YY') }}
        </h6>
        </div>
        <div class="row ps-4">
          {{ commentCard.body }}
        </div>
    </div>
  </div>
</template>

<script>
import { inject } from 'vue';
export default {
  name: "CommentsCard",
  props: {
    commentCard: {
      type: Object,
      default: () => ({
        body: "",
        user: "",
        created_at: null,
      })
    },
    cardMode: {
      type: String,
      default: 'mini'
    }
  },
  setup() {
    const moment = inject('moment');
    return { moment };
  },
  data() {
    return {
      addReply: false
    }
  }
}
</script>

<style scoped lang="scss">
.comments-card {

  border: 1em;
  border-color: #707070;
  background-color: beige;

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