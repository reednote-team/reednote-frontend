import { createStore } from 'vuex'
import axios from 'axios'

type User = {
  isSignedIn: boolean,
  id?: string,
  name?: string
}

type NoteInfo = {
  id: number,
  title: string
}

type CurrentNote = NoteInfo & { content: string }

type NoteList = {
  count: number,
  data: NoteInfo[]
}

export type IState = {
  status: 'loading' | 'loaded',
  error?: string,
  user: User,
  currentNote: CurrentNote,
  noteList: NoteList
}

export default createStore<IState>({
  state: {
    status: 'loaded',
    user: {
      isSignedIn: true
    },
    currentNote: {
      id: 0,
      title: 'untitled.md',
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
      state.currentNote.title = name
    },
    updateCurrentNoteId(state, id) {
      state.currentNote.id = id
    },
    updateCurrentNoteContent(state, content: string) {
      state.currentNote.content = content
    },
    updateStatus(state, status: 'loading' | 'loaded') {
      state.status = status
    }
  },
  actions: {
    async fetchNoteList(store) {
      const resp = await axios.get('/public-notes')
      const notes: NoteInfo[] = resp.data.data
      console.log(notes);
      store.commit('updateNoteList', {
        count: notes.length,
        data: notes
      })
    },
    async saveNote(store) {
      const note: CurrentNote = store.state.currentNote
      if (note.id) {
        const resp = await axios.put(`/public-notes/${note.id}`, {
          "data": {
            title: note.title,
            content: note.content
          }
        })
      }
      else {
        const resp = await axios.post('/public-notes', {
          "data": {
            title: note.title,
            content: note.content
          }
        })
      }
    },
    async deleteNote(store) {
      axios.delete(`/public-notes/${store.state.currentNote.id}`)
    },
    async updateCurrentNoteContentFromServer(store, id) {
      store.commit('updateStatus', 'loading')
      const resp = await axios.get(`/public-notes/${id}`)
      const note: CurrentNote = resp.data.data
      store.commit('updateCurrentNoteContent', note.content)
      store.commit('updateCurrentNoteName', note.title)
      store.commit('updateCurrentNoteId', note.id)
      store.commit('updateStatus', 'loaded')
    },
    updateCurrentNoteContentFromFile(store, file: File) {
      store.commit('updateStatus', 'loading')
      const reader = new FileReader()
      reader.readAsText(file)
      reader.onload = () => {
        store.commit('updateCurrentNoteContent', reader.result as string)
        store.commit('updateCurrentNoteName', file.name)
        store.commit('updateCurrentNoteId', 0)
        store.commit('updateStatus', 'loaded')
      }
    },
  }
})