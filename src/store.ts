import { createStore } from 'vuex'
import axios from 'axios'
import { emitter } from './plugins/myHeadings'

type NoteState = {
  editorStatus: 'loading' | 'loaded',
  currentNote: {
    id: number,
    title: string,
    content: string
  },
  noteList: {
    id: number,
    title: string
  }[]
}

type UserState = {
  user: {
    isSignedIn: boolean,
    id?: string,
    name?: string
  }
}

export type IState = NoteState & UserState

export default createStore<IState>({
  state: {
    editorStatus: 'loaded',
    currentNote: {
      id: 0,
      title: 'untitled.md',
      content: ''
    },
    noteList: [],
    user: {
      isSignedIn: true
    }
  },
  mutations: {
    changeEditorStatus(state, status) {
      state.editorStatus = status
    },
    getNotes(state, notes) {
      state.noteList = notes
    },
    getNote(state, note) {
      if (note.id !== undefined) state.currentNote.id = note.id
      if (note.title !== undefined) state.currentNote.title = note.title
      if (note.content !== undefined) {
        state.currentNote.content = note.content
        setTimeout(() => {
          emitter.emit('update-toc')
        }, 10)
      }
    }
  },
  actions: {
    async getNotes({ commit }) {
      const resp = await axios.get('/public-notes')
      const notes = resp.data.data
      commit('getNotes', notes)
    },
    async getNote({ commit, state }, id) {
      commit('changeEditorStatus', 'loading')
      const resp = await axios.get(`/public-notes/${id}`)
      const note = resp.data.data
      commit('getNote', note)
      commit('changeEditorStatus', 'loaded')
    },
    async postNote({ commit, state }) {
      const note = state.currentNote
      const resp = await axios.post(`/public-notes`, {
        "data": {
          title: note.title,
          content: note.content
        }
      })
    },
    async putNote({ commit, state }) {
      const note = state.currentNote
      const resp = await axios.put('/public-notes/${note.id}', {
        "data": {
          title: note.title,
          content: note.content
        }
      })
    },
    async deleteNote({ commit, state }) {
      axios.delete(`/public-notes/${state.currentNote.id}`)
    },
    async uploadNote({ commit, state }, file: File) {
      commit('changeEditorStatus', 'loading')
      const reader = new FileReader()
      reader.readAsText(file)
      reader.onload = () => {
        commit('getNote', {
          id: 0,
          title: file.name,
          content: reader.result as string
        })
        commit('changeEditorStatus', 'loaded')
      }
    }
  }
})