import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'axios'
import prism from 'prismjs'
import './index.css'
import 'prismjs/themes/prism-dark.css'
import 'material-icons'

axios.defaults.baseURL = 'http://localhost:1337/api'
// axios.defaults.baseURL = 'https://rnapi.kevyn.cn/api'

prism.highlightAll()


const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
