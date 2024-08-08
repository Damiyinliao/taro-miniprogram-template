import { createApp } from 'vue';
import { setupStore, useAppStore } from './store';
import { setupComponents } from './components';
// import { setupRouter } from './router';
import { createUI } from 'taro-ui-vue3';
import { log } from './utils';
import './app.scss';
// 引用全部组件
const tuv3 = createUI()

const App = createApp({
  onShow (options) {
    log.success('App onShow.');
  },
  onLaunch (options) {
    log.success('App onLaunch.');
    const appStore = useAppStore();
    appStore.setDeviceInfo();
  }
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
});
App.use(tuv3);
setupStore(App);
setupComponents(App);  // 注册全局组件
// setupRouter(App); // 使用vue-router时，需要将pages改为 ['layout/index/index']，只可填写一个根页面
export default App;
