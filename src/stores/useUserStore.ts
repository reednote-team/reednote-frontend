import { defineStore } from 'pinia'
import axios from 'axios'

type UserStore = {
  isSignedIn: boolean,
  id: number,
  email: string,
  name: string,
  registerUser: (user: { username: string, email: string, password: string }) => Promise<string>,
  validateUser: (user: { identifier: string, password: string }) => Promise<string>,
  recoverUser: () => void,
  removeUser: () => void
}

export const useUserStore = defineStore('user', (): UserStore => ({
  isSignedIn: false,
  id: -1,
  email: '',
  name: '',
  async registerUser(user) {
    try {
      const resp = await axios.post('/auth/local/register', user)
      this.validateUser({
        identifier: user.email,
        password: user.password
      })
      return ''
    }
    catch (error) {
      return 'fail to register! email already exists.'
    }
  },
  async validateUser(user) {
    try {
      const resp = await axios.post('/auth/local', user)
      this.isSignedIn = true
      this.id = resp.data.user.id
      this.email = resp.data.user.email
      this.name = resp.data.user.username
      localStorage.setItem("token", resp.data.jwt)
      axios.defaults.headers.common.Authorization = `Bearer ${resp.data.jwt}`
      return ''
    }
    catch (error) {
      return 'Fail to sign in, wrong email or password!'
    }
  },
  async recoverUser() {
    const token = localStorage.getItem('token')
    if (!token) {
      return
    }
    if (token && !this.isSignedIn) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
      const resp = await axios.get(`/users/me`)
      this.isSignedIn = true
      this.id = resp.data.id
      this.email = resp.data.email
      this.name = resp.data.username
    }
  },
  removeUser() {
    delete axios.defaults.headers.common["Authorization"]
    localStorage.removeItem('token')
    this.isSignedIn = false
    this.id = -1
    this.email = ''
    this.name = ''
    // commit('getNotes', [])
  }
}))