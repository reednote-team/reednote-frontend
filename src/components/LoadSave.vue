<script setup lang='ts'>

const props =  defineProps<{
  getter: {
    content: string, 
    error: string
  }
}>()

const loadTextFromFile = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files?.length) {
    const file = target.files[0]
    const reader = new FileReader()
    reader.readAsText(file);
    reader.onload = () => {
      props.getter.content = reader.result as string
      props.getter.error = ''
    }
  }
}
</script>

<template>
  <div>
    <input type="file" @change="loadTextFromFile" />
  </div>
</template>

<style scoped>
</style>
