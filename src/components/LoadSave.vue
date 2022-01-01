<script setup lang='ts'>

// import { dialog } from "electron"
// import writeFile from "fs"

const props =  defineProps<{
  getter: {
    status: string,
    content: string, 
    error: string
  }
}>()

const loadTextFromFile = (e: Event) => {
  props.getter.status = 'loading'
  const target = e.target as HTMLInputElement
  if (target.files?.length) {
    const file = target.files[0]
    const reader = new FileReader()
    reader.readAsText(file);
    reader.onload = () => {
      props.getter.status = 'loaded'
      props.getter.content = reader.result as string
      props.getter.error = ''
    }
  }
}

const saveTextToFile = (e: Event) => {
  const options = {
    title: 'Select a place to save',
    defaultPath: '',
    buttonLabel: 'Save',
    filters: [
      {
        name: 'Reed',
        extensions: ['md']
      }
    ],
  }
  // dialog.showSaveDialog(options)
  // writeFile(fileName, props.getter.content, function (err) {
  //   if (err) throw err
  //   console.log('Saved!')
  // })
  // console.log(fileName)
}

</script>

<template>
  <div>
    <input type="file" @change="loadTextFromFile" />
	<button id="save" @click="saveTextToFile">Save</button>
  </div>
</template>

<style scoped>
</style>
