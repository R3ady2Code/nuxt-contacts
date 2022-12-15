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
    allContacts() {
      return this.$store.getters['contacts/getContacts']
    },
  },
  methods: {
    clickToSort(sort) {
      this.$store.commit('sorts/setSort', sort)
    },
    sorter() {
      if (this.activeSort.value === 'name') {
        const newContactsList = [...this.allContacts].sort((a, b) =>
          a.firstName.localeCompare(b.firstName)
        )
        this.$store.commit('contacts/setContacts', newContactsList)
      }
      if (this.activeSort.value === 'create') {
        const newContactsList = [...this.allContacts].sort((a, b) => {
          if (a.createTime < b.createTime) {
            return 1
          }
          if (a.createTime > b.createTime) {
            return -1
          }
          return 0
        })
        this.$store.commit('contacts/setContacts', newContactsList)
      }
    },
  },
  mounted() {
    this.sorter()
    console.log()
  },
  watch: {
    activeSort() {
      this.sorter()
    },
    route() {
      this.sorter()
      console.log(111)
    },
    //доделать сортировку контактов
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
