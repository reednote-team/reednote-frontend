<script setup lang='ts'>
import { ref, watch } from 'vue';
import useClickOutside from '../hooks/useClickOutside';

export interface IItem {
  name: string,
  disabled: false
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
      class="flex-shrink-0 my-2 px-4 py-1 text-center text-white font-bold rounded-xl border-2 border-white hover:text-white focus:outline-none"
      @click="changeStatus"
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
    <div class="absolute left-2 z-10 w-32 mx-auto my-2 text-base list-none bg-white rounded divide-y divide-gray-100 shadow" :class="{hidden: !show}">
      <ul class="py-1">
        <li v-for="item in items">
          <a
            href="#"
            class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
          >{{ item.name }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
</style>
