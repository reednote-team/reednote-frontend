<script setup lang='ts'>
import { computed, ref, Ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { modalEmitter } from './ModalBase.vue'
import { alertEmitter } from './Alert.vue'
import HeaderButton from './HeaderButton.vue'
import { useUserStore } from '../stores/useUserStore'
import { useNoteStore } from '../stores/useNoteStore'
import { setForceLeave } from '../views/NoteDetail.vue'

const userStore = useUserStore()
const noteStore = useNoteStore()

const router = useRouter()
const route = useRoute()

const id = computed(() => {
  return noteStore.currentNote.id
})

const filename = computed(() => {
  return noteStore.currentNote.title
})

const content = computed(() => {
  return noteStore.currentNote.content
})

const username = computed(() => {
  return userStore.name
})

const isInNoteView = () => {
  return route.path.match(/\/notes\//) != null
}

const isANewNote = () => {
  return noteStore.currentNote.id == -1
}

const isUserSignedIn = () => {
  return userStore.isSignedIn
}

type IItem = {
  role: string,
  bgColor: string | Ref<string>,
  icon: string,
  text: null | Ref<string>,
  disabled: Ref<boolean>,
  onClick: () => void
}

const headerMenuItems: IItem[] = [
  {
    role: 'sign in button',
    bgColor: 'bg-stone-800',
    icon: 'account_circle',
    text: null,
    disabled: computed(() => {
      return isUserSignedIn()
    }),
    onClick: () => {
      router.push('/sign-in')
    }
  },


  {
    role: 'user account button',
    bgColor: 'bg-lime-800',
    icon: 'account_circle',
    text: username,
    disabled: computed(() => {
      return !isUserSignedIn()
    }),
    onClick: () => {
      router.push('/profile')
    }
  },


  {
    role: 'advanced operations on current note',
    bgColor: 'bg-cyan-800',
    icon: 'cloud_circle',
    text: filename,
    disabled: computed(() => {
      return !isInNoteView()
    }),
    onClick: () => {
      modalEmitter.emit('call-note-info-modal', {})
    }
  },


  {
    role: 'create new note',
    bgColor: 'bg-green-800',
    icon: 'add_circle_outline',
    text: null,
    disabled: computed(() => {
      return !isUserSignedIn() || isInNoteView()
    }),
    onClick: () => {
      if (route.path == '/notes/new') {
        if (content.value != '') {
          modalEmitter.emit('call-confirm-modal', {
            message: 'all content have not been saved will lost if you press confirm.',
            onModalConfirm: () => {
              noteStore.editorStatus = 'loading'
              noteStore.currentNote.id = 0
              noteStore.currentNote.title = 'untitled',
              noteStore.currentNote.content = ''
              setTimeout(() => {
                noteStore.editorStatus = 'loaded'
              }, 10)
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
              router.push('/notes/new')
            },
            onModalCancel: () => {
              return;
            }
          })
        }
      }
      else {
        router.push('/notes/new')
      }
    }
  },


  {
    role: 'upload note to cloud',
    bgColor: computed(() => {
      return noteStore.currentNote.needSave ? 'bg-blue-700' : 'bg-gray-700'
    }),
    icon: 'arrow_circle_up',
    text: null,
    disabled: computed(() => {
      return !isInNoteView() || !isUserSignedIn()
    }),
    onClick: async () => {
      if (!noteStore.currentNote.needSave)
        return
      if (noteStore.currentNote.id == -1) {
        const resp = await noteStore.postNote()
        setForceLeave(true)
        router.push(`/notes/${resp.data.data.id}`)
        noteStore.currentNote.id = resp.data.data.id
      }
      else {
        await noteStore.putNote()
      }
      alertEmitter.emit('call-alert', {
        title: 'SUCCESS',
        body: 'Successfully uploaded this note!',
        keep: 3000
      })
    }
  },


  {
    role: 'download note as file',
    bgColor: 'bg-purple-800',
    icon: 'arrow_circle_down',
    text: null,
    disabled: computed(() => {
      return !isInNoteView() || isANewNote()
    }),
    onClick: async () => {
      let text = noteStore.currentNote.content
      let blob = new Blob([text], { type: 'text/plain' })
      let link = document.createElement("a")
      link.download = filename.value + '.md'
      link.href = window.URL.createObjectURL(blob)
      document.body.appendChild(link)
      link.click()
      setTimeout(() => {
        document.body.removeChild(link)
        window.URL.revokeObjectURL(link.href)
      }, 100)
    }
  },


  {
    role: 'delete note from cloud',
    bgColor: 'bg-rose-800',
    icon: 'remove_circle_outline',
    text: null,
    disabled: computed(() => {
      return !isInNoteView() || !isUserSignedIn() || isANewNote()
    }),
    onClick: () => {
      modalEmitter.emit('call-confirm-modal', {
        message: 'do you really want to delete this note?',
        onModalConfirm: () => {
          noteStore.deleteNote()
          alertEmitter.emit('call-alert', {
            title: 'SUCCESS',
            body: 'Successfully deleted this note!',
            keep: 3000
          })
          setForceLeave(true)
          router.push('/')
        },
        onModalCancel: () => {
          return;
        }
      })
    }
  },

]

</script>

<template>
  <div class="flex space-x-2 mr-2 pt-3.5">
    <HeaderButton
      v-for="item in headerMenuItems"
      :disabled="item.disabled.value"
      @click="item.onClick"
    >
      <div class="px-1 text-white rounded-md" :class="`${typeof item.bgColor === 'string' ? item.bgColor : item.bgColor.value}`">
        <span class="material-icons-round relative top-1" style="font-size: 30px;">{{ item.icon }}</span>
        <span
          v-if="item.text"
          class="mx-1 relative bottom-1 text-xl font-bold hidden md:inline"
        >{{ item.text.value }}</span>
      </div>
    </HeaderButton>
  </div>
</template>

<style scoped>
</style>
