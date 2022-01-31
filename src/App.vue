<script setup lang="ts">
import GlobalHeader from './components/Header.vue';
import Minimap from './components/Minimap.vue'
import Test from './components/Test.vue'
</script>

<template>
  <div class="h-screen overflow-hidden">
    <GlobalHeader />
    <div class="h-16"></div>
    <div class="h-full">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
</style>
