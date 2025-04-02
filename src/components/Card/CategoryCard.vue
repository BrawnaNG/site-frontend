<template>
  <div 
    class="container-fluid category-card py-3"
    :class="{ 'border': isRoot }"
  >
    <div 
      class="row m-0 justify-content-between pl-6"
      :class="getClass"
    >
      <div class="col-6 p-0">
        <span class="spacer">
        {{ category.name }}
        </span>
      </div>
        
      <div class="col-4 p-0">
        <span
          class="mr-3 cursor-pointer edit-btn"
          @click="editCategory(category.id, category.name)"
        >
          <img src="../../assets/image/icon/Edit.svg">
        </span>
        <span 
          class="mr-3 cursor-pointer delete-btn"
          @click="deleteCategory(category.id)"
        >
          <img src="../../assets/image/icon/Delete.svg">
        </span>
      </div>
    </div>
    <div 
      class="row"
      :class="getClass"
    >
      <div 
          class="add-btn col-8 spacer"
          v-if="category.depth < 2">
        <button
          pill
          variant="dark"
          class="pr-1 py-1 px-2 font-weight-bold rounded-pill"
          @click="addSubCategory(category.id, category.name)"
        >
          <img
            src="../../assets/image/icon/add.svg"
            class="mr-1"
            alt="go"
          >
          Add Sub-Category
        </button>
      </div>
    </div>

    <div class="row">
      <template v-if="category.children">
          <CategoryCard
            v-for="(subCat) in category.children"
            :key="`cat_card_${subCat.id}`"
            :category="subCat"
            @edit-category="editCategory"
            @add-sub-category="addSubCategory"
            @delete-category="deleteCategory"
          />
      </template>
    </div>
  </div>

</template>

<script>
export default {
  name: "CategoryCard",
  emits: ['editCategory','addSubCategory','deleteCategory'],
  props: {
    category: {
      type: Object,
      default: () =>({
        title: "",
        name: "",
        id: null,
        parent: null,
        depth: 0,
        description: "",
        children: []
      })
    }
  },
  computed: {
    getClass() {
      return `category-card-content-depth-${this.category.depth}`;
    },
    isRoot() {
      return this.category.depth === 0;
    }
  },
  methods:{
    editCategory(id, name) {
      this.$emit('editCategory', id, name);
    },
    addSubCategory(parent_id, parent_name){
      this.$emit('addSubCategory', parent_id, parent_name);
    },
    deleteCategory(id){
      this.$emit('deleteCategory', id);
    }
  }
}
</script>

<style scoped lang="scss">
.category-card {
  &-head {
    img {
      width: 1.4vw;
    }
  }
  &-content {

    .edit-btn {
      img {
        width: 1.4vw;
      }
    }
    
    .delete-btn {
      img {
        width: 1.1vw;
      }
    }

    &-depth-0 {
      font-size: 1em;
      font-weight: bolder;
      .spacer {
        padding-left: 50px;
      }

      .add-btn {
        button {
          font-size: .8em;
          background-color: black;
          color: white;
          img {
            width: 1.6vw;
          }
        }
      }

    }

    &-depth-1 {
      font-size: 0.9em;
      .spacer {
        padding-left: 100px;
      }
      .add-btn {
        button {
          font-size: .7em;
          background-color: gray;
          color: white;
          img {
            width: 1.3vw;
          }
        }
      }

    }

    &-depth-2 {
      font-size: 0.7em;
      .spacer {
        padding-left: 150px;
      }
    }
  }
}
</style>