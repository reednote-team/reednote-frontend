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
      name: 'untitled.md',
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
    updateCurrentNoteName(state, name) {
      state.currentNote.name = name
    },
    updateCurrentNoteId(state, id) {
      state.currentNote.id = id
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
    saveNote(store) {
      const note = store.state.currentNote
      if (note.id) {
        axios.put(`/notes/${note.id}`, note).then((resp) => {
          console.log(resp)
        })
      }
      else {
        axios.post('/notes', note).then((resp) => {
          console.log(resp)
        })
      }
    },
    deleteNote(store, id) {
      axios.delete(`/notes/${id}`).then((resp) => {
        console.log(resp)
      })
    },
    updateContentFromServer(store, id) {
      store.commit('updateStatus', 'loading')
      axios.get(`/notes/${id}`).then((resp) => {
        const note: CurrentNote = JSON.parse(resp.data)
        store.commit('updateContent', note.content)
        store.commit('updateCurrentNoteName', note.name)
        store.commit('updateCurrentNoteId', note.id)
        store.commit('updateStatus', 'loaded')
      })
    },
    updateContentFromFile(store, file: File) {
      store.commit('updateStatus', 'loading')
      const reader = new FileReader()
      reader.readAsText(file)
      reader.onload = () => {
        store.commit('updateContent', reader.result as string)
        store.commit('updateCurrentNoteName', file.name)
        store.commit('updateCurrentNoteId', '')
        store.commit('updateStatus', 'loaded')
      }
    },
  }
})