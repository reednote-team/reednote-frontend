<script lang="ts">
import mitt from 'mitt'
import ModalConfirm from './ModalConfirm.vue'
import ModalNoteInfo from './ModalNoteInfo.vue';

export type ConfirmModal = {
  title?: string,
  message?: string,
  onModalConfirm?: () => void,
  onModalCancel?: () => void,
  onModalCloseAction?: () => void
}

export type NoteInfoModal = {
  onModalCloseAction?: () => void
}

export const defaultNoteInfoModal: NoteInfoModal = {
  onModalCloseAction: () => {
    modalEmitter.emit('show-modal', false)
  }
}

export const defaultConfirmModal: ConfirmModal = {
  title: 'Attention',
  message: 'please confirm.',
  onModalConfirm: () => { },
  onModalCancel: () => { },
  onModalCloseAction: () => {
    modalEmitter.emit('show-modal', false)
  }
}

type Events = {
  'show-modal': boolean
  'call-confirm-modal': ConfirmModal,
  'call-note-info-modal': NoteInfoModal,
}

export const modalEmitter = mitt<Events>()
</script>

<script setup lang='ts'>
import { shallowRef, ref, Ref, computed } from 'vue';

const showModal = ref(false)

const modalKey = ref(1)

const changeModalKey = () => {
  modalKey.value *= -1
}

const modalType = shallowRef()

const modalPayload: Ref<ConfirmModal | NoteInfoModal> = shallowRef({})

modalEmitter.on('show-modal', (show) => {
  if (show == true) {
    changeModalKey()
  }
  showModal.value = show
})

modalEmitter.on('call-confirm-modal', (payload) => {
  modalPayload.value = {
    ...defaultConfirmModal,
    ...payload
  }
  modalType.value = ModalConfirm
  modalEmitter.emit('show-modal', true)
})

modalEmitter.on('call-note-info-modal', (payload) => {
  modalPayload.value = {
    ...defaultNoteInfoModal,
    ...payload
  }
  modalType.value = ModalNoteInfo
  modalEmitter.emit('show-modal', true)
})

</script>

<template>
  <teleport to="body">
    <div
      class="overflow-y-auto overflow-x-hidden fixed z-20 justify-center items-center inset-0 h-modal"
      :class="{ hidden: !showModal }"
    >
      <div class="mx-auto my-4 px-4 w-full max-w-lg h-full md:h-auto items-center">
        <div class="bg-stone-700 rounded-lg shadow">
          <component :is="modalType" :key="modalKey" :payload="modalPayload" />
        </div>
      </div>
    </div>
  </teleport>
</template>

<style scoped>
</style>
