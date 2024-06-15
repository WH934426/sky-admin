import globalComponents from '@/components'
import '@/router/permission.ts'
import 'normalize.css'
import 'virtual:svg-icons-register'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// 自定义组件
app.use(globalComponents)
app.use(router)
app.mount('#app')
