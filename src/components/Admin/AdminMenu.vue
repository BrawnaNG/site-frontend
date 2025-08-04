<template>
  <div class="container-fluid menu-bar-wrapper px-0 bg-dark">
    <nav aria-label="breadcrumb" style="--bs-breadcrumb-divider: '';">
      <ol class="breadcrumb menu-bar">
          <li 
            class="menu-bar-item cursor-pointer text-white text-center"
            v-for="item in menuItems"
          >
            <router-link
              class="px-1"
              :to="item.target"
              v-if="!item.isActive"
            >
              {{ item.label }}
            </router-link>
            <p
              class="px-1 active"
              v-if="item.isActive">
              {{ item.label }}
            </p>
          </li>
          <li class="menu-bar-item cursor-pointer text-white">
            <p
              class="px-1 menu-bar-logout"
              @click="logOut()"
            >
              Log out
            </p>
          </li>
      </ol>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import EventBus from "../../common/EventBus";

const props = defineProps({
  current: {
    type: String,
    default: 'admin'
  }
});

const items = ref({
  "admin": {
    label: "Recent Stories",
    target: {name: 'admin'}
  },
  "users": {
    label: "Users",
    target: {name: 'users'}
  },
  "comments": {
    label: "Comments",
    target: {name: 'comments'}
  },
  "categories":{
    label: "Categories",
    target: {name: 'categories'}
  }
});

const menuItems = computed(() => {
  let menuItems = [];
  for (const key in items.value){
    items.value[key]["isActive"] = key === props.current;
    menuItems.push(items.value[key]);
  }
  return menuItems;
});

function logOut() {
  EventBus.dispatch("logout");
}
</script>

<style scoped lang="scss">

  .menu-bar{
    width: 90%;

    &-wrapper{
      padding-top: 1em;
      padding-bottom: 0.2cqmin;
      .breadcrumb{
        margin-bottom: 0px;
      } 
    }

    :first-child{
      padding-left: 5%;
      text-align: left;
    }
    :last-child {
      padding-left: 15%;
      text-align: right;
    }



    &-item{
      padding-right: 2em;
      color: white;
      font-weight: bolder;
      font-size: 1.5m;
      a {
        color:white;
        text-decoration: none;
      }
      .active{
        text-decoration: underline;
        text-underline-offset: 0.5em;
      }
    }
  }

</style>
