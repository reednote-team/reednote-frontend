<script setup lang='ts'>
import FormVue, { FormValidationFunc } from '../components/Form.vue';
import TextInputVue from '../components/TextInput.vue';
import { useStore } from 'vuex'
import { IState } from '../store'
import { useRouter } from 'vue-router';

const store = useStore<IState>()
const router = useRouter()

const formValidation: FormValidationFunc = async (inputBoxes) => {
  let pwd = inputBoxes.get('Password')?.getContent()
  let cpwd = inputBoxes.get('Confirm Password')?.getContent()
  if (pwd != cpwd) {
    return 'the password confirmed is different!'
  }
  else {
    const info = await store.dispatch('registerUser', {
      username: inputBoxes.get('Username')?.getContent(),
      email: inputBoxes.get('Email')?.getContent(),
      password: pwd
    })
    if (info.length == 0) {
      router.push('/')
    }
    return info
  }
}

</script>

<template>
  <FormVue :form-validation="formValidation">
    <template #title>注册账号</template>
    <template #input>
      <TextInputVue :title="'Email'" :type="'email'" placeholder="请输入邮箱地址" />
      <TextInputVue :title="'Username'" :type="'username'" placeholder="请输入用户名" />
      <TextInputVue :title="'Password'" :type="'password'" placeholder="请输入密码" />
      <TextInputVue :title="'Confirm Password'" :type="'password'" placeholder="请确认密码" />
    </template>
  </FormVue>
</template>

<style scoped>
</style>
