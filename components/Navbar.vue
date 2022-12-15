<template>
  <nav class="navigation">
    <nuxt-link to="/">
      <h1 class="navigation__logo">Contacts</h1>
    </nuxt-link>
    <a
      href="https://github.com/READY2C0DE"
      target="_blank"
      class="navigation__icon"
    >
      <font-awesome-icon icon="fa-brands fa-github" />
    </a>
  </nav>
</template>

<script>
export default {}
</script>

<style lang="scss">
.navigation {
  @apply p-3 flex items-center shadow-lg bg-primary fixed w-full z-10;
  &__logo {
    @apply text-xl font-semibold text-bgColor;
  }
  &__icon {
    @apply ml-auto;
  }
}

.fa-github {
  @apply transition-all text-bgColor hover:text-secondary;
  font-size: 2rem !important;
}
</style>
