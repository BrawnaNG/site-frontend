<template>
  <div class="container-fluid py-2 py-md-4 menu-bar-wrapper px-0">
    <div class="row mx-auto my-0">
      <div class="col-9 .me-auto">
        <ul class="list-group list-group-horizontal">
          <li class="list-group-item menu-bar-item cursor-pointer text-white text-center mr-3 pe-md-2 pe-lg-4 pb-2">
            <router-link
              :to="{name: 'dashboard'}"
            >
              Your Stories
            </router-link>
          </li>
          <li class="list-group-item menu-bar-item cursor-pointer text-white text-center mr-3 px-2 pb-2">
            <router-link
              :to="{name: 'savedStories'}"
            >
              Saved Stories
            </router-link>
          </li>
          <li class="list-group-item menu-bar-item cursor-pointer text-white text-center mr-3 px-2 pb-2">
            <router-link
              :to="{name: 'userComments'}"
            >
              Comments
            </router-link>
          </li>
          <li class="list-group-item menu-bar-item cursor-pointer text-white text-center mr-3 px-2 pb-2">
            <router-link
              :to="{name: 'drafts'}"
            >
              Drafts
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped lang="scss">
.menu-bar-wrapper {
  background-color: black !important;
  color: white !important;
  width: 100vw;
  button {
    color: white !important;
  }

  .list-group-item {
    background-color: black !important;
    border: none;
    position: static;
    line-height: 1em;
  }

  .menu-bar-item {
    a,span{
      color: white !important;
      line-height: 50%;
      @media (max-width: 767.8px) {
        font-size: 0.75em;
      }
      @media (min-width: 767.8px) {
        font-size: 1em;
      }
      text-decoration: none;
    }
  }
}
</style>
