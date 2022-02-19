<script setup lang='ts'>
import { computed, onMounted, ref } from 'vue';
import { NoteInfoModal } from './ModalBase.vue';
import useQRCode from '../hooks/useQRCode';
import { useUserStore } from '../stores/useUserStore'
import { useNoteStore } from '../stores/useNoteStore';

const userStore = useUserStore()
const noteStore = useNoteStore()

const props = defineProps<{
  payload: NoteInfoModal
}>()

const payload = props.payload

const noteID = computed(() => {
  return noteStore.currentNote.id
})

const filename = computed(() => {
  return noteStore.currentNote.title
})

const hasPublic = computed(() => {
  return noteStore.currentNote.hasPublic
})

const isNoteOwner = computed(() => {
  return userStore.isSignedIn && userStore.id == noteStore.currentNote.author
})

const QRArea = ref<HTMLElement | null>(null)

const changeNoteTitle = (title: string) => {
    noteStore.currentNote.title = title
}

const switchPublic = () => {
  noteStore.currentNote.hasPublic = !noteStore.currentNote.hasPublic
  noteStore.patchNote()
}

onMounted(() => {
  if (QRArea.value)
    useQRCode(QRArea, `https://reednote.kevyn.cn/notes/${noteID.value}`, 8, 12)
})


</script>

<template>
  <div class="flex justify-between items-center p-5 rounded-t border-b border-stone-400">
    <h3 class="text-xl font-medium text-white">Note Info</h3>
    <button
      @click="payload.onModalCloseAction && payload.onModalCloseAction()"
      class="hover:bg-red-900 bg-transparent text-stone-100 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
    >
      <svg
        class="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  </div>
  <div class="p-6 space-y-4">
    <div class="text-base leading-relaxed text-stone-100">
      <input
        :value="filename"
        @change="changeNoteTitle(($event.target as HTMLInputElement).value)"
        class="appearance-none border rounded w-full py-2 px-3 text-stone-100 bg-transparent leading-tight focus:outline-none focus:border-cyan-500"
      />
    </div>
    <div :class="{ hidden: !noteID || !isNoteOwner }">
      <div class="mx-auto h-64 w-64 bg-white" ref="QRArea"></div>
      <div class="w-fit mx-auto mt-4 mb-2">
        <button
          @click="switchPublic"
          class="text-stone-50 bg-stone-900 hover:bg-stone-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >{{ hasPublic ? 'to private' : 'to public' }}</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.QRArea img {
  @apply h-full w-full;
}
</style>

