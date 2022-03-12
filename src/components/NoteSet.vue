<script setup lang='ts'>
import { NoteSet } from '../stores/useNoteSetStore'
import { ref } from 'vue';

const props = defineProps<{
  noteSet: NoteSet
}>()

const noteSet = props.noteSet
const fold = ref(false)

</script>

<template>
  <div class="rounded-md shadow-md p-8 overflow-hidden" :class="`${ noteSet.color } ${ fold ? 'h-28' : 'h-fit' }`">
  <div class="px-2">
    <button @click="fold = !fold" class="float-right material-icons-round" style="font-size: 48px;">water_drop</button>
    <div class="text-3xl font-extrabold">{{ noteSet.name }}</div>
    <div class="text-lg font-sans">{{ noteSet.description }}</div>
  </div>
    <hr class="m-2" />
    <div class="w-full grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
      <slot name="default"></slot>
    </div>
  </div>
</template>

<style scoped>
</style>
