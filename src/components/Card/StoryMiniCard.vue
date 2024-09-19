<template>
  <div class="story-card px-2 py-4">
    <b-col
      cols="12"
      class="story-card-title pb-3"
    >
      <h5 class="m-0">
        {{ storyCard.title }}
      </h5>
    </b-col>
    <b-col
      cols="12"
      class="story-card-content pb-4"
    >
      <p class="m-0">
        {{ storyCard.body }}
      </p>
    </b-col>
    <b-col
      cols="12"
      class="story-card-footer"
    >
      <template v-if="cardMode === 'small'">
        {{ moment(storyCard.created_at).format('MMM YY') }}
        |
        {{ (storyCard.categories.length ? storyCard.categories[0].name : '') }}
      </template>
      <template v-else>
        {{ moment(storyCard.created_at).format('MMM YY') }}
      </template>
    </b-col>
  </div>
</template>

<script>
import { inject } from 'vue';
export default {
  name: "StoryCard",
  props: {
    storyCard: {
      type: Object,
      default: () => ({
            title : "",
            body: "",
            created_at: null,
            categories: []
        })
    },
    cardMode: {
      type: String,
      default: 'small'
    }
  },
  setup() {
    const moment = inject('moment');
    return { moment };
  }
}
</script>

<style scoped lang="scss">
.story-card {
  border: .8px solid #EFEFEF;

  &-title {
    color: #707070;
  }
  &-content {
    font-size: .8em;
    color: #707070;
   p {
     overflow: hidden;
     text-overflow: ellipsis;
     display: -webkit-box;
     -webkit-line-clamp: 4; /* number of lines to show */
     line-clamp: 4;
   }
  }
  &-footer {
    font-size: .7em;
    color: #A7A7A7;
  }

  &:hover {
    box-shadow: 0 16px 37px rgba(0, 0, 0, 0.15);
    background: white;
    transform: scale(1.1);
    transition: .1s;
    z-index: 1000;
    border: none;
  }
}
</style>