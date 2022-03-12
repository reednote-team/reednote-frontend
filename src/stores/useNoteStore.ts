import { defineStore } from "pinia";
import axios from 'axios'

type CurrentNote = {
  id: number,
  title: string,
  author: number,
  noteSet: number,
  content: string,
  hasPublic: boolean
}

type CurrentNoteStatus = {
  needSave: boolean,
  lastSave: string,
  outline: {
    textID: string,
    level: number
  }[],
}

type NoteStore = {
  editorStatus: 'loading' | 'loaded',
  currentNote: CurrentNote & CurrentNoteStatus,
  noteList: {
    id: number,
    title: string,
    author: string,
    noteSet: number,
    hasPublic: boolean
  }[],
  getNotes: () => void,
  getNote: (id: number) => void,
  cleanNote: () => void,
  checkNeedSave: () => void
  postNote: () => Promise<any>,
  putNote: () => Promise<any>,
  patchNote: (patchData: Partial<CurrentNote>) => void,
  deleteNote: () => void,
  uploadNote: (file: File) => void
}

export const useNoteStore = defineStore('note', (): NoteStore => ({
  editorStatus: 'loaded',
  currentNote: {
    id: -1,
    title: 'untitled',
    author: -1,
    content: '',
    noteSet: -1,
    needSave: false,
    lastSave: '',
    outline: [],
    hasPublic: false
  },
  noteList: [],
  async getNotes() {
    const resp = await axios.get('/notes')
    const notes = resp.data.data
    this.noteList = notes
  },
  async getNote(id) {
    this.editorStatus = 'loading'
    const resp = await axios.get(`/notes/${id}`)
    const note = resp.data.data
    this.currentNote = {
      ...note,
      needSave: false,
      lastSave: note.content,
      outline: []
    }
    this.editorStatus = 'loaded'
  },
  cleanNote() {
    this.editorStatus = 'loading'
    this.currentNote.id = -1
    this.currentNote.title = 'untitled'
    this.currentNote.content = ''
    this.currentNote.lastSave = ''
    this.currentNote.author = -1
    this.currentNote.hasPublic = false
    setTimeout(() => {
      this.editorStatus = 'loaded'
    }, 10)
  },
  checkNeedSave() {
    this.currentNote.needSave = this.currentNote.content !== this.currentNote.lastSave
  },
  async postNote() {
    const note = this.currentNote
    const resp = await axios.post(`/notes`, {
      "data": {
        title: note.title,
        content: note.content
      }
    })
    this.currentNote = {
      ...resp.data.data,
      needSave: false
    }
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
    this.currentNote.needSave = false
    this.currentNote.lastSave = this.currentNote.content
  },
  async patchNote(patchData: Partial<CurrentNote>) {
    if (this.currentNote.id == -1)
      return
    const note = this.currentNote
    const resp = await axios.put(`/notes/${note.id}`, {
      "data": {
        ...patchData
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
      this.currentNote.title = file.name.replace('.md', ''),
      this.currentNote.content = reader.result as string
      this.editorStatus = 'loaded'
      this.currentNote.needSave = true
    }
  }
}))