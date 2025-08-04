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
                src="@/assets/image/icon/add.svg"
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

<script setup>
import { ref, reactive, computed, onMounted, getCurrentInstance } from 'vue';
import CategoryCard from "@/components/Card/CategoryCard.vue";
import AdminBreadCrumbs from "@/components/Admin/AdminBreadCrumbs.vue";
import AdminMenu from "@/components/Admin/AdminMenu.vue";
import categorySort from "@/common/CategorySort";
import { Modal } from "bootstrap";
import api from '@/services/api';

const { proxy } = getCurrentInstance();

const categoryList = ref([]);
const categoryForm = reactive({
  type: 'add',
  name: '',
  id: null,
  parent_name: null,
  parent_id: null
});

let categoryModal = null;

const modalTitle = computed(() => {
  switch(categoryForm.type){
    case 'add':
      return "New Category";
    case 'edit':
      return "Edit Category";
    case 'sub':
      return "New Sub-Category";
    default:
      return "Category";
  }
});

const modalSubmitLabel = computed(() => {
  switch(categoryForm.type){
    case 'add':
    case 'sub':
      return "Add";
    case 'edit':
      return "Save";
    default:
      return "Submit";
  }
});

function refreshCategories() {
  getCategoryList();
}

async function getCategoryList() {
  try {
    const res = await api.get(`/category/list/`);
    let results = res.data;
    let top = results.filter( cat => !cat.parent );
    categoryList.value = top.map(cat => makeCategory(results, cat))
      .sort(categorySort.sortByTitle);
  } catch (error) {
    console.error('Error fetching category list:', error);
  }
}

function makeCategory(categories, root) {
  var children = categories.filter( (cat) => {
    return cat.parent && cat.parent === root.id;;
  });
  root["depth"] = getDepth(categories, root);
  root["title"] = getTitle(categories, root);
  if (children && children.length > 0 ){
    root["children"] = children.map(child => makeCategory(categories, child))
      .sort(categorySort.sortByTitle);
  }
  return root;
}

function getDepth(categories, cat) {
  if (cat.parent){
    let parent = categories.find( c => c.id === cat.parent );
    if (parent){
      return getDepth(categories, parent) + 1;
    }
  }
  return 0;
}

function getTitle(categories, cat) {
  if (cat.parent){
    let parent = categories.find( c => c.id === cat.parent );
    if (parent){
      return `${getTitle(categories, parent)} ${"\\"} ${cat.name}`;
    }
  }
  return cat.name;
}

async function categoryAction() {
  let data = {
    name: categoryForm.name
  };

  if (categoryForm.type === 'sub'){
    data["parent"] = categoryForm.parent_id;
  }

  let method = (categoryForm.type === 'sub' || categoryForm.type === 'add') ? api.post : api.patch;
  let url = (categoryForm.type === 'sub' || categoryForm.type === 'add') ? 'category/add/' : `category/change/${categoryForm.id}/`;

  try {
    await method(url, data);
    categoryModal.hide();
    let message = (categoryForm.type === 'sub' || categoryForm.type === 'add') ? 'New Category Added' : 'Category Updated';
    proxy.$toast.add({ severity: 'info', summary: 'Info', detail: message, life: 3000 });
    getCategoryList();
  } catch (error) {
    let message = (categoryForm.type === 'sub' || categoryForm.type === 'add') ? 'Error Adding Category' : 'Error Updating Category';
    proxy.$toast.add({ severity: 'error', summary: 'Error', detail: message, life: 3000 });
  }
}

function addCategory() {
  categoryForm.name = '';
  categoryForm.type = 'add';
  categoryModal.show();
}

function addSubCategory(parent_id, parent_name) {
  categoryForm.name = '';
  categoryForm.type = 'sub';
  categoryForm.parent_id = parent_id;
  categoryForm.parent_name = parent_name;
  categoryModal.show();
}

function editCategory(id, name) {
  categoryForm.id = id;
  categoryForm.name = name;
  categoryForm.type = 'edit';
  categoryModal.show();
}

async function deleteCategory(id) {
  try {
    await api.delete(`category/remove/${id}/`);
    proxy.$toast.add({ severity: 'info', summary: 'Info', detail: 'Category Deleted', life: 3000 });
    refreshCategories();
  } catch (error) {
    proxy.$toast.add({ severity: 'error', summary: 'Error', detail: 'Error Updating Category', life: 3000 });
  }
}

onMounted(() => {
  getCategoryList();
  categoryModal = new Modal('#categoryModal');
});
</script>

<style scoped lang="scss">
  @use '@/assets/style/admin.scss' as *;

  .cat-default-btn {
    background-color: black;
    color: white;
    img {
      width: 2vw;
    }
  }
</style>
