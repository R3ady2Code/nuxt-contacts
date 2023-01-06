import { fireDB } from '~/plugins/firebase'
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from 'firebase/firestore'

const contactsRef = collection(fireDB, 'contacts')

export const strict = false

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
  async fetchContacts({ commit, getters }) {
    try {
      commit('setLoading', true)
      commit('setContacts', [])
      const querySnapshot = await getDocs(contactsRef)
      querySnapshot?.forEach((doc) => {
        commit('addContact', { id: doc.id, ...doc.data() })
      })
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
  async updateContact(_, { contact, contactId }) {
    try {
      console.log(contactId)
      const contactDoc = await doc(fireDB, 'contacts', contactId)
      await updateDoc(contactDoc, contact)
    } catch (error) {}
  },
}
