<template>
  <div class="container-flex comments-card border">
    <div 
      class="row card-content my-2 px-2"
      @click="goto"
    >
      <div class="col-10">
        <div
          v-if="cardMode == 'story'"
        >
          <h6>
            <strong>{{ commentCard.story_title }}</strong>
          </h6>
          <h6>
            {{ moment(commentCard.created_at).format('MMM YY') }}
          </h6>
        </div>
        <div
          v-if="cardMode == 'user'"
        >
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
  </div>
</template>

<script setup>
import { inject } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  commentCard: {
    type: Object,
    default: () => ({
      body: "",
      user: "",
      created_at: null,
      story_title: "",
      story_id: null
    })
  },
  cardMode: {
    type: String,
    default: 'user'
  }
});

const router = useRouter();
const moment = inject('moment');

const gotoStory = () => {
  router.push({ name: 'story', params: { id: props.commentCard.story_id } });
};

const gotoAuthor = () => {
  router.push({
    name: 'single-parent', 
    params: { 
      type: 'accounts', 
      id: props.commentCard.id 
    }
  });
};

const goto = () =>{
  if (props.cardMode == 'story')
    gotoStory();
  else if (props.cardMode == 'user')
    gotoAuthor();
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
      &-date {
        font-size: .7em;
        color: #A7A7A7;
      }
    }
  }

}
</style>
