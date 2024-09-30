<template>
  <router-link
    class="pb-2 px-1"
    :to="{name: 'addEditStory'}"
  >
    <button
      class="story-default-btn pl-3 pr-2 py-2 font-weight-bold"
      pill
      variant="dark"
    >
      Create Story
      <img
        src="../../assets/image/icon/add.svg"
        class="ml-2"
        alt="go"
      >
    </button>
  </router-link>
</template>