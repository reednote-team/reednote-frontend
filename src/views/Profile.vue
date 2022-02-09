<script setup lang='ts'>
import { useStore } from 'vuex'
import { IState } from '../store'

const store = useStore<IState>()

</script>

<template>
  <div class="text-white">
    {{ store.state.user }}
  </div>
</template>

<style scoped>
</style>
