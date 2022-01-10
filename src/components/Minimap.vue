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
  let codeLine = []
  for (let i = 0; i < markdown.length; i++) {
    let line = markdown[i]
    let headerCount = 0
    let isHeader = false
    for (let j = 0; j < line.length; j++) {
      let startLine = -1
      let endLine = 0;
      for (let l = 0; l < markdown.length; l++) {
        if (markdown[l].includes('```') && startLine == -1) startLine = l;
        else if (markdown[l].includes('```')) {
          endLine = l;
          codeLine.push([startLine, endLine])
          startLine = -1;
        }
      }
      let isCodeLine = false;
      for (let c = 0; c < codeLine.length; c++) {
        if (codeLine[c][0] <= i && i <= codeLine[c][1]) isCodeLine = true
      }
      if (j == 0 && line[j] == '#' && !isCodeLine) isHeader = true
      if (line[j] == '#' && line[j - 1 < 0 ? 0 : j - 1] == '#' && isHeader) headerCount += 1
      console.log(codeLine, j, isCodeLine)
      codeLine = []
    }
    if (headerCount) ret.push({ headerCount: headerCount, header: markdown[i].replaceAll('#', '').trim().replaceAll('&#x20;', '').replaceAll('&x20;', '') })
  }
  return ret
})

</script>

<template>
  <ul>
    <li v-for="h in minimap">
      {{ h.headerCount }}-{{ h.header }}
    </li>
  </ul>
</template>

<style scoped>
.header1 {

}
.header2 {

}
</style>
