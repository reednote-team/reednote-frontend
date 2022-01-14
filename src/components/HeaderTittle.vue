<script setup lang='ts'>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { emitter } from './Modal.vue'
import { useStore } from 'vuex'
import { IState } from '../store'

const store = useStore<IState>()
const router = useRouter()

const name = computed(() => {
  return store.state.currentNote.name
})

const onClickFileName = () => {
  emitter.emit('call-modal', {
    title: 'File name',
    type: 'filenameInput',
    onModalConfirm: () => {
      store.dispatch('saveNote')
    }
  })
}

const onJump = () => {
  emitter.emit('call-modal', {
    type: 'comfirm',
    message: 'all content have not been saved may lost if you press confirm.',
    onModalConfirm: () => {
      router.push('/notes')
    }
  })
}
</script>

<template>
  <a
    @click.prevent="onJump"
    class="mx-3 mt-5 text-gray-100 text-xl font-bold float-left hidden md:block cursor-pointer"
  >Reednote</a>
  <span
    @click="onClickFileName"
    class="mt-5 text-gray-200 dark:bg-gray-700 bg-gray-500 p-1 rounded-md text-sm font-bold max-w-sm float-left cursor-pointer"
  >{{ name }}</span>
</template>

<style scoped>
</style>
