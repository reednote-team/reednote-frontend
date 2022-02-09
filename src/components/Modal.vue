<script lang="ts">
import mitt from 'mitt'

type Modal = {
  title?: string,
  message?: string,
  type: 'comfirm' | 'filenameInput',
  onModalConfirm: () => void,
  onModalCancel?: () => void
}

type Events = {
  'call-modal': Modal
}

export const emitter = mitt<Events>()
</script>

<script setup lang='ts'>
import { computed, ref } from 'vue';
import { useStore } from 'vuex'
import { IState } from '../store'

const store = useStore<IState>()

const status = ref<'show' | 'hide'>('hide')
const title = ref('Attention!')
const message = ref('please confirm.')
const filename = computed(() => {
  return store.state.currentNote.title
})
const type = ref<'comfirm' | 'filenameInput'>('comfirm')
const modalConfirmAction = ref(() => { })
const modalCancelAction = ref(() => { })

const modalCloseAction = () => {
  status.value = 'hide'
  title.value = 'Attention!'
  message.value = 'please confirm.'
  type.value = 'comfirm'
  modalConfirmAction.value = () => { }
  modalCancelAction.value = () => { }
}

emitter.on('call-modal', (modal) => {
  if (modal.title)
    title.value = modal.title
  if (modal.message)
    message.value = modal.message
  if (modal.type)
    type.value = modal.type
  modalConfirmAction.value = modal.onModalConfirm
  if (modal.onModalCancel)
    modalCancelAction.value = modal.onModalCancel
  status.value = 'show'
})

const changeNoteTitle = (title: string) => {
  store.commit('getNote', {
    title: title
  })
}

</script>

<template>
  <teleport to="body">
    <div
      class="overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center inset-0 h-modal"
      :class="{ hidden: status == 'hide' }"
    >
      <div class="mx-auto my-4 px-4 w-full max-w-lg h-full md:h-auto items-center">
        <div class="bg-white rounded-lg shadow dark:bg-gray-700">
          <div
            class="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600"
          >
            <h3 class="text-xl font-medium text-gray-900 dark:text-white">{{ title }}</h3>
            <button
              @click="modalCloseAction()"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
          <div v-if="type == 'comfirm'" class="p-6 space-y-4">
            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">{{ message }}</p>
          </div>
          <div v-if="type == 'filenameInput'" class="p-6 space-y-4">
            <div class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              <input
                :value="filename"
                @change="changeNoteTitle(($event.target as HTMLInputElement).value)"
                class="appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-100 bg-transparent leading-tight focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>
          <div
            class="mx-auto flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600 w-fit"
          >
            <button
              @click="modalConfirmAction(); modalCloseAction()"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >Confirm</button>
            <button
              @click="modalCancelAction(); modalCloseAction()"
              class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"
            >Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<style scoped>
</style>
