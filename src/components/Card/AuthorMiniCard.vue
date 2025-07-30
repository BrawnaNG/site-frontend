<template>
  <div 
    class="container author-card p-2"
    @click="gotoAuthor"
  >
    <div class="row author-card-title ps-3">
        {{ authorCard.alias }}
    </div>
    <div class="row author-card-content ps-3">
        {{ authorCard.email }}
    </div>
    <div class="row author-card-footer ps-3">  
        {{ authorCard.story_count }} stories
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue';
import { useRouter } from 'vue-router';

// Define props
const props = defineProps({
  authorCard: {
    type: Object,
    default: () => ({
      alias: "",
      email: "",
      story_count: 0,
      id: null,
    })
  }
});

// Inject dependencies
const moment = inject('moment');
const router = useRouter();

// Methods
const gotoAuthor = () => {
  router.push({
    name: 'single-parent', 
    params: { 
      type: 'accounts', 
      id: props.authorCard.id 
    }
  });
};
</script>

<style scoped lang="scss">
.author-card {
  background-color: #F6F6F6;

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
