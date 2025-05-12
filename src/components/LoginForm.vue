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
          @click="showPassword = !showPassword "
        >
      </div>
    </div>
    <div class="row">
      <button
        pill
        variant="dark"
        class="story-default-btn font-weight-bold w-50 py-2 my-3 mx-auto"
        @click="loginUser()"
      >
        Login
      </button>
    </div>
    <div 
      class="row"
      v-if="errorMessage"
      >
      <span class="text-danger">
        {{  errorMessage }}
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
          @click="view='signup'"
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
          @click="showPassword = !showPassword "
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
          @click="showRepeatPassword = !showRepeatPassword "
        >
      </div>
    </div>
    <div class="row mt-3">
      <div class="login-form-sub-title text-center">
        <input type="checkbox">
        I have read and I accept the
        <span class="cursor-pointer">terms</span>
        and
        <span class="cursor-pointer">conditions</span>.
      </div>
    </div>
    <div class="row">
      <button
        pill
        variant="dark"
        class="story-default-btn w-100 py-2 my-3 font-weight-bold"
        @click="signUpUser()"
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
      class="row"
      v-if="errorMessage"
      >
      <span class="text-danger">
        {{  errorMessage }}
      </span>
    </div>
  </div>
</template>

<script>
import AuthService from '../services/auth.service';
import { useAuthStore } from '../stores/auth';

export default {
  name: "LoginForm",
  emits: ['closeLogin','changeFormState'],
  data() {
    return {
      login: {
        username: '',
        password: '',
      },
      signUp: {
        alias: '',
        username: '',
        email: '',
        password: '',
        rePassword: ''
      },
      view: 'login',
      showPassword: false,
      showRepeatPassword: false,
      errorMessage: ''
    }
  },
  watch: {
    'view'(val) {
      this.$emit('changeFormState', val)
    }
  },
  methods: {
    loginUser() {
      this.errorMessage = null;
      let user = {
        username: this.login.username,
        password: this.login.password
      };
      const authStore = useAuthStore();
      AuthService.login(authStore, user).then(
        (_response) => {
          this.$emit('closeLogin');
        },
        (_error) => {
          this.errorMessage = "Login failed";
        }
      );
    },
    signUpUser() {
      this.errorMessage = null;
      let user = {
        alias: this.signUp.alias,
        username: this.signUp.username,
        email: this.signUp.email,
        password: this.signUp.password
      };
      const authStore = useAuthStore();
      AuthService.register(authStore, user).then(
        (_response) => {
          //TODO DISPLAY SUCCESS / WAIT FOR VERIFICATION MESSAGE
          this.$emit('closeLogin');
        },
        (_error) => {
          this.errorMessage = "Sign up failed";
        }
      );
    }
  }
}
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
