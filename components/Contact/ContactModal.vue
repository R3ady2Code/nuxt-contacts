<template>
  <div
    class="fixed top-0 left-0 w-full h-screen bg-opacity-50 bg-black z-50 flex items-center justify-center"
    @click="clickToClose"
  >
    <h1 v-if="isLoading">Loading</h1>
    <div v-if="!isLoading && contact" class="contact-modal" @click.stop="">
      <div class="contact-modal__header">
        <UIButton :onClick="clickToClose">
          <font-awesome-icon icon="fa-solid fa-xmark" />
        </UIButton>
        <UIButton class="change-btn" size="lg"> Change </UIButton>
      </div>
      <div class="contact-modal__avatar">
        <img :src="require('../../static/default-avatar.png')" alt="Avatar" />
        <h2 v-if="!contact.lastName">{{ contact.firstName }}</h2>
        <h2 v-if="contact.lastName.length">
          {{ contact.firstName + ' ' + contact.lastName }}
        </h2>
        <span v-if="contact.company">{{ contact.company }}</span>
      </div>
      <div class="contact-modal__buttons">
        <a
          :href="`tel:${contact.phone}`"
          class="modal-button modal-button__phone"
        >
          <font-awesome-icon icon="fa-solid fa-phone" />
          <span>Call</span>
        </a>
        <button class="modal-button modal-button__star">
          <font-awesome-icon icon="fa-solid fa-star" />
          <span>Favorite</span>
        </button>
        <button class="modal-button modal-button__hand">
          <font-awesome-icon icon="fa-solid fa-hand" />
          <span>Block</span>
        </button>
        <button class="modal-button modal-button__xmark" @click="clickToDelete">
          <font-awesome-icon icon="fa-solid fa-circle-xmark" />
          <span>Delete</span>
        </button>
      </div>
      <div class="contact-modal__blocks">
        <div v-if="contact.phone" class="contact-modal__block">
          <span>telephone</span>
          <h3>{{ contact.phone }}</h3>
        </div>
        <div v-if="contact.email" class="contact-modal__block">
          <span>e-mail</span>
          <h3>{{ contact.email }}</h3>
        </div>
        <div v-if="contact.address" class="contact-modal__block">
          <span>address</span>
          <h3>{{ contact.address }}</h3>
        </div>
        <div v-if="contact.birthday" class="contact-modal__block">
          <span>birthday</span>
          <h3>{{ contact.birthday }}</h3>
        </div>
        <div
          v-if="contact.notes"
          class="contact-modal__block contact-modal__block_notes"
        >
          <span>notes</span>
          <h3>{{ contact.notes }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async mounted() {
    await this.$store.dispatch('contact/fetchContact', this.contactId)
  },
  computed: {
    contact() {
      return this.$store.getters['contact/getSelected']
    },
    isLoading() {
      return this.$store.getters['contact/isLoading']
    },
    contactId() {
      return this.$route.params.id
    },
  },
  methods: {
    clickToClose() {
      this.$router.push('/')
    },
    clickToFavorite() {},
    clickToBlock() {},
    async clickToDelete() {
      console.log(this.contactId)
      await this.$store.dispatch('contacts/deleteContact', this.contactId)
      this.clickToClose()
    },
  },
}
</script>

<style lang="scss" scoped>
.contact-modal {
  @apply p-5 bg-bgColor rounded-lg w-1/3;
  animation-duration: 0.4s;
  animation-name: slide-up;
  &__header {
    @apply flex items-center justify-between;
    .fa-xmark {
      @apply text-slate-300;
    }
    .change-btn {
      @apply pb-1;
    }
  }
  &__avatar {
    @apply mb-2 flex flex-col items-center gap-1;
    img {
      @apply mx-auto rounded-full max-h-20;
    }
    h2 {
      @apply text-xl text-slate-800 font-semibold;
    }
    span {
      @apply font-extralight text-slate-500;
    }
  }
  &__buttons {
    @apply grid grid-cols-4 gap-2 mb-3;
  }
  &__blocks {
    @apply flex flex-col gap-2;
  }
  &__block {
    @apply bg-bgColor border shadow text-slate-800 rounded-lg p-2 overflow-hidden;
    span {
      @apply text-sm  font-light;
    }
    h3 {
      @apply font-medium truncate;
    }
  }
}

.modal-button {
  @apply flex flex-col items-center p-2 pt-3 rounded-lg gap-1 bg-bgColor border shadow text-slate-800;
  &__phone {
    &:hover {
      .fa-phone {
        @apply text-primary;
      }
      span {
        @apply text-primary;
      }
    }
  }
  &__star {
    &:hover {
      .fa-star {
        @apply text-yellow-400;
      }
      span {
        @apply text-yellow-400;
      }
    }
    &_active {
      .fa-star {
        @apply text-yellow-400;
      }
      span {
        @apply text-yellow-400;
      }
    }
  }
  &__hand {
    &:hover {
      .fa-hand {
        @apply text-red-600;
      }
      span {
        @apply text-red-600;
      }
    }
    &_active {
      .fa-hand {
        @apply text-red-600;
      }
      span {
        @apply text-red-600;
      }
    }
  }
  &__xmark {
    &:hover {
      .fa-circle-xmark {
        @apply text-neutral-700;
      }
      span {
        @apply text-neutral-700;
      }
    }
  }
  .fa-phone,
  .fa-star,
  .fa-circle-xmark,
  .fa-hand,
  span {
    @apply transition-all;
  }
}

.fa-xmark {
  @apply text-3xl text-slate-200 transition-all;
  &:hover {
    @apply text-slate-500;
  }
}

@keyframes slide-up {
  from {
    margin-top: 600px;
    opacity: 0.3;
  }

  to {
    margin-top: 0;
    opacity: 1;
  }
}
</style>
