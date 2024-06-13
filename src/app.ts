import { createApp } from 'vue'
import { useAppStore } from './store/modules'
import store from './store'
import component from './utils/component'
import { log } from './utils'
import './app.scss'

const App = createApp({
  onShow (options) {
    log.success('App onShow.')
  },
  onLaunch (options) {
    log.success('App onLaunch.')
    const appStore = useAppStore();
    appStore.setDeviceInfo();
  }
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

App.use(store)
component.install(App)  // 注册全局组件
export default App
