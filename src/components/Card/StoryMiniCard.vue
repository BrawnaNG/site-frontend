<template>
  <div 
    class="container story-card p-2"
    @click="gotoStory"
  >
    <div class="row story-card-title">
      <p>
        {{ storyCard.title }}
      </p>
    </div>
    <div class="row story-card-content">
      <p>
        {{ storyCard.excerpt }}
      </p>
    </div>
    <div class="row story-card-footer ps-3 pt-2">
      published by {{ storyCard.user }} on
      {{ moment(storyCard.created_at).format('MMM DD, YYYY') }}
      |
      {{ storyCard.first_category }}
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue';
import { useRouter } from 'vue-router';

// Define props
const props = defineProps({
  storyCard: {
    type: Object,
    default: () => ({
      title: "",
      user: "",
      excerpt: "",
      created_at: null,
      first_category: "",
      categories: []
    })
  }
});

// Inject dependencies
const moment = inject('moment');
const router = useRouter();

// Methods
const gotoStory = () => {
  router.push({ name: 'story', params: { id: props.storyCard.id } });
};
</script>

<style scoped lang="scss">
.story-card {
  background-color: #F6F6f0;

  &-title {
    font-weight: 600;
    color: #505050;
  }
  &-content {
    font-size: .8em;
    color: #404040;

     overflow: hidden;
     text-overflow: ellipsis;
     display: -webkit-box;
     -webkit-line-clamp: 4; /* number of lines to show */
     line-clamp: 4;
      overflow: hidden;
      word-break: break-word;
      -webkit-box-orient: vertical;
   
  }
  &-footer {
    font-size: .7em;
    color: #606060;
  }

  &:hover {
    box-shadow: 0 16px 37px rgba(0, 0, 0, 0.15);
    background: #F8F8F8;
    transform: scale(1.1);
    transition: .2s;
    z-index: 1000;
    border: none;
  }
}
</style>
