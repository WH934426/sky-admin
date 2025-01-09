import { createPinia } from 'pinia';

const store = createPinia();

export default store;
export * from './modules/appStore';
export * from './modules/userStore';
