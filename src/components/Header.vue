<script setup lang='ts'>
import Modal from './Modal.vue'
import HeaderMenu from './HeaderMenu.vue'
import HeaderTittle from './HeaderTittle.vue'
import Alert from './Alert.vue';

</script>

<template>
  <div class="fixed w-full z-10 bg-stone-900 h-16 space-x-1 px-2">
    <HeaderTittle />
    <div class="h-full float-left space-x-1">
      <HeaderMenu />
    </div>
    <Modal />
    <Alert />
  </div>
</template>

<style scoped>
</style>
