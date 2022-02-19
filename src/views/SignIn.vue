<script setup lang='ts'>
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/useUserStore';
import FormVue, { FormValidationFunc } from '../components/Form.vue';
import TextInputVue from '../components/TextInput.vue';
const router = useRouter()

const userStore = useUserStore()
const formValidation: FormValidationFunc = async (inputBoxes) => {
  const info = await userStore.validateUser({
    identifier: inputBoxes.get('Email')?.getContent() as string,
    password: inputBoxes.get('Password')?.getContent() as string
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
      <template #title>Sign in</template>
      <template #input>
        <TextInputVue :title="'Email'" :type="'email'" />
        <TextInputVue :title="'Password'" :type="'password'" />
      </template>
    </FormVue>
    <router-link to="/sign-up" class="block w-fit mx-auto my-3 text-lg text-stone-500 font-bold cursor-pointer">no account? sign up</router-link>
  </div>
</template>

<style scoped>
</style>
