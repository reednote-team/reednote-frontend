<script setup lang='ts'>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import FormVue, { FormValidationFunc } from '../components/Form.vue';
import TextInputVue from '../components/TextInput.vue';
const router = useRouter()
const store = useStore()
const formValidation: FormValidationFunc = async (inputBoxes) => {
  const info = await store.dispatch('validateUser', {
    identifier: inputBoxes.get('Email')?.getContent(),
    password: inputBoxes.get('Password')?.getContent()
  })
  if (info.length == 0) {
    router.push('/')
  }
  
  return info
}
</script>

<template>
  <div>
    <FormVue :form-validation="formValidation">
      <template #title>登陆账号</template>
      <template #input>
        <TextInputVue :title="'Email'" :type="'email'" />
        <TextInputVue :title="'Password'" :type="'password'" />
      </template>
    </FormVue>
    <router-link to="/sign-up" class="block w-fit mx-auto my-3 text-lg text-gray-400 cursor-pointer">no account? sign up</router-link>
  </div>
</template>

<style scoped>
</style>
