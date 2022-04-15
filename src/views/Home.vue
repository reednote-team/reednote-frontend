<script setup lang='ts'>
import { computed } from 'vue';
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
    <span class="block w-full text-center text-stone-300 material-icons-round"
      style="font-size: 192px;">edit_note</span>
    <span class="block w-full text-center font-bold font-mono text-stone-300 text-2xl">To Write What You Think</span>
    <button v-if="!userStore.isSignedIn"
      class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
      <span
        class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
        Create Account
      </span>
    </button>
  </div>

</template>

<style scoped>
</style>
