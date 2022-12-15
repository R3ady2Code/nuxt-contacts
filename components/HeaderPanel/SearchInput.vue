<template>
  <div class="search-input">
    <input type="text" placeholder="Search by name..." />
    <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
  </div>
</template>

<script>
export default {
  name: 'SearchInput',
}
</script>

<style lang="scss">
.search-input {
  @apply w-full border border-2 bg-transparent border-primary rounded-3xl text-xl py-3 px-5 flex items-center;
  input {
    @apply w-full outline-none;
  }
  .fa-magnifying-glass {
    @apply text-secondary text-lg;
  }
}
</style>
