import CustomNavbar from '@/components/navbar/index.vue'
import SvgIcon from '@/components/svg-icon/index.vue'
import type { App } from 'vue'

// 注册全局组件
export function setupComponents(app: App) {
  app.component('TaroNavbar', CustomNavbar);
  app.component('SvgIcon', SvgIcon);
}
