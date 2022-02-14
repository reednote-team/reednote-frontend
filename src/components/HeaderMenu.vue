<script setup lang='ts'>
import { computed, ref, } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { IState } from '../store'
import { modalEmitter } from './Modal.vue'
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
  return store.state.user.name
})

const onClickFilenameTag = () => {
  modalEmitter.emit('call-modal', {
    title: 'File name',
    type: 'filenameInput',
    onModalConfirm: () => {
      return
    }
  })
}

const displayFilenameTag = computed(() => {
  return route.path.match(/\/notes\//) != null
})

const isANewNote = computed(() => {
  return store.state.currentNote.id == 0
})

const create = () => {
  if (route.path == '/notes/new') {
    if (content.value != '') {
      modalEmitter.emit('call-modal', {
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
      modalEmitter.emit('call-modal', {
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

const upload = async () => {
  if (filename.value == 'untitled.md')
    modalEmitter.emit('call-modal', {
      title: 'Save as',
      type: 'filenameInput',
      onModalConfirm: () => { }
    })
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

const deleteNote = () => {
  modalEmitter.emit('call-modal', {
    type: 'comfirm',
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

const download = () => {
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

// let FileDropdownItems: IItem[] = [
//   {
//     name: 'new',
//     disabled: ref(false),
//     action: create
//   },
//   {
//     name: 'save',
//     disabled: computed(() => {
//       return content.value == ''
//     }),
//     action: save
//   },
//   {
//     name: 'delete',
//     disabled: computed(() => {
//       return id.value == 0
//     }),
//     action: deleteNote
//   },
//   {
//     name: 'download',
//     disabled: computed(() => {
//       return content.value == ''
//     }),
//     action: download
//   },
// ]

const profile = () => {
  router.push('/profile')
}

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
      <div class="bg-stone-800 px-1 text-white rounded-full">
        <span class="material-icons-round relative top-1">account_circle</span>
      </div>
    </HeaderButton>
    <HeaderButton :disabled="!userSignedIn" @click="profile">
      <div class="bg-lime-800 px-1 text-white rounded-full">
        <span class="material-icons-round relative top-1">account_circle</span>
        <span class="mx-1 relative bottom-0.5 text-lg font-bold hidden md:inline">{{ username }}</span>
      </div>
    </HeaderButton>
    <HeaderButton :disabled="!displayFilenameTag" @click="onClickFilenameTag">
      <div class="bg-slate-700 px-1 text-white rounded-full">
        <span class="material-icons-round relative top-1">cloud_circle</span>
        <span class="mx-1 relative bottom-0.5 text-lg font-bold hidden md:inline">{{ filename }}</span>
      </div>
    </HeaderButton>
    <HeaderButton :disabled="!displayFilenameTag || !userSignedIn" @click="upload">
      <div class="bg-blue-800 px-1 text-white rounded-full">
        <span class="material-icons-round relative top-1">arrow_circle_up</span>
      </div>
    </HeaderButton>
    <HeaderButton :disabled="!displayFilenameTag || !userSignedIn || isANewNote" @click="download">
      <div class="bg-purple-800 px-1 text-white rounded-full">
        <span class="material-icons-round relative top-1">arrow_circle_down</span>
      </div>
    </HeaderButton>
    <HeaderButton :disabled="!displayFilenameTag || !userSignedIn || isANewNote" @click="deleteNote">
      <div class="bg-red-800 px-1 text-white rounded-full">
        <span class="material-icons-round relative top-1">remove_circle_outline</span>
      </div>
    </HeaderButton>
    <HeaderButton :disabled="displayFilenameTag || !userSignedIn" @click="create">
      <div class="bg-green-700 px-1 text-white rounded-full">
        <span class="material-icons-round relative top-1">add_circle_outline</span>
      </div>
    </HeaderButton>
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
</template>

<style scoped>
</style>
