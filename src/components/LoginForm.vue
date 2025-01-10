<template>
  <div class="p-3">
    <div
      v-if="view === 'login'"
      class="login-form"
    >
      <p class="login-form-title m-0 pb-3">
        Enter your username and password.
      </p>
      <div class="p-1 rounded border">
        <b-form-input
          v-model="login.username"
          class="border-0 login-form-input"
          placeholder="Email or username"
        />
      </div>
      <b-row class="p-1 m-0 rounded border mt-3">
        <b-col
          cols="10"
          class="px-0"
        >
          <b-form-input
            v-model="login.password"
            :type="showPassword ? 'text' : 'password'"
            class="border-0 login-form-input"
            placeholder="Password"
          />
        </b-col>
        <b-col
          cols="2"
          class="text-right pr-2 pt-1"
        >
          <img
            title="show password"
            class="cursor-pointer"
            src="../assets/image/icon/Show.svg"
            @click="showPassword = !showPassword "
          >
        </b-col>
      </b-row>
      <b-row class="m-0 px-1 login-form-detail justify-content-between py-3">
        <div class="remember">
          <input
            type="checkbox"
            class="mr-2"
          >
          <span>Remember me.</span>
        </div>
        <a class="forgot">Forgot Password?</a>
      </b-row>
      <b-button
        pill
        variant="dark"
        class="story-default-btn w-100 py-2 my-3 font-weight-bold"
        @click="loginUser()"
      >
        Login
      </b-button>
      <div class="login-form-sub-title text-center">
        Haven't any account?
        <span
          class="cursor-pointer"
          @click="view = 'signup'"
        >
          Sign up here.
        </span>
      </div>
    </div>
    <div
      v-if="view === 'signup'"
      class="login-form"
    >
      <div class="p-1 rounded border">
        <b-form-input
          v-model="signUp.alias"
          class="border-0 login-form-input"
          placeholder="Your Name"
        />
      </div>
      <div class="p-1 rounded border mt-3">
        <b-form-input
          v-model="signUp.username"
          class="border-0 login-form-input"
          placeholder="Username"
        />
      </div>
      <div class="p-1 rounded border mt-3">
        <b-form-input
          v-model="signUp.email"
          class="border-0 login-form-input"
          type="email"
          placeholder="Email"
        />
      </div>
      <b-row class="p-1 m-0 rounded border mt-3">
        <b-col
          cols="10"
          class="px-0"
        >
          <b-form-input
            v-model="signUp.password"
            :type="showPassword ? 'text' : 'password'"
            class="border-0 login-form-input"
            placeholder="Password"
          />
        </b-col>
        <b-col
          cols="2"
          class="text-right pr-2 pt-1"
        >
          <img
            title="show password"
            class="cursor-pointer"
            src="../assets/image/icon/Show.svg"
            @click="showPassword = !showPassword "
          >
        </b-col>
      </b-row>
      <b-row class="p-1 m-0 rounded border mt-3">
        <b-col
          cols="10"
          class="px-0"
        >
          <b-form-input
            v-model="signUp.rePassword"
            :type="showRepeatPassword ? 'text' : 'password'"
            class="border-0 login-form-input"
            placeholder="Repeat Password"
          />
        </b-col>
        <b-col
          cols="2"
          class="text-right pr-2 pt-1"
        >
          <img
            title="show password"
            class="cursor-pointer"
            src="../assets/image/icon/Show.svg"
            @click="showRepeatPassword = !showRepeatPassword "
          >
        </b-col>
      </b-row>

      <div class="login-form-sub-title text-center pt-3">
        <input type="checkbox">
        I have read and I accept the
        <span class="cursor-pointer">terms</span>
        and
        <span class="cursor-pointer">conditions</span>.
      </div>
      <b-button
        pill
        variant="dark"
        class="story-default-btn w-100 py-2 my-3 font-weight-bold"
        @click="signUpUser()"
      >
        Sign up
      </b-button>
      <div class="login-form-sub-title text-center">
        Are you a member?
        <span
          class="cursor-pointer"
          @click="view = 'login'"
        >Login here</span>
      </div>
    </div>
  </div>
</template>

<script>
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
      showRepeatPassword: false
    }
  },
  watch: {
    'view'(val) {
      this.$emit('changeFormState', val)
    }
  },
  methods: {
    loginUser() {
      let user = {
        username: this.login.username,
        password: this.login.password
      };
      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$store.dispatch("auth/refreshRole");
          this.$emit('closeLogin')
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
    signUpUser() {
      let user = {
        alias: this.signUp.alias,
        username: this.signUp.username,
        email: this.signUp.email,
        password: this.signUp.password
      };
      this.$store.dispatch("auth/register", user).then(
        (data) => {
        this.view = 'login'
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
          this.loading = false;
        });
      }
  }
}
</script>

<style scoped lang="scss">
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