<script setup lang='ts'>
import logo from '../assets/logo.png'
</script>

<template>
  <router-link
    to="/"
    class="ml-1 mr-2 mt-2 text-gray-100 text-xl font-bold float-left cursor-pointer"
  >
    <img :src="logo" class="inline-block h-12 w-12" />
    <span class="ml-2 relative top-1 hidden md:inline-block">Reednote</span>
  </router-link>
</template>

<style scoped>
</style>
