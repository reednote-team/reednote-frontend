<script setup lang='ts'>
import axios from 'axios'

const testGetOne = async () => {
  const resp = await axios.get('/public-notes/3')
  console.log(resp);
  
}

const testGet = async () => {
  const resp = await axios.get('/public-notes')
  console.log(resp.data.data);
  
}

const testDelete = async () => {
  const resp = await axios.delete('/public-notes/1')
  console.log(resp)
  
}

const testPut = async () => {
  const resp = await axios.put('/public-notes/3', {
    "data": {
      "title": "test title updated",
      "content": "# Hello world updated!",
    }
  })
  console.log(resp)
}

const testPost = () => {
  axios.post('/public-notes', {
    "data": {
      "title": "test title",
      "content": "# Hello world!",
    }
  }).then((resp) => {
    console.log(resp);
    
  }).catch((err) => {
    console.log(err);
    
  })
}
</script>

<template>
  <button class="text-white" @click="testGetOne">
    test
  </button>
</template>

<style scoped>
</style>
