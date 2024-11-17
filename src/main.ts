import '@/styles/reset.scss'; // 清除默认样式
import '@/styles/index.scss'; // 引入全局样式
import 'element-plus/dist/index.css'; // 组件库样式
import * as ElementPlusIconsVue from '@element-plus/icons-vue'; // 引入icon
import 'virtual:svg-icons-register'; // 注册svg插件
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // 注册vue-router
import store from './stores'; // 注册pinia

const app = createApp(App);
app.use(router);
app.use(store);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component);
}
app.mount('#app');
