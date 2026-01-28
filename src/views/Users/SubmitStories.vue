<template>
    <div 
        class="container-fluid mx-4 px-4 mt-4 pt-4"
        v-if="!requestSubmitted && !requestPending && !requestDenied"
    >
        <div class="row mt-3 justify-content-md-center">
            <p>
                If you would like to submit stories to Brawna, we will need to authorize you.
            </p>
            <p>
                This is currently a manual process, and can take a few days.
            </p>
            <p>    
                If you would like to proceed, click below
            </p>
        </div>
        <div class="row row mt-0 justify-content-md-center">
            <div class="col-md-auto w-25">
                <button
                    class="story-default-btn w-50 px-4 py-2 my-3 mx-auto"
                    @click="submitRequest"
                >
                    Submit Request
                </button>
            </div>
        </div>
    </div>

    <div 
        class="container-fluid my-2 p-2"
        v-if="requestSubmitted"
    >
        <div class="row mt-4 justify-content-md-center">
            <div 
                class="p-1 alert alert-success w-50 col-12 mx-auto rounded border text-center"
                v-if="request.success">
                {{ request.success }}
            </div>
            <div 
                class="p-1 alert alert-danger w-50 col-12 mx-auto rounded border text-center"
                v-if="request.error">
                {{ request.error }}
            </div>
        </div>
    </div>

    <div 
        class="container-fluid my-2 p-2"
        v-if="requestPending"
    >
        <div class="p-1 alert alert-success w-50 col-12 mx-auto rounded border text-center">
            {{PENDING}}
        </div>
    </div>

    <div 
        class="container-fluid my-2 p-2"
        v-if="requestDenied"
    >
        <div class="p-1 alert alert-danger w-50 col-12 mx-auto rounded border text-center">
            {{DENIED}}
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import api from '@/services/api';
import { useAuthStore } from '@/stores';
import authService from '@/services/auth.service';

const SUCCESS = "You request has been submitted";
const ERROR = "An error occurred submitting your request please try again later";
const PENDING = "Your request is under review."
const DENIED = "We're sorry, but your request to submit stories has been denied by the site Admin. Please email brawna2023@gmail.com or ping FfejL in Discord if you have questions.";

const requestSubmitted = ref(false);
const requestPending = ref(false);
const requestDenied = ref(false);

const request = reactive({
  error: null,
  success: null
});

// Lifecycle hooks
onMounted( async () => {
    const authStore = useAuthStore();
    if (!authStore.role.isInit){
      await authService.getRole(authStore);
    }
    if (authStore.role.authorStatusRequested)
        requestPending.value = true;
    if (authStore.role.authorStatusDenied)
        requestDenied.value = true;
});

// Functions
function submitRequest() {
    requestSubmitted.value = true;
    api.post(`/accounts/request-author/`).then(
    (_) => {
        request.success = SUCCESS;
        request.error = null;
        const authStore = useAuthStore();
        authStore.setAuthorStatusRequested(true);
    },
    (error) => {
        request.success = null;
        if (error.response)
            request.error = error.response.data["detail"];
        else
            request.error = ERROR;
    });
}

</script>


<style scoped lang="scss">
.reset-form {
    &-input {
        font-size: 1em;
        min-width: 25%;
        &:focus {
        outline: unset;
        box-shadow: unset;
        }
    }
}
</style>
