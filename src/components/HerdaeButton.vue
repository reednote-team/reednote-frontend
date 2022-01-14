<script setup lang='ts'>
const props = defineProps<{
  disabled: boolean
}>()
</script>

<template>
  <div class="cursor-pointer" :class="{hidden: props.disabled}">
    <a
      class="flex-shrink-0 relative px-2 pt-3 text-center text-white dark:text-gray-100 bg-gray-500 hover:bg-gray-600 dark:bg-gray-800 font-bold rounded dark:hover:bg-gray-700 focus:outline-none"
      @click.prevent
    >
      <slot name="default">
        <span class="material-icons-round">ads_click</span>
      </slot>
    </a>
  </div>
</template>

<style scoped>
</style>
