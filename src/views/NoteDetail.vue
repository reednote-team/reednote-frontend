<script setup lang='ts'>
import { computed } from 'vue';
import MarkdownEditor from '../components/MarkdownEditor.vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex'
import { IState } from '../store'

const store = useStore<IState>()

const route = useRoute()
store.dispatch('updateContentFromServer', route.params.id)

const editorStatus = computed(() => {
  return store.state.status
})

</script>

<template>
  <MarkdownEditor v-if="editorStatus == 'loaded'" />
</template>

<style scoped>
</style>
