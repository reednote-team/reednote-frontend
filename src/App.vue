<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue'
import GlobalHeader from './components/Header.vue'
import { useUserStore } from './stores/useUserStore';
import axios from 'axios'
import { useRouter } from 'vue-router'
import { loadingEmitter } from './components/Loading.vue'
import Footer from './components/Footer.vue'
import Loading from './components/Loading.vue'
import ModalAbstract from './components/ModalBase.vue'
import useScrollToTop from './hooks/useScrollToTop'

const userStore = useUserStore()
const router = useRouter()

const outmost: Ref<HTMLElement | null> = ref(null)

router.beforeEach((to, from) => {
  useScrollToTop(outmost)
  return true
})

axios.interceptors.request.use((request) => {
  if (request.method != 'get' || request.url?.match(/\/notes\//) != null)
    loadingEmitter.emit('switch-loading', true)

  return request
})

axios.interceptors.response.use((response) => {
  loadingEmitter.emit('switch-loading', false)
  return response
}, (error) => {
  loadingEmitter.emit('switch-loading', false)
  if (error.response.status === 401) {
    if (axios.defaults.headers.common["Authorization"]) {
      delete axios.defaults.headers.common["Authorization"]
    }
    router.push('/R401')
  }
  return Promise.reject(error)
})

onMounted(() => {
  userStore.recoverUser()
})
</script>

<template>
  <div ref="outmost" class="h-screen overflow-scroll scrollbar-none">
    <Loading />
    <ModalAbstract />
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
