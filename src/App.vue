<script setup lang="ts">
import GlobalHeader from './components/GlobalHeader.vue';
import Minimap from './components/Minimap.vue'
</script>

<template>
  <GlobalHeader />
  <div class="grid grid-cols-6 gap-2">
    <div>
      <Minimap />
    </div>
    <div class="px-2 lg:col-span-5 col-span-full">
      <div
        class="container relative mt-20 mb-8 mx-auto min-h-screen max-w-[21cm] bg-white dark:bg-[#2e3440] shadow shadow-gray-300 rounded overflow-hidden"
      >
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
