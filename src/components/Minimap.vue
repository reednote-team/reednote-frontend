<script setup lang='ts'>
import { computed } from 'vue';
import { useStore } from 'vuex'
import { IState } from '../store'

const store = useStore<IState>()

const content = computed(() => {
  return store.state.currentNote.content
})

</script>

<template>
  <div></div>
</template>

<style scoped>
</style>
