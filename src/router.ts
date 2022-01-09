import { createRouter, createWebHistory } from "vue-router";
import NoteCreate from './views/NoteCreate.vue'
import NoteList from './views/NoteList.vue'
import NoteDetail from './views/NoteDetail.vue'
import SignIn from './views/SignIn.vue'
import SignUp from './views/SignUp.vue'

const webHistory = createWebHistory()

export default createRouter({
  history: webHistory,
  routes: [
    {
      path: '/',
      component: NoteCreate
    }, 
    {
      path: '/notes',
      component: NoteList
    },
    {
      path: '/notes/:id',
      component: NoteDetail
    },
    {
      path: '/sign-in',
      component: SignIn
    },
    {
      path: '/sign-up',
      component: SignUp
    },
  ]
})