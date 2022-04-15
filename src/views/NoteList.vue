<script setup lang='ts'>
import { onMounted } from 'vue';
import Note from '../components/NoteCover.vue';
import { useNoteStore } from '../stores/useNoteStore'
import { useNoteSetStore } from '../stores/useNoteSetStore'
import NoteSetCover from '../components/NoteSetCover.vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/useUserStore';

const userStore = useUserStore()

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
    <div class="mx-auto h-40 w-fit mb-40">
      <span class="block w-full text-center text-stone-300 material-icons-round"
        style="font-size: 192px;">edit_note</span>
      <span class="block w-full text-center font-bold font-mono text-stone-300 text-2xl">To Write What You Think</span>
      <router-link to="/sign-in" v-if="!userStore.isSignedIn" class="block w-fit mx-auto my-4 p-3 rounded-md border border-stone-500 text-xl text-stone-800">
        Sign In
      </router-link>
      <router-link to="/notes/new" v-else class="block w-fit mx-auto my-4 p-3 rounded-md border border-stone-500 text-xl text-stone-800">
        Create a Note!
      </router-link>
    </div>
    <div class="container mx-auto max-w-7xl">
      <NoteSetCover v-for="noteSet in noteSetStore.noteSetList" :noteSet="noteSet">
        <Note v-for="note in noteStore.noteList.filter(note => note.noteSet == noteSet.id)" :id="note.id" />
      </NoteSetCover>
    </div>
  </div>
</template>

<style scoped>
</style>
