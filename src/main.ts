import globalComponents from '@/components'
import '@/router/permission.ts'
import 'element-plus/dist/index.css'
import 'normalize.css'
import 'virtual:svg-icons-register'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'

const app = createApp(App)

// 自定义组件
app.use(globalComponents)
app.use(router)
app.use(pinia)
app.mount('#app')
