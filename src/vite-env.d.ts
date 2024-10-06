/// <reference types="vite/client" />

// 识别.vue文件
declare module '*.vue' {
	import { DefineComponent } from 'vue';
	// eslint-disable-next-line @typescript-eslint/no-empty-object-type
	const component: DefineComponent<{}, {}, any>;
	export default component;
}

// 识别.env
interface ImportMetaEnv {
	readonly VITE_APP_BASE_URL: string;
	readonly VITE_APP_API_URL: string;
	readonly VITE_APP_SOCKET_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
