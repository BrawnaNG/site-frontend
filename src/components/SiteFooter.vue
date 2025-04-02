<template>
  <div class="container-fluid footer-social-media">
    <div class="row align-items-center">
      <div class="col-9 p-0">
        <img
          src="../assets/image/icon/logo-white.svg"
          class="story-logo m-2"
        >
      </div>
      <div class="col-3 p-0">
        <img
          src="../assets/image/icon/Twitter.svg"
          class="social-media-logo mx-2 align-middle"
        >
        <img
          src="../assets/image/icon/Instagram.svg"
          class="social-media-logo mx-2"
        >
        <img
          src="../assets/image/icon/Facebook.svg"
          class="social-media-logo mx-2"
        >
        <img
          src="../assets/image/icon/Youtube.svg"
          class="social-media-logo mx-2"
        >
      </div>
    </div>
  </div>
  <div class="container-fluid site-footer-content-menu mt-3">
    <div class="row justify-content-center">
      <div class="col px-2">
        <a
          href="#"
          class="text-dark"
        >
          Home
        </a>
      </div>
      <div class="col px-2">
        <a
          href="#"
          class="text-dark"
        >
          About us
        </a>
      </div>
      <div class="col px-2">
        <a
          href="#"
          class="text-dark"
        >Contact us</a>
      </div>
      <div class="col px-2">
        <a
          href="#"
          class="text-dark"
        >Privacy Policy</a>
      </div>
      <div class="col px-2">
        <a
          href="#"
          class="text-dark"
        >Terms of Use</a>
      </div>
    </div>
  </div>
  <div class="container-fluid site-footer-copy-right mt-3">
    <div class="row justify-content-between align-items-center">
      <div class="col p-2">
        Copyright © 1996-2022 Company Name
      </div>
      <div class="col p-2">
        You may not use images or content from this site without written permission.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SiteFooter"
}
</script>

<style scoped lang="scss">
.footer-social-media {
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
  height: 3vw;
  font-size: 0.84em;
  color: #707070;
}
</style>