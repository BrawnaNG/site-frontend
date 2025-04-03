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

<script>
import EventBus from "../../common/EventBus";
export default {
  name: "AdminMenu",
  props: {
    current: {
      type: String,
      default: 'admin'
    }
  },
  data() {
    return {
      items:{
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
      }
    }
  },
  computed: {
    menuItems() {
      let menuItems = [];
      for (const key in this.items){
        this.items[key]["isActive"] = key === this.current;
        menuItems.push(this.items[key]);
      }
      return menuItems;
    }
  },
  methods : {
    logOut(){
      EventBus.dispatch("logout");
    },
  }
}
</script>

<style scoped lang="scss">

  .menu-bar{
    &-wrapper{
      padding-top: 1em;
      padding-bottom: 0.2cqmin;
      .breadcrumb{
        margin-bottom: 0px;
      } 
    }

    width: 90%;
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
      font-family: "NotoSerif-Bold";
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