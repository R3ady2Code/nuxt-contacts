export const state = () => ({
  sorts: [
    { id: 1, value: 'name', label: 'name' },
    { id: 2, value: 'create', label: 'created date' },
  ],
  sortBy: { id: 1, value: 'name', label: 'name' },
})

export const getters = {
  getAllSorts(state) {
    return state.sorts
  },
  getActiveSort(state) {
    return state.sortBy
  },
}

export const mutations = {
  setSort(state, action) {
    state.sortBy = action
  },
}
