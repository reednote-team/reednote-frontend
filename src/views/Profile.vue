<script setup lang='ts'>
import { computed } from 'vue';
import { useStore } from 'vuex'
import { IState } from '../store'

const store = useStore<IState>()
const user = computed(() => {
  return store.state.user
})

</script>

<template>
  <div
    class="container mb-32 mt-4 mx-auto min-h-fit max-w-[21cm] bg-white dark:bg-[#2e3440] shadow shadow-gray-300 rounded overflow-hidden"
  >
    <table class="text-white w-full m-4">
      <tr>
        <td>id</td>
        <td>{{ user.id }}</td>
      </tr>
      <tr>
        <td>name</td>
        <td>{{ user.name }}</td>
      </tr>
      <tr>
        <td>email</td>
        <td>{{ user.email }}</td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
</style>
