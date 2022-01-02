<script setup lang='ts'>
import { ref, reactive, watch } from 'vue'

const props = defineProps<{
  getter: {
    status: string,
    content: string,
    error: string
  }
}>()

const fileList = reactive([

])

watch(fileList, () => {
  console.log(fileList)
})

const file = ref<File | null>(null)

const loadTextFromFile = (e: Event) => {
  props.getter.status = 'loading'
  const target = e.target as HTMLInputElement
  if (target.files?.length) {
    file.value = target.files[0]
    const reader = new FileReader()
    reader.readAsText(file.value)
    reader.onload = () => {
      props.getter.status = 'loaded'
      props.getter.content = reader.result as string
      props.getter.error = ''
    }
  }
}

const SaveTextToFile = () => {
  let filename = 'untitled.md'
  if (file.value) {
    filename = file.value.name
  }
  let text = props.getter.content
  let blob = new Blob([text], { type: 'text/plain' })
  let link = document.createElement("a")
  link.download = filename as string
  link.href = window.URL.createObjectURL(blob)
  document.body.appendChild(link)
  link.click()
  setTimeout(() => {
    document.body.removeChild(link)
    window.URL.revokeObjectURL(link.href)
  }, 100);
}

</script>

<template>
  <div>
    <input type="file" @change="loadTextFromFile" />
    <input type="button" value="Save" @click="SaveTextToFile" />
  </div>
</template>

<style scoped>
</style>
