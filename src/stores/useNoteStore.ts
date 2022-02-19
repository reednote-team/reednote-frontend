import { TOCEmitter } from './../plugins/myHeadings'
import { defineStore } from "pinia";
import axios from 'axios'

type NoteStore = {
  editorStatus: 'loading' | 'loaded',
  currentNote: {
    id: number,
    title: string,
    author: number,
    content: string,
    hasPublic: boolean
  },
  noteList: {
    id: number,
    title: string
  }[],
  getNotes: () => void,
  getNote: (id: number) => void,
  postNote: () => Promise<any>,
  putNote: () => void,
  patchNote: () => void,
  deleteNote: () => void,
  uploadNote: (file: File) => void
}

export const useNoteStore = defineStore('note', (): NoteStore => ({
  editorStatus: 'loaded',
    currentNote: {
      id: 0,
      title: 'untitled',
      author: -1,
      content: '',
      hasPublic: false
    },
    noteList: [],
    async getNotes() {
      const resp = await axios.get('/notes')
      const notes = resp.data.data
      this.noteList =  notes
    },
    async getNote(id) {
      this.editorStatus = 'loading'
      const resp = await axios.get(`/notes/${id}`)
      const note = resp.data.data
      this.currentNote = note
      this.editorStatus = 'loaded'
      setTimeout(() => {
        TOCEmitter.emit('update-toc')
      }, 10)
    },
    async postNote() {
      const note = this.currentNote
      const resp = await axios.post(`/notes`, {
        "data": {
          title: note.title,
          content: note.content
        }
      })
      return resp
    },
    async putNote() {
      if (this.currentNote.id == -1)
        return
      const note = this.currentNote
      const resp = await axios.put(`/notes/${note.id}`, {
        "data": {
          title: note.title,
          content: note.content
        }
      })
    },
    async patchNote() {
      if (this.currentNote.id == -1)
        return
      const note = this.currentNote
      const resp = await axios.put(`/notes/${note.id}`, {
        "data": {
          hasPublic: note.hasPublic
        }
      })
    },
    async deleteNote() {
      axios.delete(`/notes/${this.currentNote.id}`)
    },
    async uploadNote(file: File) {
      this.editorStatus = 'loading'
      const reader = new FileReader()
      reader.readAsText(file)
      reader.onload = () => {
        this.currentNote.id = 0,
        this.currentNote.title = file.name.replace('.md', ''),
        this.currentNote.content = reader.result as string
        this.editorStatus = 'loaded'
      }
    }
}))