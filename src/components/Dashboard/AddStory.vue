<template>
  <div>
    <button
      class="story-default-btn px-3 py-2 rounded-pill add-story-btn"
      data-bs-toggle="modal"
      data-bs-target="#storyModal"
    >
      Create Story
      <img
        src="@/assets/image/icon/add.svg"
        class="ms-2 px-0 add-story-icon"
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
              class="modal-title bold"
            >
              Create Story
            </h5>
          </div>

          <div class="story-form container-fluid p-3">
            <div class="row justify-content-start">
              <div class="col-md-auto w-100">
                <div class="rounded border w-100">
                  <input
                    v-model="storyTitle"
                    type="text"
                    class="border-0 story-form-input form-control"      
                    placeholder="Enter a title for your story"
                  >
                </div>
              </div>
            </div>
            <div class="row justify-content-end pt-3 float-end">
              <div class="col-1"></div>
              <div class="col">
                <button
                  class="btn btn-dark text-nowrap"
                  @click="createStory()"
                >
                  Create Story
                </button>
              </div>
              <div class="col">
                <button
                  id="storyModalClose"
                  class="btn btn-secondary"
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
      await api.post(`/story/${story_id}/chapter-add/`,
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
.add-story-btn {
  @media (max-width: 767.8px){
    text-wrap: nowrap;
    font-size: 0.75em;
  }
}
.add-story-icon {
  height: 2em;
  width: 2em;
  @media (max-width: 767.8px){
    height: 1.5em;
    width: 1.5em;
  }

}
</style>
