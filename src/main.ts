import '@/styles/reset.scss'; // 清除默认样式
import '@/styles/index.scss'; // 引入全局样式
import 'element-plus/dist/index.css'; // 组件库样式
import 'virtual:svg-icons-register'; // 注册svg插件

import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

app.mount('#app');
