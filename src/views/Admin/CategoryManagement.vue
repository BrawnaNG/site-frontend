<template>
  <Toast />

  <div class="admin-page">
    <div class="container-fluid admin-page-head mx-auto py-3">
      <div class="row h-100 m-0">
        <div class="col-6 px-0">
          <div class="admin-page-head-title px-0">
            <p class="m-0 font-weight-bolder">
              Admin
            </p>
          </div>
        </div>
      </div>
      <div class="row admin-page-head-breadcrumb pt-1 px-2">
        <admin-bread-crumbs label="Categories" />
      </div>
    </div>
    <admin-menu current="categories" />

    <div class="container-fluid admin-page-content mx-auto py-3">
      <div class="row m-0">
        <div class="col-8 pl-0">
            <p class="m-0 admin-page-content-title">
              Categories
            </p>
        </div>
        <div class="col-4 px-4 align-middle">
          <div class="float-end">
            <button
              class="cat-default-btn pr-2 py-2 px-4 font-weight-bold rounded-pill"
              @click="addCategory"
            >
              Add Category
              <img
                src="../../assets/image/icon/add.svg"
                class="mx-2 px-0"
              >
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid admin-page-content mx-auto">    
      <div class="row py-2 px-0">
        <template v-if="categoryList.length">
          <div 
            class="pb-2"
            v-for="(category) in categoryList"
            :key="`cat_card_${category.id}`"
          >
            <CategoryCard
              :category="category"
              @edit-category="editCategory"
              @add-sub-category="addSubCategory"
              @delete-category="deleteCategory"
            />
          </div>
        </template>
      </div>
    </div>
  </div>

  <div
    id="categoryModal"
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
            {{modalTitle}}
          </h5>
        </div>

        <div class="modal-body">
          <div 
            class="mb-3"
            v-if="categoryForm.type === 'sub'"
          >
            <label class="fw-semibold">Parent Category: </label>
            <span class="ms-2">{{ categoryForm.parent_name }}</span>
          </div>

          <div class="mb-3">
            <input
              v-model="categoryForm.name"
              class="form-control"
              placeholder="Category name"
              @keydown.enter="categoryAction()"
            >
          </div>

        </div>
        
        <div class="modal-footer">
          <button
              class="btn btn-primary"
              @click="categoryAction()"
            >
              {{modalSubmitLabel}}
          </button>
          <button 
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
import CategoryCard from "@/components/Card/CategoryCard.vue";
import AdminBreadCrumbs from "@/components/Admin/AdminBreadCrumbs.vue";
import AdminMenu from "@/components/Admin/AdminMenu.vue";
import categorySort from "@/common/CategorySort";
import { Modal } from "bootstrap";
export default {
  name: "CategoryManagement",
  components: {
    CategoryCard,
    AdminBreadCrumbs,
    AdminMenu
  },
  data() {
    return {
      categoryList: [],
      categoryForm: {
        type: 'add',
        name: '',
        id: null,
        parent_name: null,
        parent_id: null
      }
    }
  },
  mounted() {
    this.getCategoryList();
    this.categoryModal = new Modal('#categoryModal');
  },
  computed: {
    modalTitle() {
      switch(this.categoryForm.type){
        case 'add':
          return "New Category";
        case 'edit':
          return "Edit Category";
        case 'sub':
          return "New Sub-Category";
        default:
          return "Category";
      }
    },
    modalSubmitLabel() {
      switch(this.categoryForm.type){
        case 'add':
        case 'sub':
          return "Add";
        case 'edit':
          return "Save";
        default:
          return "Submit";
      }
    }
  },
  methods: {

    refreshCategories(){
      this.getCategoryList();
    },

    getCategoryList() {
      this.axios.get(`/category/list/`).then(res => {
        let results = res.data;
        let top = results.filter( cat => !cat.parent );
        this.categoryList = top.map(cat => this.makeCategory(results, cat))
          .sort(categorySort.sortByTitle);
      })
    },

    makeCategory(categories, root){
      var children = categories.filter( (cat) => {
        return cat.parent && cat.parent === root.id;;
      });
      root["depth"] = this.getDepth(categories, root);
      root["title"] = this.getTitle(categories, root);
      if (children && children.length > 0 ){
        root["children"] = children.map(child => this.makeCategory(categories, child))
          .sort(categorySort.sortByTitle);
      }
      return root;
    },

    getDepth(categories, cat){
      if (cat.parent){
        let parent = categories.find( c => c.id === cat.parent );
        if (parent){
          return this.getDepth(categories, parent) + 1;
        }
      }
      return 0;
    },

    getTitle(categories, cat){
      if (cat.parent){
        let parent = categories.find( c => c.id === cat.parent );
        if (parent){
          return `${this.getTitle(categories, parent)} ${"\\"} ${cat.name}`;
        }
      }
      return cat.name;
    },

    categoryAction() {
      let data = {
        name: this.categoryForm.name
      };

      if (this.categoryForm.type === 'sub'){
        data["parent"] = this.categoryForm.parent_id;
      }

      let method = (this.categoryForm.type === 'sub' || this.categoryForm.type  === 'add') ? this.axios.post : this.axios.patch;
      let url = (this.categoryForm.type  === 'sub' || this.categoryForm.type  === 'add') ? 'category/add/' : `category/change/${this.categoryForm.id}/`;

      method(url,data).then(
        _ =>{
          this.categoryModal.hide();
          let message = (this.categoryForm.type  === 'sub' || this.categoryForm.type  === 'add') ? 'New Category Added' : 'Category Updated';
          this.$toast.add({ severity: 'info', summary: 'Info', detail: message, life: 3000 });
          this.getCategoryList()
        },
        _error => {
          let message = (this.categoryForm.type  === 'sub' || this.categoryForm.type === 'add') ? 'Error Adding Category' : 'Error Updating Category';
          this.$toast.add({ severity: 'error', summary: 'Error', detail: message, life: 3000 });
        }
      )
    },
    addCategory(){
      this.categoryForm.name = '';
      this.categoryForm.type = 'add';
      this.categoryModal.show();
    },
    addSubCategory(parent_id, parent_name){
      this.categoryForm.name = '';
      this.categoryForm.type = 'sub';
      this.categoryForm.parent_id = parent_id;
      this.categoryForm.parent_name = parent_name;
      this.categoryModal.show();
    },
    editCategory(id, name){
      this.categoryForm.id = id;
      this.categoryForm.name = name;
      this.categoryForm.type = 'edit';
      this.categoryModal.show();
    },
    deleteCategory(id){
      this.axios.delete(`category/change/${id}/`).then(
        _ => {
          this.$toast.add({ severity: 'info', summary: 'Info', detail: 'Category Deleted', life: 3000 });
          this.refreshCategories();
        },
        _error => {
          this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Error Updating Category', life: 3000 });
        }
      );   
    }
  }
}
</script>

<style scoped lang="scss">
  @import '@/assets/style/admin.scss';

  .cat-default-btn {
    background-color: black;
    color: white;
    img {
      width: 2vw;
    }
  }
</style>