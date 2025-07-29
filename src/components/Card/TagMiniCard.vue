<template>
  <div 
    class="container tag-card p-2"
    @click="gotoTag"
  >
    <div class="row tag-card-title ps-3">
        {{ tagCard.name }}
    </div>
    <div class="row tag-card-footer ps-3">  
        {{ tagCard.story_count }} stories
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  tagCard: {
    type: Object,
    default: () => ({
      name: "",
      story_count: 0,
      id: null,
    })
  }
});

const moment = inject('moment');
const router = useRouter();

const gotoTag = () => {
  router.push({
    name: 'single-parent', 
    params: { 
      type: 'tag', 
      id: props.tagCard.id 
    }
  });
};
</script>

<style scoped lang="scss">
.tag-card {
  background-color: #F6F6F6;

  &-title {
    font-weight: 600;
    color: #404040;
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
