<script setup lang='ts'>
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/useUserStore';

const router = useRouter()
const userStore = useUserStore()

if (userStore.isSignedIn) {
  router.push('/notes')
}

</script>

<template>
  <div class="mx-auto h-40 w-fit">
    <span class="block w-full text-center text-stone-300 material-icons-round" style="font-size: 192px;">edit_note</span>
    <span class="block w-full text-center font-bold font-mono text-stone-300 text-2xl">To Write What You Think</span>
  </div>

</template>

<style scoped>
</style>
