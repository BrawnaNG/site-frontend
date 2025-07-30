<template>
    <div 
        class="container-fluid my-2 p-2"
        v-if="tokenSubmitted"
    >
        <div class="row mt-4 justify-content-md-center">
            <div 
                class="p-1 alert alert-danger w-50 col-12 mx-auto rounded border text-center"
                v-if="activation.error">
                {{ activation.error }}
            </div>
            <div 
                class="p-1 alert alert-success w-50 col-12 mx-auto rounded border text-center"
                v-if="activation.success">
                {{ activation.success }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onBeforeMount } from 'vue';
import AuthService from '../../services/auth.service';
import { useRoute } from 'vue-router';

const route = useRoute();
const activationToken = ref(route.params.token);

const activation = reactive({
  error: null,
  success: null
});

const tokenSubmitted = ref(false);

// Lifecycle hooks
onBeforeMount(() => {
  checkActivationToken();
});

// Functions
function checkActivationToken() {
    tokenSubmitted.value = true;
    AuthService.activateUser(activationToken.value).then(
    (response) => {
        activation.success = response.data["detail"];
    },
    (error) => {
        activation.error = error.response.data["detail"];
    });
}

</script>