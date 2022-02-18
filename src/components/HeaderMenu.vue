<script setup lang='ts'>
import { computed, ref, Ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { IState } from '../store'
import { modalEmitter } from './ModalBase.vue'
import { alertEmitter } from './Alert.vue'
import HeaderButton from './HeaderButton.vue'


const router = useRouter()
const route = useRoute()
const store = useStore<IState>()

const id = computed(() => {
  return store.state.currentNote.id
})

const filename = computed(() => {
  return store.state.currentNote.title
})

const content = computed(() => {
  return store.state.currentNote.content
})

const username = computed(() => {
  return store.state.user.name ? store.state.user.name : ''
})

const isInNoteView = () => {
  return route.path.match(/\/notes\//) != null
}

const isANewNote = () => {
  return store.state.currentNote.id == 0
}

const isUserSignedIn = () => {
  return store.state.user.isSignedIn
}

type IItem = {
  role: string,
  bgColor: string,
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
              store.commit('changeEditorStatus', 'loading')
              store.commit('getNote', {
                id: 0,
                title: 'untitled',
                content: ''
              })
              setTimeout(() => {
                store.commit('changeEditorStatus', 'loaded')
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
    bgColor: 'bg-blue-800',
    icon: 'arrow_circle_up',
    text: null,
    disabled: computed(() => {
      return !isInNoteView() || !isUserSignedIn()
    }),
    onClick: async () => {
      if (filename.value == 'untitled')
        modalEmitter.emit('call-note-info-modal', {})
      if (store.state.currentNote.id == 0) {
        const resp = await store.dispatch('postNote')
        router.push(`/notes/${resp.data.data.id}!force`)
        store.state.currentNote.id = resp.data.data.id
      }
      else await store.dispatch('putNote')
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
      let text = store.state.currentNote.content
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
          store.dispatch('deleteNote')
          alertEmitter.emit('call-alert', {
            title: 'SUCCESS',
            body: 'Successfully deleted this note!',
            keep: 3000
          })
          router.push('/!force')
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
      <div class="px-1 text-white rounded-md" :class="`${item.bgColor}`">
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
