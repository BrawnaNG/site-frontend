<template>
  <div class="categories-page">
    <b-col cols="10" class="admin-page-head mx-auto py-3">
      <b-row class="h-100 m-0">
        <b-col cols="6" class="px-0">
          <b-col class="admin-page-head-title px-0">
            <h4 class="m-0 font-weight-bolder">
              Admin
            </h4>
          </b-col>
          <b-col class="admin-page-head-breadcrumb pt-1 px-0">
            <b-breadcrumb class="bg-transparent pb-0 px-0 m-0" :items="breadcrumb"></b-breadcrumb>
          </b-col>
        </b-col>
      </b-row>
    </b-col>
    <b-col cols="12" class="py-3 menu-bar-wrapper px-0">
      <b-row class="col-10 mx-auto my-0">
        <b-row class="col-10 m-0 px-0">
          <b-col cols="auto"
                 class="menu-bar-item cursor-pointer text-white text-center mr-3 pb-2">
            <router-link class="pb-2 px-1" :to="{name: 'admin'}">
              Recent Stories
            </router-link>
          </b-col>
          <b-col cols="auto"
                 class="menu-bar-item cursor-pointer text-white text-center mr-3 pb-2">
            <router-link class="pb-2 px-1" :to="{name: 'users'}">
              Users
            </router-link>
          </b-col>
          <b-col cols="auto"
                 class="menu-bar-item cursor-pointer text-white text-center mr-3 pb-2">
            <router-link class="pb-2 px-1" :to="{name: 'comments'}">
              Comments
            </router-link>
          </b-col>
          <b-col cols="auto"
                 class="menu-bar-item cursor-pointer text-white text-center mr-3 pb-2">
            <router-link class="pb-2 px-1" :to="{name: 'categories'}">
              Categories
            </router-link>
          </b-col>
        </b-row>
        <b-col cols="2" class="text-right p-0">
          <span class="text-white">
            Log out
          </span>
        </b-col>
      </b-row>
    </b-col>
    <b-col cols="10" class="categories-content mx-auto py-5">
      <b-row class="m-0">
        <b-col cols="6" class="px-0 pb-5">
          <h2 class="m-0">
            Categories
          </h2>
        </b-col>
        <b-col cols="6" class="px-0 pb-5 text-right">
          <b-button pill variant="dark"
                    @click="showCategoryForm('Add')"
                    class="story-default-btn pl-3 pr-2 py-2 font-weight-bold">
            Add Category
            <img src="../../assets/image/icon/add.svg" class="ml-2" alt="go">
          </b-button>
        </b-col>
      </b-row>
      <b-col cols="12" class="py-4 px-0">
        <template v-if="categoryList.length">
          <category-card v-for="(category, index) in categoryList"
                         @showEditCategoryForm="showEditCategoryForm"
                         :category="category"
                         :key="`cat_card_${index}`"/>
        </template>
      </b-col>
    </b-col>

    <b-modal hide-footer
             :title="`${categoryForm.type} category`"
             v-model="categoryForm.show">
      <div class="px-2 py-4">
        <div class="p-1 rounded border">
          <b-form-input v-model="categoryForm.name"
                        class="border-0 login-form-input"
                        placeholder="Category title"/>
        </div>
        <div class="pt-4">
          <template v-if="categoryForm.type === 'Add'">
            <b-button pill variant="dark"
                      @click="addCategory()"
                      class="story-default-btn saved-stories-btn px-3 py-2 mr-3 font-weight-bold">
              Add Category
            </b-button>
          </template>
          <template v-else>
            <b-button pill variant="dark"
                      @click="editCategory()"
                      class="story-default-btn saved-stories-btn px-3 py-2 mr-3 font-weight-bold">
              Edit Category
            </b-button>
          </template>
          <b-button @click="closeCategoryFormDialog()" pill variant="outline-dark"
                    class="story-default-btn saved-stories-btn px-3 py-2  font-weight-bold">
            Cancel
          </b-button>
        </div>
      </div>

    </b-modal>
  </div>
</template>

<script>
import CategoryCard from "@/components/Admin/CategoryCard";
export default {
  name: "CategoryManagement",
  components: {CategoryCard},
  mounted() {
    this.getCategoryList()
  },
  data() {
    return {
      breadcrumb: [
        {
          text: 'Home',
          href: '/'
        },
        {
          text: 'Admin',
          href: '#/admin/recent-stories'
        },
        {
          text: 'Categories',
        }
      ],
      categoryList: [],
      categoryForm: {
        show: false,
        type: 'add',
        name: '',
        oldName: ''
      }
    }
  },
  methods: {
    getCategoryList() {
      this.$axios.get(`/category/list/`).then(res => {
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
      this.$axios.post('category/add/', {
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
      this.$axios.post(`/category/change/${this.categoryForm.oldName}`, {
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