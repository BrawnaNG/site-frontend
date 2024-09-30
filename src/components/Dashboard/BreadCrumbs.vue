<template>
  <div class="col-6 dashboard-page-head-breadcrumb pt-2 px-0">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link
            class="pr-1"
            :to="{name: 'home'}"
          >
            Home
          </router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link
            class="px-1"
            :to="{name: 'dashboard'}"
          >
            Dashboard
          </router-link>
        </li>
        <li 
          class="breadcrumb-item active pl-1" 
          aria-current="page"
        >
          {{ label }}
        </li>
      </ol>
    </nav>
  </div>
</template>
  
<script>
export default {
  name: "BreadCrumbs",
  props: {
    label: {
      type: String,
      default: 'Your Stories'
    }
  },
}
</script>

<style scoped lang="scss">
</style>