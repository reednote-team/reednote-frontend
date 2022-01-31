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
  <div class="fixed w-[18%] max-w-sm hidden lg:block">
    <div
      class="min-h-screen max-h-screen pb-16 overflow-scroll scrollbar scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700 pt-4 text-gray-700 bg-gray-100 dark:text-gray-200 dark:bg-gray-900"
    >
      <a
        v-for="heading in headings"
        :href="`#${heading.hid}`"
        class="block ml-2 mr-4 py-1 hover:bg-slate-200 dark:hover:bg-gray-800"
        :class="`dark:text-gray-${heading.type > 4 ? 3 : heading.type}00 text-gray-${heading.type > 4 ? 5 : 9 - heading.type}00`"
        :style="`padding-left: ${heading.type * 8}px; font-size: ${heading.type > 3 ? 12 : 4 + (6 - heading.type) * 3}px;`"
      >{{ heading.text }}</a>
    </div>
  </div>
</template>

<style scoped>
</style>
