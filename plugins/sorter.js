export default ({ store }, inject) => {
  inject('sorter', () => {
    const contacts = [...store.getters['contacts/getContacts']]
    const { value: activeSort } = { ...store.getters['sorts/getActiveSort'] }
    if (activeSort === 'name') {
      const newContactsList = contacts.sort((a, b) =>
        a.firstName.localeCompare(b.firstName)
      )
      store.commit('contacts/setContacts', newContactsList)
    }
    if (activeSort === 'create') {
      const newContactsList = contacts.sort((a, b) => {
        if (a.createTime < b.createTime) {
          return 1
        }
        if (a.createTime > b.createTime) {
          return -1
        }
        return 0
      })
      store.commit('contacts/setContacts', newContactsList)
    }
  })
}
