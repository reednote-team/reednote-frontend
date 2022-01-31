<script setup lang='ts'>
import Note from '../components/NoteCover.vue';
import { useStore } from 'vuex'
import { IState } from '../store'
import { computed } from 'vue';

const store = useStore<IState>()
store.commit('getNote', {
  id: 0,
  title: 'untitled.md',
  content: ''
})
store.dispatch('getNotes')

const noteList = computed(() => {
  return store.state.noteList
})

</script>

<template>
  <div class="px-8">
    <Note v-for="note in noteList" :title="note.title" :id="note.id" />
  </div>
</template>

<style scoped>
</style>
