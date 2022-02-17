<script setup lang='ts'>
import { onMounted, ref, Ref } from 'vue';
import { useRouter } from 'vue-router'
import useQRCode from '../hooks/useQRCode';

const QRCode: Ref<HTMLElement | null> = ref(null)

const router = useRouter()

let props = defineProps<{
  title: string,
  id: number
}>()

const openNote = () => {
  router.push(`/notes/${props.id}`)
}

onMounted(() => {
  useQRCode(QRCode, `https://reednote.kevyn.cn/notes/${props.id}`)
})

</script>

<template>
  <div class="flex space-x-4 m-2 p-2 bg-stone-200 hover:bg-stone-100 items-center rounded-md shadow max-w-sm cursor-pointer">
    <div class="h-20 w-20" ref="QRCode"></div>
    <div
      @click="openNote"
      class="space-y-2"
    >
      <h3 class="text-stone-900 text-xl font-bold">{{ props.title }}</h3>
      <p class="text-sm text-stone-600">{{ props.id }}</p>
    </div>
  </div>
</template>

<style scoped>
</style>
