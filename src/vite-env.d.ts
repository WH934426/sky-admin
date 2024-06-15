/// <reference types="vite/client" />

// 识别vue文件
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 读取.env文件
interface ImportMetaEnv {
  readonly VITE_APP_PREFIX: string
  readonly VITE_APP_URL: string
  readonly VITE_APP_TITLE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
