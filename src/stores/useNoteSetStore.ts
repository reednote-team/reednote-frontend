import { defineStore } from "pinia";
import axios from 'axios'

export type NoteSet = {
  id: number,
  name: string,
  description: string,
  owner: number,
  color: string
}

type NoteSetStore = {
  nullSet: NoteSet,
  noteSetList: NoteSet[],
  getNoteSets: () => void,
}

export const useNoteSetStore = defineStore('note-set', (): NoteSetStore => ({

  nullSet: {
    id: -1,
    name: 'No Set',
    description: 'these notes belong to no set!',
    owner: -1,
    color: 'bg-stone-100'
  },

  noteSetList: [],

  async getNoteSets() {

    const resp = await axios.get('/note-sets')
    this.noteSetList = resp.data.data
    this.noteSetList.push(this.nullSet)

  }


}))
