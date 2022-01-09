<script setup lang='ts'>
import FormVue, { FormValidationFunc } from '../components/Form.vue';
import TextInputVue from '../components/TextInput.vue';

const formValidation: FormValidationFunc = (inputBoxes) => {
  let pwd = ''
  let cpwd = ''
  inputBoxes.forEach((box) => {
    if (box.title == 'Password') {
      pwd = box.getContent()
    }
    else if (box.title == "Confirm Password") {
      cpwd = box.getContent()
    }
  })
  if (pwd != cpwd) {
    return 'the password confirmed is different!'
  }
  else {
    return ''
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
