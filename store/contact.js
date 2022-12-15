import { fireDB } from '~/plugins/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

export const state = () => ({
  selected: null,
  isLoading: false,
})

export const getters = {
  getSelected(state) {
    return state.selected
  },
  getLoading(state) {
    return state.isLoading
  },
}

export const mutations = {
  setSelected(state, action) {
    state.selected = action
  },
  setLoading(state, action) {
    state.isLoading = action
  },
}

export const actions = {
  async fetchContact({ commit }, contactId) {
    try {
      commit('setLoading', true)
      const contactDoc = await doc(fireDB, 'contacts', contactId)
      const contact = await getDoc(contactDoc)
      commit('setSelected', contact.data())
      commit('setLoading', false)
    } catch (error) {
      console.log(error.message)
    }
  },
}
