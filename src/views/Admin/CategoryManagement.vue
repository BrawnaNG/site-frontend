<template>
  <div class="categories-page">
    <div class="container-fluid admin-page-head mx-auto py-3">
      <div class="row h-100 m-0">
        <div class="col-6 px-0">
          <div class="admin-page-head-title px-0">
            <h4 class="m-0 font-weight-bolder">
              Admin
            </h4>
          </div>
        </div>
      </div>
      <div class="row admin-page-head-breadcrumb pt-1 px-0">
        <admin-bread-crumbs label="Categories" />
      </div>
    </div>
    <admin-menu />
    <div class="content-flex categories-content mx-auto py-5">
      <div class="row m-0">
        <div class="col-6">
          <h2 class="m-0">
            Categories
          </h2>
        </div>
        <div class="col-6 px-0 pb-5 text-right">
          <button
            pill
            variant="dark"
            class="story-default-btn pl-3 pr-2 py-2 font-weight-bold"
            @click="showCategoryForm('Add')"
          >
            Add Category
            <img
              src="../../assets/image/icon/add.svg"
              class="ml-2"
              alt="go"
            >
          </button>
        </div>
      </div>
      <div class="row py-4 px-0">
        <template v-if="categoryList.length">
          <category-card
            v-for="(category, index) in categoryList"
            :key="`cat_card_${index}`"
            :category="category"
            @show-edit-category-form="showEditCategoryForm"
          />
        </template>
      </div>
    </div>
  </div>

  <div
    id="categoryModel"
    class="modal"
    tabindex="-1"
    aria-labelledby="categoryModalLabel" 
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        
        <div class="modal-header">
          <h5 
            id="categoryModalLabel"
            class="modal-title"
          >
            Cetegory
          </h5>
          <button 
            type="button" 
            class="btn-close" 
            data-bs-dismiss="modal" 
            aria-label="Close"
          />
        </div>

        <div class="modal-body">
          <div class="p-1 rounded border">
            <input
              v-model="categoryName"
              class="border-0 categoryu-form-input"
              placeholder="Category title"
            >
          </div>
          <div class="pt-4">
            <template v-if="categoryForm.type === 'Add'">
              <button
                pill
                variant="dark"
                class="story-default-btn saved-stories-btn px-3 py-2 mr-3 font-weight-bold"
                @click="addCategory()"
              >
                Add Category
              </button>
            </template>
            <template v-else>
              <button
                pill
                variant="dark"
                class="story-default-btn saved-stories-btn px-3 py-2 mr-3 font-weight-bold"
                @click="editCategory()"
              >
                Edit Category
              </button>
            </template>
          </div>
        </div>  
        <div class="modal-footer">
          <button 
            id="loginModalClose"
            type="button"
            class="btn btn-secondary" 
            data-bs-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>  
    </div>
  </div>
</template>

<script>
import CategoryCard from "@/components/Admin/CategoryCard.vue";
export default {
  name: "CategoryManagement",
  components: {CategoryCard},
  data() {
    return {
      categoryList: [],
      categoryForm: {
        show: false,
        type: 'add',
        name: '',
        oldName: ''
      }
    }
  },
  mounted() {
    this.getCategoryList()
  },
  methods: {
    getCategoryList() {
      this.axios.get(`/category/list/`).then(res => {
        this.categoryList = res.data
      })
    },

    showCategoryForm(type, name='') {
      this.categoryForm = {
        show: true,
        type: type,
        name: name,
        oldName: name
      }
    },

    showEditCategoryForm(name) {
      this.showCategoryForm('Edit', name)
    },

    closeCategoryFormDialog() {
      this.categoryForm = {
        show: false,
        type: 'Add',
        name: '',
        oldName: ''
      }
    },

    addCategory() {
      this.axios.post('category/add/', {
        name: this.categoryForm.name
      }).then(res => {
        this.$toasted.show(`Add New Category!`, {
          duration: 3000,
          type: 'dark',
        });
        this.closeCategoryFormDialog()
        this.getCategoryList()
        console.log(res);
      })
    },

    editCategory() {
      this.axios.post(`/category/change/${this.categoryForm.oldName}`, {
        name: this.categoryForm.name
      }).then(res => {
        this.$toasted.show(`Update Category Successfully!`, {
          duration: 3000,
          type: 'dark',
        });
        this.closeCategoryFormDialog()
        this.getCategoryList()
        console.log(res);
      })
    },
  }
}
</script>

<style scoped>

</style>