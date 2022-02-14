<script setup lang='ts'>
import { computed, ref } from 'vue'
import MarkdownEditor from '../components/MarkdownEditor.vue'
import { useRouter, useRoute, onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { useStore } from 'vuex'
import { IState } from '../store'
import Minimap from '../components/Minimap.vue'
import { modalEmitter } from '../components/Modal.vue'

const store = useStore<IState>()

const route = useRoute()
const router = useRouter()

const fileSelector = ref<HTMLElement | null>(null)

const loadTextFromFile = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files?.length) {
    const file = target.files[0]
    store.dispatch('uploadNote', file)
  }
  target.value = ''
}

const content = computed(() => {
  return store.state.currentNote.content
})

if (route.params.id) {
  store.dispatch('getNote', route.params.id)
}

else {
  store.commit('changeEditorStatus', 'loading')
  store.commit('getNote', {
    id: 0,
    title: 'untitled.md',
    content: ''
  })
  setTimeout(() => {
    store.commit('changeEditorStatus', 'loaded')
  }, 10)
}

const editorStatus = computed(() => {
  return store.state.editorStatus
})


let forceLeave = false
onBeforeRouteLeave((to, from, next) => {
  if (forceLeave) {
    next(true)
    forceLeave = false
  }
  else if (to.path.indexOf('!force') >= 0) {
    forceLeave = true
    next(to.path.replace('!force', ''))
  }
  else {
    modalEmitter.emit('call-modal', {
      type: 'comfirm',
      title: 'do you really want to leave?',
      message: 'all content have not been saved may lost if you press confiem.',
      onModalConfirm() {
        next(true)
      },
      onModalCancel() {
        next(false)
      }
    })
  }
})

const openFile = () => {
  if (route.path == '/notes/new') {
    if (content.value != '') {
      modalEmitter.emit('call-modal', {
        type: 'comfirm',
        message: 'all content have not been saved will lost if you press confirm.',
        onModalConfirm: () => {
          if (fileSelector.value) {
            router.push('/notes/new')
            fileSelector.value.click()
          }
        },
        onModalCancel: () => {
          return;
        }
      })
    }
    else {
      modalEmitter.emit('call-modal', {
        type: 'comfirm',
        message: 'all content have not been saved will lost if you press confirm.',
        onModalConfirm: () => {
          if (fileSelector.value) {
            router.push('/notes/new')
            fileSelector.value.click()
          }
        },
        onModalCancel: () => {
          return;
        }
      })
    }
  }
  else {
    if (fileSelector.value) {
      router.push('/notes/new')
      fileSelector.value.click()
    }
  }
}

</script>

<template>
  <div>
    <Minimap />
    <div class="flex pt-4 h-screen">
      <div class="h-full w-[18%] max-w-sm hidden lg:block"></div>
      <div class="h-full w-full overflow-scroll scrollbar scrollbar-thin scrollbar-thumb-stone-300">
        <div
          class="container relative mb-32 mt-4 mx-auto min-h-screen max-w-[21cm] bg-white shadow rounded overflow-hidden"
        >
          <MarkdownEditor v-if="editorStatus == 'loaded'" />
          <div class="w-fit mx-auto mt-8 mb-8">
            <button
              @click="openFile"
              class="text-stone-900 bg-green-200 hover:bg-green-100 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >Open File</button>
          </div>
        </div>
      </div>
    </div>
    <input type="file" @change="loadTextFromFile" ref="fileSelector" hidden />
  </div>
</template>

<style scoped>
</style>
