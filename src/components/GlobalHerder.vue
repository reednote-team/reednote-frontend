<script setup lang='ts'>
import DropdownMenuVue, { IItem } from './DropdownMenu.vue'
import logo from '../assets/logo.png'
export interface IUser {
  isLogin: boolean
  id?: number
  name?: string
}

defineProps<{
  user: IUser
}>()

let items: IItem[] = [
  {
    name: 'New article',
    disabled: false
  },
  {
    name: 'My profile',
    disabled: false
  },
  {
    name: 'Sign out',
    disabled: false
  },
]

</script>

<template>
  <div
    v-if="user.isLogin"
    class="bg-green-500 dark:bg-green-900 h-12 rounded-md flex items-center space-x-2 px-2 mb-4"
  >
    <div class="mx-2 text-white text-lg font-bold flex-shrink-0 space-x-2">
      <img :src="logo" class="inline-block max-h-10" />
      <span class="inline-block relative top-1">Reednote</span>
    </div>
    <div class="w-4/5"></div>
    <DropdownMenuVue :title="`Hi, ${user.name}!`" :items="items" />
  </div>
  <div
    v-else
    class="bg-green-500 dark:bg-green-900 h-12 rounded-md flex items-center space-x-2 px-2 mx-2 mb-4"
  >
    <span class="mx-2 text-white text-lg font-bold flex-shrink-0">Reednote</span>
    <div class="w-4/5"></div>
    <a
      class="flex-shrink-0 my-2 px-4 py-1 text-center text-white font-bold rounded-xl border-2 border-white hover:text-white focus:outline-none"
      href="#"
    >Sign in</a>
    <a
      class="flex-shrink-0 my-2 px-4 py-1 text-center text-white font-bold rounded-xl border-2 border-white hover:text-white focus:outline-none"
      href="#"
    >Sign up</a>
  </div>
</template>

<style scoped>
</style>
