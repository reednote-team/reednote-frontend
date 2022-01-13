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
  <div class="fixed mt-16 w-64 hidden lg:block">
    <div
      class="min-h-screen max-h-screen overflow-scroll scrollbar scrollbar-thin scrollbar-thumb-slate-700 pt-4 text-gray-700 bg-white dark:text-gray-200 dark:bg-gray-900"
    >
      <a
        v-for="heading in headings"
        :href="`#${heading.hid}`"
        class="block mx-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800"
        :class="`text-gray-${heading.type > 4 ? 3 : heading.type}00`"
        :style="`padding-left: ${heading.type * 8}px; font-size: ${heading.type > 3 ? 12 : 4 + (6 - heading.type) * 3}px;`"
      >{{ heading.text }}</a>
    </div>
  </div>
</template>

<style scoped>
</style>
