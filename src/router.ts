import { createRouter, createWebHistory } from "vue-router";
import NoteList from './views/NoteList.vue'
import NoteDetail from './views/NoteDetail.vue'
import SignIn from './views/SignIn.vue'
import SignUp from './views/SignUp.vue'
import Profile from './views/Profile.vue'

const webHistory = createWebHistory()

export default createRouter({
  history: webHistory,
  routes: [
    {
      path: '/',
      component: NoteList
    }, 
    {
      path: '/notes',
      component: NoteList
    },
    {
      path: '/notes/new',
      component: NoteDetail
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
    {
      path: '/profile',
      component: Profile
    }
  ]
})