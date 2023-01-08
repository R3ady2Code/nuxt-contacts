<template>
  <div class="contact-page">
    <div class="contact-page__header">
      <UIButton size="lg" :onClick="clickToPrev">&lt; Prev</UIButton>
      <UIButton size="lg" :onClick="clickToCreate">Done</UIButton>
    </div>
    <div class="contact-page__avatar-container" @click="clickToInput">
      <div
        class="contact-page__avatar"
        :style="{
          'background-image': `url(${
            !newContact.avatar.url
              ? require('../../static/default-avatar.png')
              : newContact.avatar.url
          })`,
        }"
      ></div>
      <button class="ui-button">
        <span ref="spanBtnPhoto"> add photo </span>
      </button>
      <input
        type="file"
        ref="inputFile"
        class="hidden"
        @change="(e) => uploadAvatar(e.target.files[0])"
      />
    </div>
    <div class="contact-page__head-info">
      <UIInput v-model="newContact.firstName" placeholder="First Name" />
      <UIInput v-model="newContact.lastName" placeholder="Last Name" />
      <UIInput v-model="newContact.company" placeholder="Company" />
    </div>

    <div class="contact-page__phone">
      <client-only>
        <phone-mask-input
          v-model="newContact.phone"
          autoDetectCountry
          showFlag
          placeholder="Phone"
          wrapperClass="wrapper-input-phone ui-input_borders"
          inputClass="ui-input"
          flagClass="flag-input-phone"
        />
      </client-only>
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
    <div class="contact-page__notes">
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
    btnSpan: 'add photo',
  }),
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
        this.$set(this.newContact, 'avatar', {
          ref: `images/${file.name}`,
          url: await getDownloadURL(imageRef),
        })
        this.$refs.spanBtnPhoto.innerHTML = 'change photo'
      }
    },
  },
}
</script>

<style lang="scss">
.contact-page {
  @apply flex flex-col pt-16 max-w-lg mx-auto;
  &__header {
    @apply flex justify-between mb-4;
  }
  &__avatar {
    @apply w-20 h-20 rounded-full mr-2 relative mb-2;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
  }
  &__avatar-container {
    @apply flex flex-col items-center cursor-pointer mb-8;
    &:hover {
      .ui-button {
        span {
          @apply text-sky-700;
        }
      }
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

.wrapper-input-phone {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
