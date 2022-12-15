<template>
  <div class="pt-14">
    <HeaderPanel />
    <ContactsList :isBackground="isBackground" />
  </div>
</template>

<script>
export default {
  props: ['isBackground'],
}
</script>
