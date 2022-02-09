<script setup lang="ts">
import { onMounted } from 'vue';
import GlobalHeader from './components/Header.vue';
import { useStore } from 'vuex'
import { IState } from './store'

const store = useStore<IState>()

onMounted(() => {
  store.dispatch('keepUser')
})
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
