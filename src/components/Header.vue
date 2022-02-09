<script setup lang='ts'>
import Modal from './Modal.vue'
import HeaderMenu from './HeaderMenu.vue'
import HeaderTittle from './HeaderTittle.vue'

</script>

<template>
  <div class="fixed w-full z-10 bg-gray-400 dark:bg-gray-900 h-16 space-x-1 px-2">
    <HeaderTittle />
    <div class="h-full py-5 float-left space-x-1">
      <HeaderMenu />
    </div>
    <Modal />
  </div>
</template>

<style scoped>
</style>
