<script setup lang='ts'>
import { onMounted } from 'vue';
import Note from '../components/NoteCover.vue';
import { useNoteStore } from '../stores/useNoteStore'
import { useNoteSetStore } from '../stores/useNoteSetStore'
import NoteSet from '../components/NoteSetCover.vue';

const noteStore = useNoteStore()
const noteSetStore = useNoteSetStore()

onMounted(() => {
  noteStore.currentNote.id = 0
  noteStore.currentNote.title = 'untitled'
  noteStore.currentNote.content = ''


  noteStore.getNotes()
  noteSetStore.getNoteSets()
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
    <div class="container mx-auto max-w-7xl">
      <NoteSet v-for="noteSet in noteSetStore.noteSetList" :noteSet="noteSet">
        <Note
          v-for="note in noteStore.noteList.filter(note => note.noteSet == noteSet.id)"
          :id="note.id"
        />
      </NoteSet>
    </div>
  </div>
</template>

<style scoped>
</style>
