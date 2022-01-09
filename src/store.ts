import { createStore } from 'vuex'
import axios from 'axios'

interface NoteInfo {
  name: string,
  id: string
}

interface NoteList {
  count: number,
  data: NoteInfo[]
}

type CurrentNote = NoteInfo & { content: string }

export interface IState {
  status: 'loading' | 'loaded',
  error?: string,
  user: {
    isLogin: boolean,
    id?: string,
    name?: string
  },
  currentNote: CurrentNote,
  noteList: NoteList
}

export default createStore<IState>({
  state: {
    status: 'loaded',
    user: {
      isLogin: true
    },
    currentNote: {
      id: '', 
      name: '',
      content: ''
    },
    noteList: {
      count: 0,
      data: []
    }
  },
  mutations: {
    updateNoteList(state, noteList: NoteList) {
      state.noteList = noteList
    },
    updateContent(state, content: string) {
      state.currentNote.content = content
    },
    updateStatus(state, status: 'loading' | 'loaded') {
      state.status = status
    }
  },
  actions: {
    fetchNoteList(store) {
      axios.get('/notes').then((resp) => {
        const notes: NoteList = JSON.parse(resp.data)
        store.commit('updateNoteList', notes)
      })
    },
    updateContentFromServer(store, id) {
      store.commit('updateStatus', 'loading')
      axios.get(`/notes/${id}`).then((resp) => {
        const note: CurrentNote = JSON.parse(resp.data)
        store.commit('updateContent', note.content)
        store.commit('updateStatus', 'loaded')
      })
    },
    updateContentFromFile(store, file) {
      store.commit('updateStatus', 'loading')
      const reader = new FileReader()
      reader.readAsText(file)
      reader.onload = () => {
        store.commit('updateContent', reader.result as string)
        store.commit('updateStatus', 'loaded')
      }
    },
  }
})