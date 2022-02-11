<script setup lang='ts'>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { emitter } from './Modal.vue'
import { useStore } from 'vuex'
import { IState } from '../store'

const store = useStore<IState>()
const router = useRouter()
const route = useRoute()

const name = computed(() => {
  return store.state.currentNote.title
})

const displayTitleTag = computed(() => {
  return route.path.match(/\/notes\//)
})

const onClickTitleTag = () => {
  emitter.emit('call-modal', {
    title: 'File name',
    type: 'filenameInput',
    onModalConfirm: () => {
      return
    }
  })
}

const onJump = () => {
  router.push('/')
}
</script>

<template>
  <a
    @click.prevent="onJump"
    class="mx-3 mt-5 text-gray-100 text-xl font-bold float-left hidden md:block cursor-pointer"
  >Reednote</a>
  <a
    @click.prevent="onJump"
    class="mx-4 mt-5 text-gray-100 text-xl font-bold float-left md:hidden cursor-pointer"
  >Rn</a>
  <!-- <span
    @click="onClickTitleTag"
    :class="{hidden: !displayTitleTag}"
    class="mt-5 text-gray-200 dark:bg-gray-700 bg-gray-500 p-1 rounded-md text-sm font-bold max-w-sm float-left cursor-pointer"
  >{{ name }}</span> -->
</template>

<style scoped>
</style>
