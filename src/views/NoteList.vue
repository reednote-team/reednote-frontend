<script setup lang='ts'>
import Note from '../components/Note.vue';
import { useStore } from 'vuex'
import { IState } from '../store'
import { computed } from 'vue';

const store = useStore<IState>()
store.commit('updateCurrentNoteContent', '')
store.commit('updateCurrentNoteName', 'untitled.md')
store.commit('updateCurrentNoteId', '')
store.dispatch('fetchNoteList')

const noteList = computed(() => {
  return store.state.noteList.data
})

</script>

<template>
  <div>
    <Note v-for="note in noteList" :name="note.name" :id="note.id" />
  </div>
</template>

<style scoped>
</style>
