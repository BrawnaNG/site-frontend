<template>
  <div>
    <b-col
      cols="12"
      class="footer-social-media"
    >
      <b-row class="align-items-center col-10 h-100 mx-auto justify-content-between my-0">
        <b-col
          cols="auto"
          class="p-0"
        >
          <img
            src="../assets/image/icon/logo-white.svg"
            class="story-logo"
          >
        </b-col>

        <b-col
          cols="auto"
          class="p-0"
        >
          <img
            src="../assets/image/icon/Twitter.svg"
            class="social-media-logo mr-2"
          >
          <img
            src="../assets/image/icon/Instagram.svg"
            class="social-media-logo mr-2"
          >
          <img
            src="../assets/image/icon/Facebook.svg"
            class="social-media-logo mr-2"
          >
          <img
            src="../assets/image/icon/Youtube.svg"
            class="social-media-logo"
          >
        </b-col>
      </b-row>
    </b-col>
    <b-col
      cols="12"
      class="site-footer-content px-0"
    >
      <b-col
        cols="10"
        class="h-75 mx-auto py-4"
      >
        <b-col
          cols="12"
          class="p-0"
        >
          <h3 class="site-footer-content-title mt-5">
            The Daily Good Newsletter
          </h3>
          <p class="site-footer-content-detail pt-3">
            Never miss an insight. We'll email you when new articles are published.
          </p>
        </b-col>
        <b-row class="m-0 pt-3 pb-5">
          <b-col
            cols="6"
            class="p-0"
          >
            <b-row class="join-input-wrapper m-0 p-2  border bg-white">
              <b-col
                cols="10"
                class="h-100"
              >
                <b-form-input
                  type="email"
                  class="join-input px-0 h-100 border-0"
                  placeholder="Your Email"
                />
              </b-col>
              <b-col
                cols="2"
                class="h-100 p-0"
              >
                <b-button
                  pill
                  variant="dark"
                  class="w-100 h-100"
                >
                  Join
                </b-button>
              </b-col>
            </b-row>
          </b-col>
          <b-col
            cols="6"
            class="h-100 px-0 py-3"
          >
            <b-row class="site-footer-content-menu h-100 m-0 justify-content-end">
              <b-col
                cols="auto"
                class="px-2"
              >
                <a
                  href="#"
                  class="text-dark"
                >Home</a>
              </b-col>
              <b-col
                cols="auto"
                class="px-2"
              >
                <a
                  href="#"
                  class="text-dark"
                >About us</a>
              </b-col>
              <b-col
                cols="auto"
                class="px-2"
              >
                <a
                  href="#"
                  class="text-dark"
                >Contact us</a>
              </b-col>
              <b-col
                cols="auto"
                class="px-2"
              >
                <a
                  href="#"
                  class="text-dark"
                >Privacy Policy</a>
              </b-col>
              <b-col
                cols="auto"
                class="px-2"
              >
                <a
                  href="#"
                  class="text-dark"
                >Terms of Use</a>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-col>
    </b-col>
    <b-col
      cols="12"
      class="site-footer-copy-right border-top"
    >
      <b-row class="site-footer-copy-right col-10 h-100 mx-auto my-0 justify-content-between align-items-center">
        <b-col
          cols="auto"
          class="p-0"
        >
          Copyright © 1996-2022 Company Name
        </b-col>
        <b-col
          cols="auto"
          class="p-0"
        >
          You may not use images or content from this site without written permission.
        </b-col>
      </b-row>
    </b-col>
  </div>
</template>

<script>
export default {
  name: "SiteFooter"
}
</script>

<style scoped lang="scss">
.footer-social-media {
  height: 8vw;
  background-color: black;

  .story-logo {
    height: 5vw;
  }

  .social-media-logo {
    height: 3vw;
    cursor: pointer;
  }
}
.site-footer-content {
  background-color: #F2F2F2;
  &-title {
    font-family: NotoSerif-Bold;
  }
  &-detail {
    color: #363636;
    font-size: .8em;
  }
  .join-input-wrapper {
    height: 60px;
    border-radius: 50px;
    width: 34vw;

    .join-input {

      &:focus {
        box-shadow: unset !important;

      }
    }
  }
  &-menu {
    font-size: .96em;

    a {
      text-decoration: none;
    }
  }
}
.site-footer-copy-right {
  background-color: #F2F2F2;
  height: 5vw;
  font-size: 0.84em;
  color: #707070;
}
</style>