import SvgIcon from './SvgIcon/index.vue'

// 将所有全局组件导入并导出
const allGlobalComponents: any = { SvgIcon }

export default {
  install(app: any) {
    // 遍历所有全局组件，并注册到Vue应用中
    Object.keys(allGlobalComponents).forEach((key: string) => {
      // 注册全局组件
      app.component(key, allGlobalComponents[key])
    })
  },
}
