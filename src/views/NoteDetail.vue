<script setup lang='ts'>
import { ref } from 'vue'
import MarkdownEditor from '../components/MarkdownEditor.vue'
import { useRouter, useRoute, onBeforeRouteLeave } from 'vue-router'
import Minimap from '../components/Minimap.vue'
import { modalEmitter } from '../components/ModalBase.vue'
import { useNoteStore } from '../stores/useNoteStore'

const noteStore = useNoteStore()

const route = useRoute()
const router = useRouter()

const fileSelector = ref<HTMLElement | null>(null)

const loadTextFromFile = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files?.length) {
    const file = target.files[0]
    noteStore.uploadNote(file)
  }
  target.value = ''
}

if (route.params.id) {
  noteStore.getNote(parseInt(route.params.id as string))
}

else {
  noteStore.editorStatus = 'loading'
  noteStore.currentNote.id = 0
  noteStore.currentNote.title = 'untitled'
  noteStore.currentNote.content = ''
  noteStore.currentNote.hasPublic = false
  setTimeout(() => {
    noteStore.editorStatus = 'loaded'
  }, 10)
}


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
    modalEmitter.emit('call-confirm-modal', {
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
    if (noteStore.currentNote.content != '') {
      modalEmitter.emit('call-confirm-modal', {
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
      modalEmitter.emit('call-confirm-modal', {
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
    <div class="flex pt-4 h-screen">
      <div class="h-full w-[18%] hidden lg:block">
        <Minimap />
      </div>
      <div class="h-full w-full overflow-scroll scrollbar scrollbar-thin scrollbar-thumb-stone-300">
        <div
          class="container relative mb-32 mt-4 mx-auto min-h-screen max-w-[21cm] bg-white shadow rounded overflow-hidden"
        >
          <MarkdownEditor v-if="noteStore.editorStatus == 'loaded'" />
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
