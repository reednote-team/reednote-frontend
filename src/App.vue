<script setup lang="ts">
import { onMounted } from 'vue';
import GlobalHeader from './components/Header.vue';
import { useStore } from 'vuex'
import { IState } from './store'
import axios from 'axios';
import { useRouter } from 'vue-router';

const store = useStore<IState>()
const router = useRouter()

axios.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (error.response.status === 401) {
    router.push('/R401!force')
  }
  return Promise.reject(error)
})

onMounted(() => {
  store.dispatch('keepUser')
})
</script>

<template>
  <div class="h-screen overflow-hidden">
    <GlobalHeader />
    <div class="h-16"></div>
    <div class="h-full overflow-scroll">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
</style>
