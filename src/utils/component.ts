import CustomNavbar from '@/components/navbar/index.vue'
import SvgIcon from '@/components/svg-icon/index.vue'

// 注册全局组件
export default {
  install: (app: any) => {
    app.component('CrewNavbar', CustomNavbar)
    app.component('SvgIcon', SvgIcon)
  }
}
