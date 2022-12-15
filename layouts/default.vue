<template>
  <div class="app">
    <Navbar />
    <div class="content">
      <Nuxt />
    </div>
  </div>
</template>

<style lang="scss">
.app {
  @apply min-h-screen bg-bgColor;
}

.content {
  @apply w-1/2 mx-auto pt-3;
}
</style>
