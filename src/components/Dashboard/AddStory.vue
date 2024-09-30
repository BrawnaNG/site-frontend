<template>
  <router-link
    class="pb-2 px-1"
    :to="{name: 'addEditStory'}"
  >
    <button
      class="story-default-btn pr-2 py-2 px-4 font-weight-bold rounded-pill"
    >
      Create Story
      <img
        src="../../assets/image/icon/add.svg"
        class="mx-2 px-0"
        alt="go"
      >
    </button>
  </router-link>
</template>

<style scoped lang="scss">
  .story-default-btn {
    background-color: black;
    color: white;
    img {
      width: 2.4vw;
    }
  }
</style>