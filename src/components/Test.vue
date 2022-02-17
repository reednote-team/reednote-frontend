<script setup lang='ts'>
import useQRCode from '../hooks/useQRCode'
import { onMounted, Ref, ref } from 'vue'; 

const testQR: Ref<HTMLElement | null> = ref(null)

onMounted(() => {
  useQRCode(testQR, 'www.kevyn.cn')
})
// import axios from 'axios'

// const testGetOne = async () => {
//   const resp = await axios.get('/public-notes/3')
//   console.log(resp);

// }

// const testGet = async () => {
//   const resp = await axios.get('/notes')
//   console.log(resp.data);
// }

// const testDelete = async () => {
//   const resp = await axios.delete('/public-notes/1')
//   console.log(resp)

// }

// const testPut = async () => {
//   const resp = await axios.put(`/notes/10`, {
//     "data": {
//       title: 'test note updated',
//       content: '# hello world!',
//       author: 1
//     }
//   })
//   console.log(resp)
// }

// const testPost = async () => {
//   const resp = await axios.post(`/notes`, {
//     data: {
//       title: 'test note',
//       content: '# hello world!',
//     }
//   })
//   console.log(resp);
// }
</script>

<template>
  <div ref="testQR"></div>
</template>

<style scoped>
</style>
