import globalComponents from '@/components'
import 'normalize.css'
import 'virtual:svg-icons-register'
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// 自定义组件
app.use(globalComponents)
app.mount('#app')
