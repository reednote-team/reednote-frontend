<script setup lang='ts'>
import { onMounted, onUnmounted } from 'vue';
import { headings, emitter } from '../plugins/myHeadings'

const updateTOC = (e: Event) => {
  const key = (e as KeyboardEvent).key
  const triggers: string[] = ['Enter', 'Backspace']
  if (triggers.indexOf(key) >= 0)
    emitter.emit('update-toc')
}

onMounted(() => {
  window.addEventListener('keyup', updateTOC)
})

onUnmounted(() => {
  window.removeEventListener('keyup', updateTOC)
})

</script>

<template>
  <div
    class="min-h-screen max-h-screen pb-16 bg-stone-100 overflow-scroll scrollbar scrollbar-thin scrollbar-thumb-stone-300"
  >
    <a
      v-for="heading in headings"
      :href="`#${heading.hid}`"
      class="block ml-2 mr-4 py-1 hover:bg-stone-300 text-stone-900 font-bold"
      :style="`padding-left: ${heading.type * 8}px; font-size: ${heading.type > 3 ? 12 : 4 + (6 - heading.type) * 3}px;`"
    >{{ heading.text }}</a>
  </div>
</template>

<style scoped>
</style>
