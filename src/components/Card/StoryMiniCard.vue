<template>
  <div class="story-card px-2 py-4">
    <b-col
      cols="12"
      class="story-card-title pb-3"
    >
      <h5 class="m-0">
        Climate impact of plastics
      </h5>
    </b-col>
    <b-col
      cols="12"
      class="story-card-content pb-4"
    >
      <p class="m-0">
        Plastics are frequently criticized for everything from their toxicity to their contributions to ocean pollution,
        but they play an important role in reducing greenhouse gas emissions.
      </p>
    </b-col>
    <b-col
      cols="12"
      class="story-card-footer"
    >
      <template v-if="cardMode === 'small'">
        Username • Sep 22 | Category
      </template>
      <template v-else>
        July 6, 2022
      </template>
    </b-col>
  </div>
</template>

<script>
export default {
  name: "StoryCard",
  props: {
    cardMode: {
      type: String,
      default: 'small'
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