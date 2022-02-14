<script lang='ts'>
import { key } from '@milkdown/plugin-tooltip'
import mitt from 'mitt'
import { reactive, ref } from 'vue'

type Alert = {
  title: '' | 'SUCCESS' | 'WARNING' | 'ERROR',
  body: string, 
  keep: number
}

type Events = {
  'call-alert': Alert
}

export const alertEmitter = mitt<Events>()
</script>

<script setup lang="ts">

const alert = reactive({
  title: '',
  body: ''
})

const hidden = ref(true)

alertEmitter.on('call-alert', (newAlert) => {
  alert.title = newAlert.title
  alert.body = newAlert.body
  hidden.value = false
  setTimeout(() => {
    hidden.value = true
  }, newAlert.keep)
})

</script>

<template>
  <teleport to="body">
    <div class="fixed top-12 w-full z-20" :class="{hidden: hidden}">
      <div class="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3 mx-auto max-w-sm">
        <p class="font-bold">{{ alert.title }}</p>
        <p class="text-sm">{{ alert.body }}</p>
      </div>
    </div>
  </teleport>
</template>

<style scoped>
</style>
