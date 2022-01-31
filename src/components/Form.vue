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
export type FormValidationFunc = (inputBoxes: InputBox[]) => string

let props = defineProps<{
  formValidation: FormValidationFunc
}>()

const inputBoxes: InputBox[] = []

const onNewInputCreation = (inputBox: InputBox): void => {
  inputBoxes.push(inputBox)
}

emitter.on('new-input-creation', onNewInputCreation)

const submit = () => {
  let perBoxValidation: boolean = inputBoxes.every(box => (box.getError().length == 0))
  if (perBoxValidation) {
    props.formValidation(inputBoxes)
  }
}
</script>

<template>
  <div class="lg:w-1/2 w-80 max-w-lg lg:p-8 p-4 border-gray-600 shadow-md rounded-md mx-auto">
    <div>
      <h2 class="text-2xl dark:text-gray-100 font-bold text-center mb-5">
        <slot name="title"></slot>
      </h2>
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
