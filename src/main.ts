import '@/styles/reset.scss' // 清除默认样式
import '@/styles/index.scss' // 引入全局样式

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.mount('#app')
