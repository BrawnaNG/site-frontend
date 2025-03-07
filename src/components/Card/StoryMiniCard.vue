<template>
  <div 
    class="container story-card px-2 py-2"
    @click="gotoStory"
  >
    <div class="row story-card-title pb-3">
      <h5 class="m-0">
        {{ storyCard.title }}
      </h5>
    </div>
    <div class="row story-card-content pb-4">
      <p class="m-0">
        {{ storyCard.user }}
      </p>
    </div>
    <div class="row story-card-footer m-0">
      <template v-if="cardMode === 'mini'">
        {{ moment(storyCard.created_at).format('MMM YY') }}
        |
        {{ storyCard.first_category }}
      </template>
      <template v-else>
        {{ moment(storyCard.created_at).format('MMM YY') }}
      </template>
    </div>
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
            user: "",
            created_at: null,
            first_category: "",
            categories: []
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
  methods: {
    gotoStory: function() {
      this.$router.push({name: 'story', params: { id: this.storyCard.id } });
    }
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