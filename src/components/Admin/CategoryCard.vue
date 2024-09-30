<template>
  <div class="container-fluid category-card border p-3 mb-4">
    <div class="row category-card-head m-0 justify-content-between pb-3">
      <div class="col p-0">
        {{ category.name }}
      </div>
      <div class="col p-0">
        <span class="mr-3 cursor-pointer">
          <img src="../../assets/image/icon/Delete.svg">
        </span>
        <span
          class="mr-3 cursor-pointer"
          @click="editCategory(category.name)"
        >
          <img src="../../assets/image/icon/Edit.svg">
        </span>
      </div>
    </div>
    <template v-if="category.parent">
      <div class="category-card-content p-3">
        <div class="category-card-content-add-btn py-2">
          <button
            pill
            variant="dark"
            class="story-default-btn pr-2 pl-1 py-1 font-weight-bold"
          >
            <img
              src="../../assets/image/icon/add.svg"
              class="mr-1"
              alt="go"
            >
            Add Sub-Category
          </button>
        </div>
        <div class="container-flex category-card-content-sub py-2">
          <div 
            v-for="subCat in category.subCat"
            :key="`subCat_${subCat}`"
            class="row m-0 justify-content-between"
          >
            <div class="col category-card-content-sub-name p-0">
              {{ subCat.name }}
            </div>
            <div class="col category-card-content-sub-btn p-0">
              <span class="delete-btn mr-3 cursor-pointer">
                <img src="../../assets/image/icon/Delete.svg">
              </span>
              <span class="edit-btn cursor-pointer">
                <img src="../../assets/image/icon/Edit.svg">
              </span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "CategoryCard",
  props: {
    category: {
      type: Object,
      default: () =>({
        name: "",
        parent: null
      })
    }
  },
  emits: ['showEditCategoryForm'],
  methods:{
    editCategory(name) {
      this.$emit('showEditCategoryForm', name)
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
    &-add-btn {
      button {
        font-size: .7em;
        img {
          width: 1.8vw;
        }
      }

    }
    &-sub {
      &-name {
        font-size: .8em;
        color: #707070;
      }
      &-btn {
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

      }
    }
  }
}
</style>