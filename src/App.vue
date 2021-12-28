<script setup lang="ts">
import MilkdownEditorVue from './components/MilkdownEditor.vue';
import GlobalHerder, { IUser } from './components/GlobalHerder.vue';
const testUser: IUser = {
  isLogin: true,
  id: 1908326,
  name: 'Steve',
}

</script>

<template>
  <div class="container">
    <GlobalHerder :user="testUser" />
    <MilkdownEditorVue />
  </div>
</template>

<style>
.container {
  @apply min-h-screen max-w-6xl bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 lg:rounded-xl md:rounded-md sm:rounded-none overflow-hidden my-2 mx-auto
}
body {
  @apply bg-gray-200 dark:bg-gray-700;
}
</style>
