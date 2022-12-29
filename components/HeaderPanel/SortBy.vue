<template>
  <div class="sorts-by">
    <span>Sorts by:</span>
    <div class="sort" v-for="sort in sorts" :key="sort.id">
      <input
        type="radio"
        :value="sort.value"
        name="sort-by"
        @change.prevent="clickToSort(sort)"
        :checked="sort.value === activeSort.value"
      />
      <label>{{ sort.label }}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SortBy',
  computed: {
    activeSort() {
      return this.$store.getters['sorts/getActiveSort']
    },
    sorts() {
      return this.$store.getters['sorts/getAllSorts']
    },
  },
  methods: {
    clickToSort(sort) {
      this.$store.commit('sorts/setSort', sort)
    },
  },
  watch: {
    activeSort() {
      this.$store.dispatch('contacts/fetchContacts', {
        activeSort: this.activeSort,
      })
    },
  },
}
</script>

<style lang="scss">
.sorts-by {
  @apply flex items-center gap-2 pt-2;
  span {
    @apply mr-1;
  }
}

.sort {
  @apply flex items-center;
  input {
    @apply w-4 h-4 bg-gray-100 border-gray-300;
    &:focus {
      @apply ring-blue bg-blue;
    }
  }
  label {
    @apply ml-1 text-sm font-medium text-gray-800;
    line-height: 0.2px;
  }
}
</style>
