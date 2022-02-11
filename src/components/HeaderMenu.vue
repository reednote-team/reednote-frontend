<script setup lang='ts'>
import { computed, ref, } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { IState } from '../store'
import { emitter } from './Modal.vue'
import HeaderButton from './HeaderButton.vue'
import HeaderDropdown, { IItem } from './HeaderDropdown.vue'

const router = useRouter()
const route = useRoute()
const store = useStore<IState>()
const id = computed(() => {
  return store.state.currentNote.id
})
const name = computed(() => {
  return store.state.currentNote.title
})
const content = computed(() => {
  return store.state.currentNote.content
})
const username = computed(() => {
  return store.state.user.name
})
const fileSelector = ref<HTMLElement | null>(null)

const loadTextFromFile = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files?.length) {
    const file = target.files[0]
    store.dispatch('uploadNote', file)
  }
  target.value = ''
}

let FileDropdownItems: IItem[] = [
  {
    name: 'new',
    disabled: ref(false),
    action: () => {
      if (route.path == '/notes/new') {
        if (content.value != '') {
          emitter.emit('call-modal', {
            type: 'comfirm',
            message: 'all content have not been saved will lost if you press confirm.',
            onModalConfirm: () => {
              store.commit('changeEditorStatus', 'loading')
              store.commit('getNote', {
                id: 0,
                title: 'untitled.md',
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
          emitter.emit('call-modal', {
            type: 'comfirm',
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
    name: 'save',
    disabled: computed(() => {
      return content.value == ''
    }),
    action: () => {
      if (name.value == 'untitled.md')
        emitter.emit('call-modal', {
          title: 'Save as',
          type: 'filenameInput',
          onModalConfirm: () => {
            if (store.state.currentNote.id == 0) store.dispatch('postNote')
            else store.dispatch('putNote')
          }
        })
      else {
        if (store.state.currentNote.id == 0) store.dispatch('postNote')
        else store.dispatch('putNote')
      }
    }
  },
  {
    name: 'delete',
    disabled: computed(() => {
      return id.value == 0
    }),
    action: () => {
      emitter.emit('call-modal', {
        type: 'comfirm',
        message: 'do you really want to delete this note?',
        onModalConfirm: () => {
          store.dispatch('deleteNote')
          router.push('/')
        },
        onModalCancel: () => {
          return;
        }
      })
    }
  },
  {
    name: 'upload',
    disabled: computed(() => {
      return false
    }),
    action: () => {
      if (route.path == '/notes/new') {
        if (content.value != '') {
          emitter.emit('call-modal', {
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
          emitter.emit('call-modal', {
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
  },
  {
    name: 'download',
    disabled: computed(() => {
      return content.value == ''
    }),
    action: () => {
      let text = store.state.currentNote.content
      let blob = new Blob([text], { type: 'text/plain' })
      let link = document.createElement("a")
      link.download = name.value
      link.href = window.URL.createObjectURL(blob)
      document.body.appendChild(link)
      link.click()
      setTimeout(() => {
        document.body.removeChild(link)
        window.URL.revokeObjectURL(link.href)
      }, 100);
    }
  },
]

const userDropdownItems = [
  {
    name: 'Profile',
    disabled: computed(() => {
      return false
    }),
    action: () => {
      router.push('/profile')
    }
  },
  {
    name: 'Logout',
    disabled: computed(() => {
      return false
    }),
    action: () => {
      store.dispatch('logoutUser')
      router.push('/')
    }
  },
]

const showTOCButton = computed(() => {
  return route.path.match(/\/notes\//)
})

const userSignedIn = computed(() => {
  return store.state.user.isSignedIn
})

</script>

<template>
  <div v-if="true" class="flex space-x-2 mr-2">
    <HeaderButton :disabled="userSignedIn" @click="router.push('/sign-in')">
      <span class="material-icons-round">account_circle</span>
    </HeaderButton>
    <HeaderDropdown :disabled="!userSignedIn" :items="userDropdownItems">
      <HeaderButton :disabled="false">
        <span class="hidden material-icons-round">{{ username?.charAt(0).toUpperCase() }}</span>
      </HeaderButton>
    </HeaderDropdown>
    <HeaderButton :disabled="!showTOCButton || !userSignedIn">
      <span class="material-icons-round">view_list</span>
    </HeaderButton>
    <HeaderDropdown :disabled="!userSignedIn" :items="FileDropdownItems">
      <HeaderButton :disabled="false">
        <span class="material-icons-round">file_present</span>
      </HeaderButton>
    </HeaderDropdown>
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
  <input type="file" @change="loadTextFromFile" ref="fileSelector" hidden />
</template>

<style scoped>
</style>
