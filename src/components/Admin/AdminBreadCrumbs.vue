<template>
  <div class="col-6 dashboard-page-head-breadcrumb pt-1 px-0">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link
            class="pb-2 px-1"
            :to="{name: 'home'}"
          >
            Home
          </router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link
            class="pb-2 px-1"
            :to="{name: 'admin'}"
          >
            Admin
          </router-link>
        </li>
        <li 
          class="breadcrumb-item active" 
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
      default: 'Recent Stories'
    }
  },
}
</script>

<style scoped lang="scss">
</style>