import { fireDB } from '~/plugins/firebase'
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore'

const contactsRef = collection(fireDB, 'contacts')

export const state = () => ({
  items: [],
  isLoading: false,
})

export const getters = {
  getContacts(state) {
    return state.items
  },
  getLoading(state) {
    return state.isLoading
  },
}

export const mutations = {
  addContact(state, action) {
    state.items.push(action)
  },
  setContacts(state, action) {
    state.items = action
  },
  setLoading(state, action) {
    state.isLoading = action
  },
  removeContact(state, action) {
    state.items = state.items.filter((item) => item.id !== action)
  },
}

export const actions = {
  async fetchContacts({ commit, getters }, { activeSort }) {
    const sorter = (activeSort) => {
      console.log(activeSort)
      if (activeSort.value === 'name') {
        const newContactsList = [...getters.getContacts].sort((a, b) =>
          a.firstName.localeCompare(b.firstName)
        )
        commit('setContacts', newContactsList)
      }
      if (activeSort.value === 'create') {
        const newContactsList = [...getters.getContacts].sort((a, b) => {
          if (a.createTime < b.createTime) {
            return 1
          }
          if (a.createTime > b.createTime) {
            return -1
          }
          return 0
        })
        commit('setContacts', newContactsList)
      }
    }
    try {
      commit('setLoading', true)
      commit('setContacts', [])
      const querySnapshot = await getDocs(contactsRef)
      querySnapshot?.forEach((doc) => {
        commit('addContact', { id: doc.id, ...doc.data() })
      })
      sorter(activeSort)
      commit('setLoading', false)
    } catch (error) {
      console.log(error.message)
    }
  },
  async createContact(_, contact) {
    try {
      await addDoc(contactsRef, contact)
    } catch (error) {
      console.log(error.message)
    }
  },
  async deleteContact({ commit }, contactId) {
    try {
      const contactDoc = await doc(fireDB, 'contacts', contactId)
      await deleteDoc(contactDoc)
      commit('removeContact', contactId)
    } catch (error) {
      console.log(error.message)
    }
  },
}
