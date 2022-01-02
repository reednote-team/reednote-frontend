<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import MilkdownEditorVue from './components/MilkdownEditor.vue';
import LoadSaveVue from './components/LoadSave.vue';

const editor = ref('init')
const content = ref('')

const fileBuffer = reactive({
  status: '',
  content: '', 
  error: ''
})

watch(fileBuffer, () => {
  if (fileBuffer.status == 'loaded') {
    content.value = fileBuffer.content
    editor.value = 'opened'
  }
  else if (fileBuffer.status == 'loading') {
    editor.value = ''
  }
})

watch(content, () => {
  fileBuffer.content = content.value
})

</script>

<template>
  <div class="container">
    <LoadSaveVue :getter="fileBuffer" />
    <MilkdownEditorVue v-if="editor" v-model:content="content" />
  </div>
</template>

<style>
body {
  background-color: rgba(var(--background), 1);
}
</style>
