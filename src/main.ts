import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import prism from 'prismjs'
import './index.css'
import 'prismjs/themes/prism-dark.css'
import 'material-icons'

// axios.defaults.baseURL = import.meta.env.PROD ? 'https://rnapi.kevyn.cn/api' : 'http://localhost:1779/api'
axios.defaults.baseURL = 'https://rnapi.kevyn.cn/api'

prism.highlightAll()


const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
