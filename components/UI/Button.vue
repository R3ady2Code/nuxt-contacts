<template>
  <button class="ui-button" :class="'text-' + size" @click.prevent="onClick">
    <span>
      <slot />
    </span>
  </button>
</template>

<script>
export default {
  props: {
    size: String,
    onClick: Function,
  },
}
</script>

<style lang="scss">
.ui-button {
  @apply flex flex-col items-center cursor-pointer;
  span {
    @apply text-blue transition-all;
  }
  &:hover {
    span {
      @apply text-sky-700;
    }
  }
}
</style>
