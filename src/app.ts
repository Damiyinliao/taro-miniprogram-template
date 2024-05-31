import { createApp } from 'vue'
import store from './store'
import { useAppStore } from './store/modules'
import './app.scss'

const App = createApp({
  onShow (options) {
    console.log('App onShow.')
  },
  onLaunch (options) {
    console.log('App onLaunch.')
    const appStore = useAppStore();
    appStore.setDeviceInfo();
  }
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

App.use(store)
export default App
