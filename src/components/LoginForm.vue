<template>
  <div
    v-if="view === 'login'"
    class="login-form container p-3"
  >
    <div class="row">
      <p class="login-form-title m-0 pb-3 p-1">
        Enter your username and password.
      </p>
    </div>
    <div class="row">
      <div class="rounded border p-1">
        <input
          v-model="login.username"
          type="text"
          class="border-0 login-form-input form-control"      
          placeholder="Enter your username"
        >
      </div>
    </div>
    <div class="row mt-3">
      <div class="col rounded border p-1 col-10">
        <input
          v-model="login.password"
          :type="showPassword ? 'text' : 'password'"
          class="border-0 login-form-input form-control"
          placeholder="Enter your password"
        >
      </div>
      <div class="col text-right col-2 pt-1">
        <img
          title="show password"
          class="cursor-pointer"
          src="../assets/image/icon/Show.svg"
          @click="showPassword = !showPassword"
        >
      </div>
    </div>
    <div class="row">
      <button
        pill
        variant="dark"
        class="story-default-btn font-weight-bold w-50 py-2 my-3 mx-auto"
        @click="loginUser"
      >
        Login
      </button>
    </div>
    <div 
      class="row"
      v-if="errorMessage"
      >
      <span class="text-danger">
        {{ errorMessage }}
      </span>
    </div>
    <div class="row login-form-sub-title text-center">
      <div class="col c-6">
        <span>
          Don't have an account?
        </span>
      </div>
      <div class="col-6">
        <span
          class="cursor-pointer"
          @click="view = 'signup'"
        >
          Sign up here.
        </span>
      </div>
    </div>
  </div>

  <div
    v-if="view === 'signup'"
    class="login-form container"
  >
    <div class="row">
      <div class="rounded border p-1">
        <input
          v-model="signUp.alias"
          type="text"
          class="border-0 login-form-input form-control"
          placeholder="Enter your display name"
        >
      </div>
    </div>
    <div class="row mt-3">
      <div class="rounded border p-1">
        <input
          v-model="signUp.username"
          type="text"        
          class="border-0 login-form-input form-control"
          placeholder="Enter your username"
        >
      </div>
      <div class="p-0 pt-2"
        v-if="signUp.error.username">
        <div 
          class="alert alert-danger p-1 ps-3"
          v-for="error in signUp.error.username"
        >
          {{ cleanError(error) }}
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <div class="rounded border p-1">
        <input
          v-model="signUp.email"
          class="border-0 login-form-input form-control"
          type="email"
          placeholder="Enter your email"
        >
      </div>
      <div 
        class="p-0 pt-2"
        v-if="signUp.error.email">
        <div 
          class="alert alert-danger p-1 ps-3"
          v-for="error in signUp.error.email"
        >
          {{ cleanError(error) }}
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col col-10 p-1 rounded border">
        <input
          v-model="signUp.password"
          :type="showPassword ? 'text' : 'password'"
          class="border-0 login-form-input form-control"
          placeholder="Enter your password"
        >
      </div>
      <div class="col text-right col-2 pt-1">
        <img
          title="show password"
          class="cursor-pointer"
          src="../assets/image/icon/Show.svg"
          @click="showPassword = !showPassword"
        >
      </div>
    </div>
    <div class="row mt-3">
      <div class="col rounded border col-10 p-1">
        <input
          v-model="signUp.rePassword"
          :type="showRepeatPassword ? 'text' : 'password'"
          class="border-0 login-form-input form-control"
          placeholder="Enter your password again"
        >
      </div>
      <div class="col col-2 text-right pr-2 pt-1">
        <img
          title="show password"
          class="cursor-pointer"
          src="../assets/image/icon/Show.svg"
          @click="showRepeatPassword = !showRepeatPassword"
        >
      </div>
      <div 
        class="p-0 pt-2"
        v-if="signUp.error.password">
        <div 
          class="alert alert-danger p-1 ps-3"
          v-for="error in signUp.error.password"
        >
          {{ cleanError(error) }}
        </div>
      </div>

    </div>
    <div class="row mt-3">
      <div class="login-form-sub-title text-center">
        <input 
          type="checkbox"
          v-model="signUp.termsAgreed"
          >
        I have read and I accept the
        <span class="cursor-pointer">terms</span>
        and
        <span class="cursor-pointer">conditions</span>.
      </div>
      <div 
        class="p-0 pt-2 ps-4 pe-4"
        v-if="signUp.error.terms">
        <div 
          class="alert alert-danger p-1 ps-4 pe-4"
          v-for="error in signUp.error.terms"
        >
          {{ cleanError(error) }}
        </div>
      </div>
    </div>
    <div class="row">
      <button
        pill
        variant="dark"
        class="story-default-btn w-100 py-2 my-3 font-weight-bold"
        @click="signUpUser"
      >
        Sign up
      </button>
    </div>
    <div class="row">
      <div class="login-form-sub-title text-center">
        Are you a member?
        <span
          class="cursor-pointer"
          @click="view = 'login'"
        >Login here</span>
      </div>
    </div>
    <div 
      class="row pt-1 pb-0"
      v-if="errorMessage"
      >
      <span class="alert alert-danger p-1 ps-3 pe-3">
        {{ errorMessage }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import AuthService from '../services/auth.service';
import { useAuthStore } from '../stores/auth';
import debounce from 'lodash.debounce';

const MISMATCH_PASSWORD_ERROR = "Passwords don't match";
const TERMS_ERROR = "Please read and agree to the terms and conditions";
const SIGNUP_ERROR = "Sign up failed";

const emit = defineEmits(['closeLogin','changeFormState']);

// Reactive state
const login = reactive({
  username: '',
  password: '',
});

const signUp = reactive({
  alias: '',
  username: '',
  email: '',
  password: '',
  rePassword: '',
  error: {},
  mismatch: false,
  termsAgreed: false
});

const view = ref('login');
const showPassword = ref(false);
const showRepeatPassword = ref(false);
const errorMessage = ref('');

const checkPasswords = debounce(async (rePassword) => {
  if (signUp.password != rePassword){
    if (!signUp.mismatch){
      if (!signUp.error["password"])
        signUp.error["password"] = [MISMATCH_PASSWORD_ERROR];
      else
        signUp.error["password"].push(MISMATCH_PASSWORD_ERROR);
      signUp.mismatch = true;
    }
  }
  else{
    if (signUp.mismatch){
      signUp.error["password"].pop();
      signUp.mismatch = false;
    }
  }
}, 500); // Debounce for 500ms

watch(signUp, (val) => {
  checkPasswords(val.rePassword);
  checkTerms();
});

watch(login, (val) => {
  emit('changeFormState', val)
});

// Methods
const checkTerms = () => {
  if (signUp.termsAgreed){
    signUp.error["terms"] = null;
  }
}

const loginUser = () => {
  errorMessage.value = null;
  const user = {
    username: login.username,
    password: login.password
  };
  const authStore = useAuthStore();
  AuthService.login(authStore, user).then(
    (_response) => {
      emit('closeLogin');
    },
    (_error) => {
      errorMessage.value = "Login failed";
    }
  );
};

const signUpUser = () => {
  if (signUp.mismatch){
    return;
  }

  if (signUp.password != signUp.rePassword){
    if (!signUp.mismatch){
      if (!signUp.error["password"])
        signUp.error["password"] = [MISMATCH_PASSWORD_ERROR];
      else
        signUp.error["password"].push(MISMATCH_PASSWORD_ERROR);
      signUp.mismatch = true;
    }
    return;
  }

  if (!signUp.termsAgreed){
    signUp.error["terms"] = [TERMS_ERROR]
    return;
  }

  errorMessage.value = null;
  signUp.error = {};
  const user = {
    alias: signUp.alias,
    username: signUp.username,
    email: signUp.email,
    password: signUp.password
  };
  const authStore = useAuthStore();
  AuthService.register(authStore, user).then(
    (_response) => {
      signUp.email = '';
      signUp.alias = '';
      signUp.username = '';
      signUp.password = '';
      signUp.rePassword = '';
      signUp.error = {};
      signUp.termsAgreed = false;
      signUp.mismatch = false;
      view.value = 'login';
      emit('closeLogin');
    },
    (error) => {
      signUp.error = error.response.data;
      errorMessage.value = SIGNUP_ERROR;
    }
  );
};

const cleanError = (originalError) => {
  return originalError.replace(/[\[\]\"\']/g, "");
};
</script>

<style scoped lang="scss">
  .cursor-pointer {
    cursor: pointer;
  }
  .login-form {
    &-title {
      font-size: .8em;
    }
    &-input {
      font-size: .8em;
      &:focus {
        outline: unset;
        box-shadow: unset;
      }

    }
    &-detail {
      span, a {
        font-size: .8em;
        color: #707070;
      }

    }
    &-sub-title {
      font-size: .9em;
      color: #707070;
      span {
        color: black;
      }
    }
}
</style>
