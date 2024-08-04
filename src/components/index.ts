import CustomNavbar from '@/components/taro-navbar/index.vue';
import SvgIcon from '@/components/svg-icon/index.vue';
import ExampleItem from '@/components/example-item/index.vue';
import FontIcon from '@/components/font-icon/index.vue';
import PageTitle from '@/components/page-title/index.vue';
import PageWrapper from '@/components/page-wrapper/index.vue';
import type { App } from 'vue'

// 注册全局组件
export function setupComponents(app: App) {
  app.component('TaroNavbar', CustomNavbar);
  app.component('SvgIcon', SvgIcon);
  app.component('FontIcon', FontIcon);
  app.component('ExampleItem', ExampleItem);
  app.component('PageTitle', PageTitle);
  app.component('PageWrapper', PageWrapper);
}
