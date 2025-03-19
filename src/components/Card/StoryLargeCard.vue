<template>
  <div 
    class="container-flex story-large-card p-4 mb-4"
  >
    <div class="row">
      <div 
        class="col-sm-9"
        @click="gotoStory"
      >
        <div class="row story-large-card-title px-1">
          <p>
            {{ storyCard.title }}
          </p>
        </div>
        <div
          v-if="storyCard.excerpt"
          class="row story-large-card-content pb-3 px-1"
        >
          <p class="m-0">
            {{ storyCard.excerpt }}
          </p>
        </div>
      </div>

      <div class="col-sm-3 py-4">
        <template v-if="cardMode === 'edit'">
          <span class="mr-3 cursor-pointer">
            <img src="../../assets/image/icon/Delete.svg">
          </span>
          <span 
            class="mr-3 cursor-pointer"
            @click="editStory">
            <img src="../../assets/image/icon/Edit.svg">
          </span>
          <span 
            class="cursor-pointer"
            @click="gotoStory"
          >
            <img src="../../assets/image/icon/Show.svg">
          </span>
        </template>
      </div>
    </div>
    <div class="row story-large-card-footer px-3">
      {{ storyCard.user }}
      |
      {{ moment(storyCard.created_at).format('MMM YY') }}
      |
      {{ storyCard.first_category }}
    </div>
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
            id : "",
            title : "",
            brief : "",
            user: "",
            created_at: null,
            categories: [],
            first_category: "",
            excerpt: ""
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
    },
    editStory: function() {
      this.$router.push({name: 'addEditStory', params: { id: this.storyCard.id } });
    }
  }
}
</script>

<style scoped lang="scss">
.story-large-card {
  border: .8px solid #EFEFEF;
  &-title {
    font-size: 1.8em;
    font-weight: bolder;
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