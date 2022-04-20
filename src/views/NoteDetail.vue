<script lang='ts'>
let forceLeave = false

export const setForceLeave = (value: boolean): void => {
  forceLeave = value
}
</script>

<script setup lang='ts'>
import { computed, onBeforeMount, onMounted, ref } from 'vue'
import MarkdownEditor from '../components/MarkdownEditor.vue'
import { useRouter, useRoute, onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import Minimap from '../components/Minimap.vue'
import { modalEmitter } from '../components/ModalBase.vue'
import { useNoteStore } from '../stores/useNoteStore'
import { useUserStore } from '../stores/useUserStore'

const noteStore = useNoteStore()
const userStore = useUserStore()

const route = useRoute()
const router = useRouter()

const fileSelector = ref<HTMLElement | null>(null)

const isNoteOwner = computed(() => {
  return userStore.isSignedIn && userStore.id == noteStore.currentNote.author
})

const isNewNote = computed(() => {
  return noteStore.currentNote.id == -1
})

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
  noteStore.cleanNote()
}

onMounted(() => {
  window.onbeforeunload = () => {
    if (noteStore.currentNote.needSave) {
      return "Your work may lost if you close this page, continue? "
    }
  }
})

onBeforeRouteLeave((to, from, next) => {
  if (noteStore.currentNote.needSave == false) {
    next(true)
  }
  else if (forceLeave) {
    next(true)
    forceLeave = false
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
    if (noteStore.currentNote.needSave == true) {
      modalEmitter.emit('call-confirm-modal', {
        message: 'all content have not been saved will lost if you press confirm.',
        onModalConfirm: () => {
          if (fileSelector.value) {
            fileSelector.value.click()
          }
        },
        onModalCancel: () => {
          return;
        }
      })
    }
    else {
      if (fileSelector.value) {
        fileSelector.value.click()
      }
    }
  }
  else {
    modalEmitter.emit('call-confirm-modal', {
      message: 'all content in this note will be overrided if you press confirm.',
      onModalConfirm: () => {
        if (fileSelector.value) {
          fileSelector.value.click()
        }
      },
      onModalCancel: () => {
        return;
      }
    })
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
          <div v-if="isNoteOwner || isNewNote" class="w-fit mx-auto mt-8 mb-8">
            <button
              @click="openFile"
              class="text-stone-900 bg-green-200 hover:bg-green-100 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >Open File</button>
            <input type="file" @change="loadTextFromFile" ref="fileSelector" hidden />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
