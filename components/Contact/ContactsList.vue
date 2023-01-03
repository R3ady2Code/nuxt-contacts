<template>
  <div>
    <h1 v-if="!contacts.length && isLoading">Loading...</h1>
    <transition-group
      v-if="contacts && !isLoading"
      name="contacts-list"
      tag="ul"
      class="contacts-list"
    >
      <Contact
        v-for="contact in contacts"
        :key="contact.id + contact.name"
        :contact="contact"
      />
    </transition-group>
    <h1 v-if="!contacts.length && !isLoading" class="text-center font-semibold">
      You don't have any contacts yet. Click
      <nuxt-link to="/contact/create" class="text-blue">here</nuxt-link> to
      create:)
    </h1>
  </div>
</template>

<script>
export default {
  props: {
    isBackground: Boolean,
  },
  async fetch() {
    if (!this.isBackground) {
      await this.$store.dispatch('contacts/fetchContacts')
      this.$sorter()
    }
  },
  computed: {
    isLoading() {
      return this.$store.getters['contacts/getLoading']
    },
    contacts() {
      return this.$store.getters['contacts/getContacts']
    },
    activeSort() {
      return this.$store.getters['sorts/getActiveSort']
    },
  },
}
</script>

<style lang="scss">
.contacts-list {
  @apply border-t-2 mb-3 relative;
}

.contacts-list-enter {
  opacity: 0;
  transform: translateY(40px);
}

.contacts-list-leave-to,
.contacts-list-leave-active {
  opacity: 0;
  transform: translateX(500px);
}
.contacts-list-leave-active {
  position: absolute;
}
</style>
