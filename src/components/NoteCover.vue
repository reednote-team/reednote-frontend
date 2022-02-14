<script setup lang='ts'>
import { useRouter } from 'vue-router'

const router = useRouter()

let props = defineProps<{
  title: string,
  id: number
}>()

const openNote = () => {
  router.push(`/notes/${props.id}`)
}

</script>

<template>
  <div
    @click="openNote"
    class="mx-6 my-4 max-w-sm bg-stone-200 hover:bg-stone-100 cursor-pointer rounded-md shadow p-3"
  >
    <h3 class="text-stone-900 text-3xl">{{ props.title }}</h3>
    <p class="text-sm text-stone-600 my-2">{{ props.id }}</p>
  </div>
</template>

<style scoped>
</style>
