<script setup lang="ts">
import GlobalHeader from './components/GlobalHeader.vue';

</script>

<template>
  <GlobalHeader />
  <div class="container my-2 mx-auto min-h-screen max-w-[21cm] bg-white dark:bg-[#2e3440] shadow shadow-gray-300 rounded overflow-hidden">
    <router-view></router-view>
  </div>
</template>

<style scoped>
</style>
