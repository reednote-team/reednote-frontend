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
  <div class="px-2 pb-16">
    <div class="mx-auto h-40 w-fit mb-32">
      <span
        class="block w-full text-center text-stone-300 material-icons-round"
        style="font-size: 192px;"
      >edit_note</span>
      <span
        class="block w-full text-center font-bold font-mono text-stone-300 text-2xl"
      >To Write What You Think</span>
    </div>
    <div class="container mx-auto max-w-7xl grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
      <Note v-for="note in noteList" :title="note.title" :id="note.id" />
    </div>
  </div>
</template>

<style scoped>
</style>
