<script setup lang='ts'>
import { ConfirmModal } from './ModalBase.vue';


const props = defineProps<{
  payload: ConfirmModal
}>()

const payload = props.payload

</script>

<template>
  <div class="flex justify-between items-center p-5 rounded-t border-b border-stone-400">
    <h3 class="text-xl font-medium text-white">{{ payload.title }}</h3>
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
    <p class="text-base leading-relaxed text-stone-300">{{ payload.message }}</p>
  </div>
  <div class="mx-auto flex items-center p-6 space-x-2 rounded-b border-t border-stone-500 w-fit">
    <button
      @click="payload.onModalConfirm && payload.onModalConfirm(); payload.onModalCloseAction && payload.onModalCloseAction()"
      class="text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
    >Confirm</button>
    <button
      @click="payload.onModalCancel && payload.onModalCancel(); payload.onModalCloseAction && payload.onModalCloseAction()"
      class="text-stone-100 bg-stone-700 hover:bg-stone-600 focus:ring-4 rounded-lg text-sm font-medium px-5 py-2.5 focus:z-10"
    >Cancel</button>
  </div>
</template>

<style scoped>
</style>
