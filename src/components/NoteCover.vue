<script setup lang='ts'>
import { onMounted, ref, Ref } from 'vue';
import { useRouter } from 'vue-router'
import useQRCode from '../hooks/useQRCode';
import { useNoteStore } from '../stores/useNoteStore'
import { useNoteSetStore } from '../stores/useNoteSetStore'

const noteStore = useNoteStore()
const noteSetStore = useNoteSetStore()

const QRCode: Ref<HTMLElement | null> = ref(null)

const router = useRouter()

let props = defineProps<{
  id: number
}>()

const note = noteStore.noteList.find((note) => {
  return note.id == props.id
})

const openNote = () => {
  router.push(`/notes/${props.id}`)
}

const showQRCode = ref(false)

onMounted(() => {
  useQRCode(QRCode, `https://reednote.kevyn.cn/notes/${props.id}`, 2, 4)
})

</script>

<template>
  <div class="h-28 mb-1 overflow-hidden">
    <div
      @click="openNote"
      @mouseenter="showQRCode = true"
      @mouseleave="showQRCode = false"
      class="flex space-x-4 mx-2 p-2 bg-stone-200 hover:bg-stone-100 items-center rounded-md shadow max-w-sm cursor-pointer"
    >
      <div class="h-20 w-20" ref="QRCode"></div>
      <div class="space-y-2">
        <h3 class="text-stone-900 text-xl font-bold">{{ note?.title }}</h3>
        <p class="text-sm text-stone-600">{{ props.id }}</p>
      </div>
    </div>
    <div v-if="!showQRCode" class="relative bottom-24 hover:hidden flex mx-2 p-2 bg-transparent items-center rounded-md shadow max-w-sm cursor-pointer">
      <div class="h-20 w-20 bg-stone-300 grid place-items-center">
        <div v-if="!note?.hasPublic" class="w-fit text-stone-500 material-icons" style="font-size: 48px;">lock</div>
        <div v-else class="w-fit text-stone-500 material-icons" style="font-size: 48px;">lock_open</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
