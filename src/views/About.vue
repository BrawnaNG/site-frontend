<template>
  <div class="container-fluid about-wrapper">
    <div class="row">
      <div class="col">
        <h1 class="about-head-title bold">
          About
        </h1>
      </div>
    </div>
    <div class="row">
      <VueMarkdown :markdown="markdown"/>
    </div>
  </div>
</template>

<script>
import { VueMarkdown } from "@crazydos/vue-markdown";
const markdownFileContent = (await import(`../assets/markdown/about.md?raw`)).default;
export default {
  name: 'AboutView',
  components: {VueMarkdown},
  data() {
    return {
      markdown: markdownFileContent
    }
  }
}
</script>
<style scoped lang="scss">
.about-wrapper {
  padding-right: 5%;
  padding-left: 5%;
  padding-top: 2%;

  .about-head {
    &-title {
      font-size: 6em;
    }
  }
}
</style>