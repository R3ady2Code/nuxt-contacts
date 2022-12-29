<template>
  <div>
    <h1 v-if="!contacts.length && isLoading">Loading...</h1>
    <TransitionGroup
      v-if="contacts && !isLoading"
      name="list"
      tag="ul"
      class="contacts-list"
      :duration="1000"
    >
      <Contact
        v-for="contact in contacts"
        :key="contact.id"
        :contact="contact"
      />
    </TransitionGroup>
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
      await this.$store.dispatch('contacts/fetchContacts', {
        activeSort: this.$store.getters['sorts/getActiveSort'],
      })
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
  @apply border-t-2 mb-3;
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease-in-out;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

.list-leave-active {
  position: absolute;
}
</style>
