<template>
  <div class="header-panel">
    <nuxt-link to="/contact/create">
      <button
        class="add-button"
        @mouseenter="isMouseOnButton = true"
        @mouseleave="isMouseOnButton = false"
      >
        <font-awesome-icon icon="fa-solid fa-plus" />
        <Transition name="fade-span">
          <span v-if="isMouseOnButton">add contact</span>
        </Transition>
      </button>
    </nuxt-link>
    <SearchInput />
    <SortBy />
  </div>
</template>

<script>
export default {
  data: () => ({
    isMouseOnButton: false,
  }),
}
</script>

<style lang="scss">
.header-panel {
  @apply mb-3;
}

.add-button {
  @apply w-10 h-10 ml-auto mb-3 bg-bgColor border-2 border-blue rounded-full flex items-center gap-1 justify-center text-2xl text-blue transition-all duration-300 hover:bg-blue hover:text-bgColor hover:w-40;
  span {
    @apply text-lg pb-[2px] whitespace-nowrap;
  }
}

.fade-span-enter-active {
  transition: all 0.2s ease-out;
}

.fade-span-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-span-enter-from,
.fade-span-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.fade-span-leave-to {
  position: absolute;
}
</style>
