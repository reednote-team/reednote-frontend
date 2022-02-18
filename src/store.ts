import { createStore, storeKey } from 'vuex'
import axios, { AxiosError } from 'axios'
import { emitter } from './plugins/myHeadings'
import jwt_decode from 'jwt-decode'
const jwtDecode = jwt_decode

type NoteState = {
  editorStatus: 'loading' | 'loaded',
  currentNote: {
    id: number,
    title: string,
    content: string,
    hasPublic: boolean
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
    email?: string,
    name?: string,
  }
}

export type IState = NoteState & UserState

export default createStore<IState>({
  state: {
    editorStatus: 'loaded',
    currentNote: {
      id: 0,
      title: 'untitled',
      content: '',
      hasPublic: false
    },
    noteList: [],
    user: {
      isSignedIn: false
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
      if (note.hasPublic !== undefined) state.currentNote.hasPublic = note.hasPublic
      if (note.content !== undefined) {
        state.currentNote.content = note.content
        setTimeout(() => {
          emitter.emit('update-toc')
        }, 10)
      }
    },
    changeUserStatus(state, user: {
      isSignedIn: boolean,
      token?: string,
      id?: string,
      email?: string,
      name?: string
    }) {
      state.user = user
    }
  },
  actions: {
    async getNotes({ commit }) {
      const resp = await axios.get('/notes')
      const notes = resp.data.data
      commit('getNotes', notes)
    },
    async getNote({ commit, state }, id) {
      commit('changeEditorStatus', 'loading')
      const resp = await axios.get(`/notes/${id}`)
      const note = resp.data.data
      commit('getNote', note)
      commit('changeEditorStatus', 'loaded')
    },
    async postNote({ commit, state }) {
      const note = state.currentNote
      const resp = await axios.post(`/notes`, {
        "data": {
          title: note.title,
          content: note.content
        }
      })
      return resp
    },
    async putNote({ commit, state }) {
      const note = state.currentNote
      const resp = await axios.put(`/notes/${note.id}`, {
        "data": {
          title: note.title,
          content: note.content
        }
      })
    },
    async switchPublic({ commit, state }) {
      const note = state.currentNote
      const resp = await axios.put(`/notes/${note.id}`, {
        "data": {
          hasPublic: note.hasPublic
        }
      })
    },
    async deleteNote({ commit, state }) {
      axios.delete(`/notes/${state.currentNote.id}`)
    },
    async uploadNote({ commit, state }, file: File) {
      commit('changeEditorStatus', 'loading')
      const reader = new FileReader()
      reader.readAsText(file)
      reader.onload = () => {
        commit('getNote', {
          id: 0,
          title: file.name.replace('.md', ''),
          content: reader.result as string
        })
        commit('changeEditorStatus', 'loaded')
      }
    },
    async registerUser({ commit, dispatch }, user: { username: string, email: string, password: string }) {
      try {
        const resp = await axios.post('/auth/local/register', user)
        dispatch('validateUser', {
          identifier: user.email,
          password: user.password
        })
        return ''
      }
      catch (error) {
        return 'fail to register! email already exists.'
      }
    },
    async validateUser({ commit, state }, user: { identifier: string, password: string }) {
      try {
        const resp = await axios.post('/auth/local', user)
        commit('changeUserStatus', {
          isSignedIn: true,
          id: resp.data.user.id,
          email: resp.data.user.email,
          name: resp.data.user.username
        })
        localStorage.setItem("token", resp.data.jwt)
        axios.defaults.headers.common.Authorization = `Bearer ${resp.data.jwt}`
        return ''
      }
      catch (error) {
        return 'Fail to sign in, wrong email or password!'
      }
    },
    async keepUser({ commit, state }) {
      const token = localStorage.getItem('token')
      if (!token) {
        return
      }
      if (token && !state.user.isSignedIn) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`
        const resp = await axios.get(`/users/me`)
        commit('changeUserStatus', {
          isSignedIn: true,
          id: resp.data.id,
          email: resp.data.email,
          name: resp.data.username
        })
      }
    },
    logoutUser({ commit }) {
      delete axios.defaults.headers.common["Authorization"]
      localStorage.removeItem('token')
      commit('changeUserStatus', {
        isSignedIn: false
      })
      commit('getNotes', [])
    }
  }
})