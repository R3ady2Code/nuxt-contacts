<template>
  <div class="create-user">
    <div class="create-user__header">
      <UIButton size="lg" :onClick="clickToPrev">&lt; Prev</UIButton>
      <UIButton size="lg" :onClick="clickToCreate">Done</UIButton>
    </div>
    <div class="create-user__avatar">
      <img
        v-if="!newContact.avatar.ref"
        :src="require('../../static/default-avatar.png')"
        alt="Avatar"
        height="96"
      />
      <img v-else :src="newContact.avatar.url" alt="Avatar" height="96" />
      <UIButton :onClick="clickToInput">add photo</UIButton>
      <input
        type="file"
        ref="inputFile"
        class="hidden"
        @change="(e) => uploadAvatar(e.target.files[0])"
      />
    </div>
    <div class="create-user__head-info">
      <UIInput v-model="newContact.firstName" placeholder="First Name" />
      <UIInput v-model="newContact.lastName" placeholder="Last Name" />
      <UIInput v-model="newContact.company" placeholder="Company" />
    </div>
    <div class="create-user__phone">
      <UIInput v-model="newContact.phone" placeholder="Phone" borders />
    </div>
    <div class="mb-6">
      <UIInput v-model="newContact.email" placeholder="E-mail" borders />
    </div>
    <div class="mb-6">
      <UIInput v-model="newContact.url" placeholder="URL" borders />
    </div>
    <div class="mb-6">
      <UIInput v-model="newContact.address" placeholder="Address" borders />
    </div>
    <div class="mb-6">
      <UIInput v-model="newContact.birthday" placeholder="Birthday" borders />
    </div>
    <div class="create-user__notes">
      <textarea v-model="newContact.notes" placeholder="Notes" />
    </div>
  </div>
</template>

<script>
import { storage } from '@/plugins/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export default {
  data: () => ({
    newContact: {
      avatar: { ref: null, url: null },
      firstName: '',
      lastName: '',
      company: '',
      phone: '',
      email: '',
      url: '',
      address: '',
      birthday: '',
      notes: '',
    },
  }),
  computed: {
    async avatarUrl() {
      const result = console.log(result)
      return result
    },
  },
  methods: {
    async clickToCreate() {
      const contact = { ...this.newContact, createTime: Date.now() }
      await this.$store.dispatch('contacts/createContact', contact)
      this.$router.push('/')
    },
    clickToPrev() {
      this.$router.push('/')
    },
    clickToInput() {
      this.$refs.inputFile.click()
    },
    async uploadAvatar(file) {
      if (file) {
        const imageRef = ref(storage, `images/${file.name}`)
        await uploadBytes(imageRef, file)
        this.newContact.avatar.ref = `images/${file.name}`
        this.newContact.avatar.url = await getDownloadURL(imageRef)
      }
    },
  },
}
</script>

<style lang="scss">
.create-user {
  @apply flex flex-col pt-16 max-w-lg mx-auto;
  &__header {
    @apply flex justify-between mb-4;
  }
  &__avatar {
    @apply flex flex-col items-center cursor-pointer mb-8;
    img {
      @apply rounded-full max-h-24 mb-2;
    }
  }
  &__head-info {
    @apply flex flex-col divide-y-2 border-y-slate-400 border-y-2 mb-6;
  }
  &__phone {
    @apply mb-6;
  }
  &__notes {
    @apply w-full mb-6;
    textarea {
      @apply w-full text-lg border-y-slate-400 placeholder-slate-400 border-y-2 py-2 h-40 resize-none overflow-y-auto outline-none;
    }
  }
}
</style>
