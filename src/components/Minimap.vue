<script setup lang='ts'>
import { computed } from 'vue';
import { useStore } from 'vuex'
import { IState } from '../store'

const store = useStore<IState>()

const content = computed(() => {
  return store.state.currentNote.content
})


const minimap = computed(() => {
  let ret = []
  let markdown = content.value.split('\n')
  for (let i = 0; i < markdown.length; i++) {
    let line = markdown[i]
    let headerCount = 0
    let isHeader = false
    for (let j = 0; j < line.length; j++) {
      if (j == 0 && line[j] == '#') isHeader = true
      if (line[j] == '#' && isHeader) headerCount += 1
    }
    if (headerCount) ret.push({headerCount: headerCount, header: markdown[i]})
  }
  return ret
})

</script>

<template>
  <ul>
    <li v-for="h in minimap">{{ h.header }}</li>
  </ul>
</template>

<style scoped>
</style>
