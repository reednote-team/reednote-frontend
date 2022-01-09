<script setup lang='ts'>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import FormVue, { FormValidationFunc } from '../components/Form.vue';
import TextInputVue from '../components/TextInput.vue';
const router = useRouter()
const store = useStore()
const formValidation: FormValidationFunc = () => {
  if (true) {
    router.push('/')
    store.commit('login')
  }
  return ''
}
</script>

<template>
  <FormVue :form-validation="formValidation">
    <template #title>登陆账号</template>
    <template #input>
      <TextInputVue :title="'Email'" :type="'email'" />
      <TextInputVue :title="'Password'" :type="'password'" />
    </template>
  </FormVue>
</template>

<style scoped>
</style>
