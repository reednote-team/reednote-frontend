<script setup lang="ts">
import { ref, watch } from 'vue';
import MilkdownEditorVue from './components/MilkdownEditor.vue';

const content = ref('')

watch(content, () => {
  console.log(content.value);
})

</script>

<template>
  <div class="container">
    <MilkdownEditorVue v-model:content="content" />
  </div>
</template>

<style>
body {
  background-color: rgba(var(--background), 1);
}
</style>
