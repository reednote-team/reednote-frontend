<script setup lang='ts'>
import { computed } from 'vue';
import MarkdownEditor from '../components/MarkdownEditor.vue';
import { useStore } from 'vuex'
import { IState } from '../store'

const store = useStore<IState>()

const editorStatus = computed(() => {
  return store.state.status
})

</script>

<template>
  <MarkdownEditor v-if="editorStatus == 'loaded'" />
</template>

<style scoped>
</style>
