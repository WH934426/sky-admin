import { createPinia } from 'pinia';
import { useAppStore } from './modules/appStore';
const store = createPinia();

const appStore = useAppStore();

export default store;
export { appStore };
