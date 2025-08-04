<template>
    <div 
        class="container-fluid mx-4 px-4 mt-4 pt-4"
        v-if="!tokenSubmitted"
    >
        <div class="row mt-3 justify-content-md-center">
            <div class="col-md-auto rounded border reset-form-input">
                <input
                v-model="reset.password"
                :type="showPassword ? 'text' : 'password'"
                class="border-0 reset-form-input form-control"
                placeholder="Enter new password"
                >
            </div>
            <div class="col-md-auto text-start">
                <img
                title="show password"
                class="cursor-pointer"
                src="@/assets/image/icon/Show.svg"
                @click="showPassword = !showPassword"
                >
            </div>
        </div>

        <div class="row mt-3 justify-content-md-center">
            <div class="col-md-auto rounded border reset-form-input">
                <input
                v-model="reset.rePassword"
                :type="showRepeatPassword ? 'text' : 'password'"
                class="border-0 reset-form-input form-control"
                placeholder="Enter your new password again"
                >
            </div>
            <div class="col-md-auto text-start">
                <img
                title="show password"
                class="cursor-pointer"
                src="@/assets/image/icon/Show.svg"
                @click="showRepeatPassword = !showRepeatPassword"
                >
            </div>
        </div>

        <div class="row mt-4 justify-content-md-center">
            <div 
                class="p-1 alert alert-danger w-50 col-12 mx-auto rounded border text-center"
                v-if="reset.error">
                {{ reset.error }}
             </div>   
        </div>

        <div class="row row mt-0 justify-content-md-center">
            <div class="col-md-auto w-25">
                <button
                    class="story-default-btn w-50 px-4 py-2 my-3 mx-auto"
                    @click="resetPassword"
                >
                    Set new password
                </button>
            </div>
        </div>
    </div>

    <div 
        class="container-fluid my-2 p-2"
        v-if="tokenSubmitted"
    >
        <div class="row mt-4 justify-content-md-center">
            <div 
                class="p-1 alert alert-danger w-50 col-12 mx-auto rounded border text-center"
                v-if="reset.error">
                {{ reset.error }}
            </div>
            <div 
                class="p-1 alert alert-success w-50 col-12 mx-auto rounded border text-center"
                v-if="reset.success">
                {{ reset.success }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import AuthService from '../../services/auth.service';
import { useRoute } from 'vue-router';
import debounce from 'lodash.debounce';

const SUCCESS_RESET_PASSWORD = "Password succesfully reset";
const MISMATCH_PASSWORD_ERROR = "Passwords don't match";
const FAILURE_RESET_PASSWORD = "Password reset failed";

const route = useRoute();
const resetToken = ref(route.params.token);

const reset = reactive({
  password: '',
  rePassword: '',
  error: null,
  mismatch: false,
  success: null
});

const showPassword = ref(false);
const showRepeatPassword = ref(false);
const tokenSubmitted = ref(false);

watch(reset, (val) => {
    if (!tokenSubmitted.value)
        checkPasswords(val.rePassword);
});

// Functions
const checkPasswords = debounce(async (rePassword) => {
  if (rePassword && reset.password && reset.password != rePassword){
    reset.error = MISMATCH_PASSWORD_ERROR;
    reset.mismatch = true;
  }
  else{
    reset.error = null;
    reset.mismatch = false;
  }
}, 500); // Debounce for 500ms

function resetPassword() {
    if (reset.mismatch){
        return;
    }
    if (reset.password != reset.rePassword){
        reset.error = MISMATCH_PASSWORD_ERROR;
        reset.mismatch = true;
        return;
    }

    tokenSubmitted.value = true;
    AuthService.setNewPassword(resetToken.value, reset.password).then(
    (_) => {
        reset.success = SUCCESS_RESET_PASSWORD;
        reset.error = null;
    },
    (error) => {
        reset.success = null;
        if (error.response)
            reset.error = error.response.data["detail"];
        else
            reset.error = FAILURE_RESET_PASSWORD;
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
