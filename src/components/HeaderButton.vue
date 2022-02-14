<script setup lang='ts'>
const props = defineProps<{
  disabled: boolean
}>()
</script>

<template>
  <div class="cursor-pointer" :class="{hidden: props.disabled}">
    <a
      class="focus:outline-none"
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
