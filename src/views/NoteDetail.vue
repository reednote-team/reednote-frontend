<script setup lang='ts'>
import { computed, watch } from 'vue'
import MarkdownEditor from '../components/MarkdownEditor.vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { IState } from '../store'

const store = useStore<IState>()

const route = useRoute()

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

</script>

<template>
  <MarkdownEditor v-if="editorStatus == 'loaded'" />
</template>

<style scoped>
</style>
