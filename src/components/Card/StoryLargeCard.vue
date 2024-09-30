<template>
  <div 
    class="container-flex story-large-card p-4 mb-4"
    @click="gotoStory"
  >
    <div class="row story-large-card-title pb-3 px-1">
      <h4 class="m-0">
        {{ storyCard.title }}
      </h4>
    </div>
    <div class="row story-large-card-content pb-3 px-1">
      <p class="m-0">
        {{ storyCard.body }}
      </p>
    </div>
    <div class="story-large-card-footer px-1">
      {{ moment(storyCard.created_at).format('MMM YY') }}
      |
      {{ (storyCard.categories.length ? storyCard.categories[0].name : '') }}
    </div>
    <template v-if="cardMode === 'edit'">
      <div class="row p-0 m-0 align-items-center text-right">
        <span class="mr-3 cursor-pointer">
          <img src="../../assets/image/icon/Delete.svg">
        </span>
        <span class="mr-3 cursor-pointer">
          <img src="../../assets/image/icon/Edit.svg">
        </span>
        <span class="cursor-pointer">
          <img src="../../assets/image/icon/Show.svg">
        </span>
      </div>
    </template>
  </div>
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
    },
  methods: {
    gotoStory: function() {
      this.$router.push({name: 'story', params: { id: this.storyCard.id } });
    }
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