<script setup lang='ts'>
import { computed } from 'vue'
import MarkdownEditor from '../components/MarkdownEditor.vue'
import { useRouter, useRoute, onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { useStore } from 'vuex'
import { IState } from '../store'
import Minimap from '../components/Minimap.vue'
import { emitter } from '../components/Modal.vue'

const store = useStore<IState>()

const route = useRoute()
const router = useRouter()

if (route.params.id) {
  store.dispatch('getNote', route.params.id)
}

else {
  store.commit('changeEditorStatus', 'loading')
  store.commit('getNote', {
    id: 0,
    title: 'untitled.md',
    content: ''
  })
  setTimeout(() => {
    store.commit('changeEditorStatus', 'loaded')
  }, 10)
}

const editorStatus = computed(() => {
  return store.state.editorStatus
})

onBeforeRouteLeave((to, from, next) => {

  emitter.emit('call-modal', {
    type: 'comfirm',
    title: 'leave?',
    onModalConfirm() {
      next(true)
    },
    onModalCancel() {
      next(false)
    }
  })

})

</script>

<template>
  <div>
    <Minimap />
    <div class="flex pt-4 h-screen">
      <div class="h-full w-[18%] max-w-sm hidden lg:block"></div>
      <div class="h-full w-full overflow-scroll scrollbar scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
        <div
          class="container relative mb-32 mt-4 mx-auto min-h-screen max-w-[21cm] bg-white dark:bg-[#2e3440] shadow shadow-gray-300 rounded overflow-hidden"
        >
          <MarkdownEditor v-if="editorStatus == 'loaded'" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
