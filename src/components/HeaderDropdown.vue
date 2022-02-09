<script setup lang='ts'>
import { ref, Ref, watch } from 'vue'
import useClickOutside from '../hooks/useClickOutside'

export interface IItem {
  name: string,
  disabled: Ref<boolean>,
  action: () => void
}

let props = defineProps<{
  disabled: boolean,
  items: IItem[]
}>()

const dropdownRef = ref<null | HTMLElement>(null)

const show = ref(false)

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
  <div class="relative" :class="{hidden: props.disabled}" ref="dropdownRef" @click.prevent="changeStatus">
      <slot name="default">
        <span class="material-icons-round">arrow_dropdown</span>
      </slot>
      <div
        class="absolute -left-6 z-10 w-24 my-2 text-white dark:text-gray-100"
        :class="{ hidden: !show }"
      >
        <ul class="py-1 cursor-pointer">
          <li v-for="item in items.filter((item) => item.disabled.value == false)">
            <a
              @click.prevent="item.action()"
              class="block py-2 px-4 text-sm bg-gray-500 dark:bg-gray-700 hover:bg-gray-600 dark:hover:bg-gray-500"
            >{{ item.name }}</a>
          </li>
        </ul>
      </div>
  </div>
</template>

<style scoped>
</style>
