<script setup lang="ts">
import { onMounted } from 'vue';
import GlobalHeader from './components/Header.vue';
import { useStore } from 'vuex'
import { IState } from './store'
import axios from 'axios';
import { useRouter } from 'vue-router';
import { loadingEmitter } from './components/Loading.vue';
import Footer from './components/Footer.vue';
import Loading from './components/Loading.vue';

const store = useStore<IState>()
const router = useRouter()

axios.interceptors.request.use((request) => {
  loadingEmitter.emit('switch-loading', true)
  return request
})

axios.interceptors.response.use((response) => {
  loadingEmitter.emit('switch-loading', false)
  return response
}, (error) => {
  loadingEmitter.emit('switch-loading', false)
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
  <div class="h-screen overflow-scroll scrollbar-none">
    <Loading />
    <GlobalHeader />
    <div class="h-16"></div>
    <div class="min-h-screen overflow-scroll scrollbar-none">
      <router-view></router-view>
    </div>
    
    <Footer />
  </div>
</template>
<style scoped>
</style>
