import type { App } from 'vue'
import Tabs from './components/tabs.vue'

// 具名导出组件
export { Tabs }

// 默认导出组件
export default Tabs

// 可选：插件安装函数（使用时 app.use(install)）
export const install = (app: App) => {
  app.component('V3Tabs', Tabs)
}

// 再导出对外类型（需确保已有 src/types.ts）
export * from './types'
