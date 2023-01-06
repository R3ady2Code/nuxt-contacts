<template>
  <div class="contact-page" v-if="!isLoading">
    <div class="contact-page__header">
      <UIButton size="lg" :onClick="clickToPrev">&lt; Prev</UIButton>
      <UIButton size="lg" :onClick="clickToChange">Done</UIButton>
    </div>
    <div class="contact-page__avatar-container">
      <div
        class="contact-page__avatar"
        :style="{
          'background-image': `url(${
            !changingContact.avatar.url
              ? require('../../../static/default-avatar.png')
              : changingContact.avatar.url
          })`,
        }"
      ></div>
      <UIButton :onClick="clickToInput">change photo</UIButton>
      <input
        type="file"
        ref="inputFile"
        class="hidden"
        @change="(e) => uploadAvatar(e.target.files[0])"
      />
    </div>
    <div class="contact-page__head-info">
      <UIInput v-model="changingContact.firstName" placeholder="First Name" />
      <UIInput v-model="changingContact.lastName" placeholder="Last Name" />
      <UIInput v-model="changingContact.company" placeholder="Company" />
    </div>
    <div class="contact-page__phone">
      <UIInput v-model="changingContact.phone" placeholder="Phone" borders />
    </div>
    <div class="mb-6">
      <UIInput v-model="changingContact.email" placeholder="E-mail" borders />
    </div>
    <div class="mb-6">
      <UIInput v-model="changingContact.url" placeholder="URL" borders />
    </div>
    <div class="mb-6">
      <UIInput
        v-model="changingContact.address"
        placeholder="Address"
        borders
      />
    </div>
    <div class="mb-6">
      <UIInput
        v-model="changingContact.birthday"
        placeholder="Birthday"
        borders
      />
    </div>
    <div class="contact-page__notes">
      <textarea v-model="changingContact.notes" placeholder="Notes" />
    </div>
  </div>
</template>

<script>
import { storage } from '@/plugins/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export default {
  data: () => ({
    isLoading: true,
    changingContact: null,
  }),
  async mounted() {
    await this.$store.dispatch('contact/fetchContact', this.contactId)
    this.isLoading = false
    this.changingContact = { ...this.contact }
  },
  computed: {
    contact() {
      return this.$store.getters['contact/getSelected']
    },
    contactId() {
      return this.$route.params.id
    },
  },
  methods: {
    async clickToChange() {
      await this.$store.dispatch('contacts/updateContact', {
        contact: this.changingContact,
        contactId: this.contactId,
      })
      this.$store.commit('contact/setSelected', null)
      this.$router.push('/')
    },
    clickToPrev() {
      this.$store.commit('contact/setSelected', null)
      this.$router.push('/')
    },
    clickToInput() {
      this.$refs.inputFile.click()
    },
    async uploadAvatar(file) {
      if (file) {
        const imageRef = ref(storage, `images/${file.name}`)
        await uploadBytes(imageRef, file)
        this.$set(this.changingContact, 'avatar', {
          ref: `images/${file.name}`,
          url: await getDownloadURL(imageRef),
        })
      }
    },
  },
}
</script>
