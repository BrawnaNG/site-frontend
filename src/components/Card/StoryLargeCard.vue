<template>
  <b-col
    cols="12"
    class="story-large-card p-4 mb-4"
  >
    <b-row class="m-0">
      <b-col
        cols="8"
        class="p-0"
      >
        <div class="story-large-card-title pb-3 px-1">
          <h4 class="m-0">
            {{ storyCard.title }}
          </h4>
        </div>
        <div class="story-large-card-content pb-3 px-1">
          <p class="m-0">
            {{ storyCard.body }}
          </p>
        </div>
        <div class="story-large-card-footer px-1">
          {{ moment(storyCard.created_at).format('MMM YY') }}
          |
          {{ (storyCard.categories.length ? storyCard.categories[0].name : '') }}
        </div>
      </b-col>
      <template v-if="cardMode === 'edit'">
        <b-row class="p-0 col-4 m-0 align-items-center text-right">
          <b-col class="p-0">
            <span class="mr-3 cursor-pointer">
              <img src="../../assets/image/icon/Delete.svg">
            </span>
            <span class="mr-3 cursor-pointer">
              <img src="../../assets/image/icon/Edit.svg">
            </span>
            <span class="cursor-pointer">
              <img src="../../assets/image/icon/Show.svg">
            </span>
          </b-col>
        </b-row>
      </template>
    </b-row>
  </b-col>
</template>

<script>
import { inject } from 'vue';
export default {
  name: "StoryLargeCard",
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
    cardMode:{
      type: String,
      default: 'read'
    }
  },
  setup() {
      const moment = inject('moment');
      return { moment };
    }
  }

</script>

<style scoped lang="scss">
.story-large-card {
  border: .8px solid #EFEFEF;
  &-head-title {
    color: #A7A7A7;
  }
  &-content {
    font-size: .9em;
    color: #363636;
  }
  &-footer {
    font-size: .74em;
    color: #A7A7A7;
  }

  &:hover {
    box-shadow: 0 16px 37px rgba(0, 0, 0, 0.15);
    background: white;
    transform: scale(1.01);
    transition: .1s;
    z-index: 1000;
    border: none;
  }
}
</style>