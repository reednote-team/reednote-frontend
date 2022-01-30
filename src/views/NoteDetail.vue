<script setup lang='ts'>
import { computed, watch } from 'vue'
import MarkdownEditor from '../components/MarkdownEditor.vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { IState } from '../store'
import { emitter } from '../plugins/myHeadings'

const store = useStore<IState>()

const route = useRoute()

if (route.params.id) {
  store.dispatch('updateCurrentNoteContentFromServer', route.params.id)
}

else {
  store.commit('updateStatus', 'loading')
  store.commit('updateCurrentNoteContent', '')
  store.commit('updateCurrentNoteName', 'untitled.md')
  store.commit('updateCurrentNoteId', 0)
  setTimeout(() => {
    store.commit('updateStatus', 'loaded')
  }, 10)
}

const editorStatus = computed(() => {
  return store.state.status
})

watch(editorStatus, () => {
  setTimeout(() => {
    if (editorStatus.value == 'loaded') {
      emitter.emit('update-toc')
    }
  }, 10)
})

</script>

<template>
  <MarkdownEditor v-if="editorStatus == 'loaded'" />
</template>

<style scoped>
</style>
