import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'axios'
import prism from 'prismjs'
import './index.css'
import 'prismjs/themes/prism.min.css'
import 'material-icons'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api'

prism.highlightAll()


const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
