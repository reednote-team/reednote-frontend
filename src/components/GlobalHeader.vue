<script setup lang='ts'>
import { ref } from 'vue'
import DropdownMenuVue, { IItem } from './DropdownMenu.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { IState } from '../store'
import Modal, { emitter } from './Modal.vue'

const router = useRouter()
const store = useStore<IState>()
const filename = ref('untitled.md')
const fileSelector = ref<HTMLElement | null>(null)

const loadTextFromFile = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files?.length) {
    const file = target.files[0]
    filename.value = file.name
    store.dispatch('updateContentFromFile', file)
  }
  target.value = ''
}

let items: IItem[] = [
  {
    name: 'new',
    disabled: false,
    action: () => {
      emitter.emit('call-modal', {
        message: 'all content have not been saved will lost if you press confirm.',
        onModalConfirm: () => {
          filename.value = 'untitled.md'
          store.commit('updateStatus', 'loading')
          store.commit('updateContent', '')
          setTimeout(() => {
            store.commit('updateStatus', 'loaded')
          }, 10)
        },
        onModalCancel: () => {
          return;
        }
      })
    }
  },
  {
    name: 'load',
    disabled: false,
    action: () => {
      emitter.emit('call-modal', {
        message: 'all content have not been saved may lost if you press confirm.',
        onModalConfirm: () => {
          router.push('/notes')
        }
      })
      
    }
  },
  {
    name: 'save',
    disabled: false,
    action: () => {
      emitter.emit('call-modal', {
        title: 'test',
        message: 'saved',
        onModalConfirm: () => {}
      })
    }
  },
  {
    name: 'upload',
    disabled: false,
    action: () => {
      if (fileSelector.value) {
        fileSelector.value.click()
      }
    }
  },
  {
    name: 'download',
    disabled: false,
    action: () => {
      let text = store.state.currentNote.content
      let blob = new Blob([text], { type: 'text/plain' })
      let link = document.createElement("a")
      link.download = filename.value
      link.href = window.URL.createObjectURL(blob)
      document.body.appendChild(link)
      link.click()
      setTimeout(() => {
        document.body.removeChild(link)
        window.URL.revokeObjectURL(link.href)
      }, 100);
    }
  }
]

</script>

<template>
  <div class="bg-gray-400 dark:bg-gray-900 h-16 space-x-2 px-2 mb-4">
    <router-link to="/" class="mx-3 mt-5 text-gray-100 text-xl font-bold float-left">Reednote</router-link>
    <Modal />
    <div class="h-full py-5 float-right space-x-1">
      <div v-if="true">
        <DropdownMenuVue :title="'menu'" :items="items" />
      </div>
      <div v-else>
        <a
          class="px-4 py-3 text-lg text-white font-bold rounded-md hover:shadow-xl hover:bg-slate-800 focus:outline-none"
        >登录</a>
        <span class="text-white text-lg">|</span>
        <a
          class="px-4 py-3 text-lg text-white font-bold rounded-md hover:shadow-xl hover:bg-slate-800 focus:outline-none"
        >注册</a>
      </div>
    </div>
    <input type="file" @change="loadTextFromFile" ref="fileSelector" hidden />
  </div>
</template>

<style scoped>
</style>
