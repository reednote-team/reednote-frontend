<script setup lang='ts'>
import { useRouter } from 'vue-router'

const router = useRouter()

let props = defineProps<{
  name: string,
  id: string
}>()

const openNote = () => {
  router.push(`/notes/${props.id}`)
}

</script>

<template>
  <div
    @click="openNote"
    class="mx-6 my-4 border border-gray-400 hover:bg-gray-600 cursor-pointer rounded-md shadow p-3"
  >
    <h3 class="text-white text-3xl">{{ props.name }}</h3>
    <p class="text-sm text-gray-400 my-2">{{ props.id }}</p>
  </div>
</template>

<style scoped>
</style>
