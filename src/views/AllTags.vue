<template>
  <div class="tags-result-page">
    <div class="container-fluid">
      <div class="row p-2 col-12 mx-auto justify-content-between">
          <h2 class="m-0 font-weight-bolder">
              {{ results.length }} / {{ resultsCount }} Tags
          </h2>
      </div>
      <div class="mx-3 pb-3">
        <template v-if="resultsCount > 0">
          <div
            v-for="(tag,pos) in tags"
            :key="`tag_${tag.id}`"
            class="pe-1 d-inline tag-cloud"
            :class="tagClass(tag.index,pos)"
          >
              <router-link :to="{name: 'single-tag', params: {tag_id: tag.id}}">
                <span class="text-nowrap">{{ tag.name }} ({{  tag.story_count }})</span>
              </router-link>
              &nbsp;
            </div>
        </template>
      </div>
      <div
        v-if="results.length < resultsCount"
        class="row mx-1"
      >
        <div class="col-2">
          <button 
            type = "button"
            class="btn btn-secondary rounded"
            @click="loadMore">
            Load More Tags
          </button>
        </div>
      </div>
    </div>
  </div>   
</template>

<script setup>
import {ref, onMounted, computed} from 'vue';
import api from '@/services/api';

const results = ref([]);
const resultsCount = ref(0);
const pageSize = 100;
const page = ref(1)
const highest = ref(0);
const ratios = [0.9,0.7,0.4];
const breaks = [5,20,30,40]

onMounted( () => {
    page.value = 1;
    highest.value = 0;
    fetchTags(false);
});

const tagClass = (index,pos) => {
  return `${tagSizeClass(index)} ${tagColorClass(pos)}`;
}

const tagSizeClass = (index) => {
  if (index < 10 )
    return "tag-size-1";
  else if (index < 20 * page)
    return "tag-size-2";
  else if (index < 50 * page)
    return "tag-size-3";
  else 
    return "tag-size-4";
}

const tagColorClass = (pos) => {
  if (pos % 3 == 0)
    return "tag-color-3";
  else if (pos % 3 == 1)
    return "tag-color-2";
  else 
    return "tag-color-1";
}

const tags = computed( () => {
  return results.value.sort((a, b) => a.name.localeCompare(b.name));
});

const fetchTags = async (append) => {
    await api.get(`/tag/?page=${page.value}&page_size=${pageSize}`).then(res => {
        if (res && res.data && res.data.results){
            const existing = results.value.length;
            const new_tags = res.data.results.map( (tag,index) =>{
              tag.name = tag.name.toLowerCase();
              tag.index = index + existing;
              return tag;
            });
            if (append)
              results.value = results.value.concat(new_tags);
            else {
              results.value = new_tags;
              highest.value = results.value.reduce( 
                (max, tag) => { return tag.story_count > max ? tag.story_count : max },
                0
              );
            }
            resultsCount.value = res.data.count;
            breaks.value = ratios.map( (r) => r * highest.value );
        }
    });
};

const loadMore = async () => {
  page.value +=1;
  await fetchTags(true);
}

</script>

<style scoped lang="scss">
.tags-result-page {
  font-family: NotoSerif-Bold;
}

.tag-cloud {
  line-height: 30px;
  a {
    text-decoration: none;
  }
}
.tag-size-1 {
  font-size: 2.25em;
  a {
    color: 	#778da9;
  }
}
.tag-size-2 {
  font-size: 1.75em;
  a {
    color: 		#415a77;
  }
}
.tag-size-3 {
  font-size: 1.5em;
  a {
    color: 		#1b263b
  }
}
.tag-size-4 {
  font-size: 1em;
  a {
    color: 		#0d1b2a
  }
}

</style>