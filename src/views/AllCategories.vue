<template>
  <div class="categories-result-page">
    <div class="container-fluid categories-result-page-content my-2 p-2">
        <div class="row my-2 pb-3 col-12 mx-auto justify-content-between">
            <h2 class="m-0 bold">
                Categories
            </h2>
        </div>
      <div class="row pb-4 px-3">
        <h3 class="m-0">
          {{resultsCount}} categories found
        </h3>
      </div>
      <template v-if="resultsCount > 0">
        <div 
          v-for="(cat) in categories"
          :key="`cat_${cat.id}`"
          class="row px-4"
        >
            <router-link :to="{name: 'single-parent', params: {type: 'category', id: cat.id}}">
              {{ cat.name }} ({{ cat.story_count }})
            </router-link>
            <div 
              v-if="!cat.leaf">
              <div 
                class="row px-4 mx-4"
                v-for="(sub1) in cat.children"
                  :key="`sub1_${sub1.id}`"
                >
                <router-link :to="{name: 'single-parent', params: {type: 'category', id: sub1.id}}">
                  {{ sub1.name }} ({{ sub1.story_count }})
                </router-link>

                <div 
                  v-if="!sub1.leaf">
                    <div 
                      class="row px-4 mx-4"
                      v-for="(sub2) in sub1.children"
                        :key="`sub2_${sub1.id}`"
                      >
                      <router-link :to="{name: 'single-parent', params: {type: 'category', id: sub2.id}}">
                        {{ sub2.name }} ({{ sub2.story_count }})
                      </router-link>
                    
                      <div 
                        v-if="!sub2.leaf">
                          <div 
                            class="row px-4 mx-4"
                            v-for="(sub3) in sub2.children"
                              :key="`sub3_${sub3.id}`"
                            >
                            <router-link :to="{name: 'single-parent', params: {type: 'category', id: sub3.id}}">
                              {{ sub3.name }} ({{ sub3.story_count }})
                            </router-link>
                          </div>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
      </template>
    </div>
  </div>   
</template>

<script setup>
import {ref, onMounted, computed} from 'vue';
import api from '@/services/api';
import categorySort from "@/common/CategorySort";

const results = ref([]);
const resultsCount = ref(0);

onMounted( () => {
    fetchCategories();
});

const fetchCategories = async () => {
    await api.get(`/category/list/`).then(res => {
        if (res && res.data){
            results.value = res.data
            resultsCount.value = res.data.length;
        }
    });
};

const categories = computed( () => {
  let cats = results.value.sort(categorySort.sortCategories);
  let top = cats.filter(cat => !cat.parent);
  return top.map((cat) => makeCategory(cats, cat));
});

const makeCategory = (categories, root) => {
  var children = categories.filter( (cat) => {
    return cat.parent && cat.parent === root.id;;
  });
  return {
    id: root.id,
    story_count: root.story_count,
    key: root.id,
    name: root.name,
    data: root,
    selectable: true,
    leaf: children && children.length > 0 ? false : true,
    children: children && children.length > 0 ? children.map( (child) => {
      return makeCategory(categories, child);
    }) : null
  }
}

</script>

<style scoped lang="scss">

</style>