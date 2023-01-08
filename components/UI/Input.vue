<template>
  <input
    type="text"
    :value="value"
    @input="$emit('input', $event.target.value)"
    :placeholder="placeholder"
    class="ui-input"
    :class="{ 'ui-input_borders': borders }"
  />
</template>

<script>
export default {
  props: {
    value: String,
    placeholder: String,
    borders: Boolean,
  },
}
</script>

<style lang="scss">
.ui-input {
  @apply bg-bgColor border-y-slate-400  placeholder-slate-400 py-2 text-lg outline-none w-full;
  &_borders {
    @apply border-y-slate-400 border-y-2;
  }
}
</style>
