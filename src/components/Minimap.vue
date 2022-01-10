<script setup lang='ts'>
import { computed, watch, reactive } from 'vue';
import { useStore } from 'vuex'
import { IState } from '../store'

const store = useStore<IState>()
const isCodeBlock = /^```.+\n+```/
const isHeader = /^#+ /

const content = computed(() => {
  return store.state.currentNote.content
})

interface Header {
  type: number,
  text: string,
  hid: string
}


// const headers = computed((): Header[] => {
//   const content = store.state.currentNote.content.replace(isCodeBlock, '').split('\n')
//   const headerLines = content.filter((line) => {
//     return isHeader.test(line)
//   })
//   return headerLines.map((line): Header => {
//     return {
//       type: line.split(' ')[0].length,
//       text: line.replace(isHeader, '')
//     }
//   })
// })

const headers = reactive<Header[]>([])

watch(content, () => {
  headers.length = 0
  const editorRef = document.querySelector('.editor')
  if (editorRef) {
    const nodes = editorRef.childNodes
    nodes?.forEach((el, index) => {
      const hel = el as HTMLElement
      if (hel.tagName.indexOf('H') >= 0) {
        hel.id = `hid${index}`
        headers.push({
          text: hel.innerText,
          type: parseInt(hel.tagName.replace('H', '')),
          hid: `hid${index}`
        })
      }
    })
  }
  console.log(headers);
})

</script>

<template>
  <div>
    <a
      v-for="header in headers"
      :href="`#${header.hid}`"
      class="block dark:text-white ml-4"
      :style="`padding-left: ${header.type * 16}px; font-size: ${(9 - header.type) * 3}px;`"
    >{{ header.text }}</a>
  </div>
</template>

<style scoped>
/* .header1 {
  padding-left: ;
}
.header2 {
  padding-left: ;
} */
</style>
