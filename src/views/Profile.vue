<script setup lang='ts'>
import { useUserStore } from '../stores/useUserStore';
import { useRouter } from 'vue-router';

const router = useRouter()

const userStore = useUserStore()

const logout = async () => {
  await userStore.removeUser()
  router.push('/')
}

</script>

<template>
  <div
    class="container mb-32 mt-4 mx-auto min-h-fit max-w-[21cm] bg-stone-200 shadow rounded overflow-hidden"
  >
    <table class="text-stone-900 text-2xl w-full m-4">
      <tr>
        <td>id</td>
        <td>{{ userStore.id }}</td>
      </tr>
      <tr>
        <td>name</td>
        <td>{{ userStore.name }}</td>
      </tr>
      <tr>
        <td>email</td>
        <td>{{ userStore.email }}</td>
      </tr>
    </table>
    <div class="w-fit mx-4 mt-4 mb-2">
      <button
        @click="logout"
        class="text-stone-900 bg-red-200 hover:bg-red-100 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >Logout</button>
    </div>
  </div>
</template>

<style scoped>
</style>
