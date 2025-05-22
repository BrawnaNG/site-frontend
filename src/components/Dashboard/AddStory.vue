<template>
  <div>
    <button
      class="story-default-btn pr-2 py-2 px-4 font-weight-bold rounded-pill"
    >
      Create Story
      <img
        src="../../assets/image/icon/add.svg"
        class="mx-2 px-0"
        data-bs-toggle="modal"
        data-bs-target="#storyModal"
      >
    </button>

    <div 
      id="storyModal"
      class="modal" 
      tabindex="-1"
      aria-labelledby="storyModalLabel" 
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 
              id="storyModalLabel"
              class="modal-title"
            >
              Create Story
            </h5>
          </div>

          <div class="story-form container p-3">
            <div class="row">
              <div class="rounded border p-1">
                <input
                  v-model="storyTitle"
                  type="text"
                  class="border-0 story-form-input form-control"      
                  placeholder="Enter a title for your story"
                >
              </div>
            </div>
            <div class="row">
              <button
                pill
                variant="dark"
                class="story-default-btn btn-primary font-weight-bold w-50 py-2 my-3 mx-auto"
                @click="createStory()"
              >
                Create Story
              </button>
              <button
                id="storyModalClose"
                pill
                variant="dark"
                class="story-default-btn font-weight-bold w-50 py-2 my-3 mx-auto"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

  import { ref } from 'vue';
  import api from '@/services/api';
  import { useRouter } from 'vue-router';

  const storyTitle = ref("");
  const router = useRouter();

  const createStory = async() => {
    const res = await api.post('/story/add/',{
      title: storyTitle.value
    });
    if (res && res.data){
      const story_id = res.data.id;
      await api.post(`/story/${story_id}/chapter/add/`,
        {
          pos: 0
        }).then(_ => {
          document.getElementById('storyModalClose').click();
          router.push({name: 'addEditStory', params: {id: story_id}})
        });
    }
  };
</script>

<style scoped lang="scss">
  .story-default-btn {
    background-color: black;
    color: white;
    img {
      width: 2.4vw;
    }
  }
</style>