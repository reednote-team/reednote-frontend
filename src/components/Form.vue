<script lang="ts">
interface InputBox {
  title: string,
  getContent: () => string,
  getError: () => string
}

import mitt from 'mitt'
export const emitter = mitt<{
  'new-input-creation': InputBox
}>()
</script>

<script setup lang='ts'>
import { ref } from 'vue';
export type FormValidationFunc = (inputBoxes: Map<string, InputBox>) => Promise<string>

let props = defineProps<{
  formValidation: FormValidationFunc
}>()

const FormError = ref('')

const inputBoxes: Map<string, InputBox> = new Map()

const onNewInputCreation = (inputBox: InputBox): void => {
  inputBoxes.set(inputBox.title, inputBox)
}

emitter.on('new-input-creation', onNewInputCreation)

const submit = async () => {
  let perBoxValidation: boolean = true
  for (const box of inputBoxes.values()) {
    if (box.getError().length != 0) {
      perBoxValidation = false
      break
    }
  }
  if (perBoxValidation) {
    FormError.value = await props.formValidation(inputBoxes)
  }
}
</script>

<template>
  <div class="lg:w-1/2 w-80 max-w-lg lg:p-8 p-4 border-gray-600 shadow-md rounded-md mx-auto">
    <div>
      <h2 class="text-2xl dark:text-gray-100 font-bold text-center mb-5">
        <slot name="title"></slot>
      </h2>
      <div
        :class="{hidden: FormError == ''}"
        class="dark:bg-gray-700 border border-red-900 h-12 px-4 py-1 text-red-700 text-center"
      >{{ FormError }}</div>
      <slot name="input"></slot>
    </div>
    <slot name="default">
      <a
        class="block my-2 px-4 py-3 text-xl text-center text-white bg-gray-600 font-bold rounded-md hover:bg-gray-500 hover:shadow-xl focus:outline-none"
        href="#"
        @click.prevent="submit"
      >提交</a>
    </slot>
  </div>
</template>
<style scoped>
</style>
