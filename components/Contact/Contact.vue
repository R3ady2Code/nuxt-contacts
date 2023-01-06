<template>
  <li class="contact contacts-list-item" @click="onClickToContact">
    <div
      class="contact__avatar"
      :style="{
        'background-image': `url(${
          !contact.avatar.url
            ? require('../../static/default-avatar.png')
            : contact.avatar.url
        })`,
      }"
    ></div>
    <h3 :class="{ 'font-semibold': !contact.lastName }" class="mr-1">
      {{ contact.firstName }}
    </h3>
    <h3 :class="{ 'font-semibold': contact.lastName }">
      {{ contact.lastName }}
    </h3>
    <a @click.stop="" :href="`tel:${contact.phone}`" class="contact__phone">
      <font-awesome-icon icon="fa-solid fa-phone" />
    </a>
    <button @click.stop="onClickToDelete">
      <span>
        <font-awesome-icon icon="fa-solid fa-xmark" />
      </span>
    </button>
  </li>
</template>

<script>
export default {
  props: ['contact'],
  methods: {
    onClickToDelete() {
      this.$store.dispatch('contacts/deleteContact', this.contact.id)
    },
    onClickToContact() {
      this.$router.push(`/contact/${this.contact.id}`)
    },
  },
}
</script>

<style lang="scss" scoped>
.contact {
  @apply flex items-center border-b-2 p-2 transition-all duration-100 cursor-pointer;
  &__avatar {
    @apply w-10 h-10 rounded-full mr-2 relative;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    img {
      @apply w-auto h-full absolute;
    }
  }
  &:hover {
    @apply bg-gray-200;
  }
}

.contact__phone {
  @apply ml-auto transition-all text-primary text-2xl pb-[2px];
  &:hover {
    @apply text-secondary;
  }
}

.contacts-list-item {
  transition: all 0.5s;
}

.fa-xmark {
  @apply text-4xl text-red-600 ml-3;
  &:hover {
    @apply text-red-800;
  }
}
</style>
