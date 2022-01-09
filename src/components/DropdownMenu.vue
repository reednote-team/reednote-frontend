<script setup lang='ts'>
import { ref, watch } from 'vue'
import useClickOutside from '../hooks/useClickOutside'

export interface IItem {
  name: string,
  disabled: boolean,
  action: () => void
}

let props = defineProps<{
  title: string,
  items: IItem[]
}>()

let dropdownRef = ref<null | HTMLElement>(null)

let show = ref(false)

const changeStatus = () => {
  show.value = !show.value
}

let isClickOutside = useClickOutside(dropdownRef)

watch(isClickOutside, () => {
  if (show.value && isClickOutside.value) {
    changeStatus()
  }
})
</script>

<template>
  <div class="relative flex-shrink-0" ref="dropdownRef">
    <a
      class="flex-shrink-0 my-2 px-4 py-3 text-center text-white dark:text-gray-100 bg-gray-500 dark:bg-gray-800 font-bold rounded hover:bg-gray-600 dark:hover:bg-gray-900 focus:outline-none"
      @click.prevent="changeStatus"
      href="#"
    >
      {{ props.title }}
      <svg
        class="inline ml-2 w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </a>
    <div
      class="absolute left-2 z-10 w-24 my-2 text-white dark:text-gray-100 rounded"
      :class="{ hidden: !show }"
    >
      <ul class="py-1">
        <li v-for="item in items">
          <a
            href="#"
            @click.prevent="!item.disabled && item.action()"
            class="block py-2 px-4 text-sm bg-gray-500 dark:bg-gray-700 hover:bg-gray-600 dark:hover:bg-gray-500"
            :class="{disabled: item.disabled}"
          >{{ item.name }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.disabled {
  @apply text-gray-300 hover:bg-gray-700;
  cursor: default;
}
</style>
