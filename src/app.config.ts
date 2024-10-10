import { defaultTabbarConfig } from '@/config/constant';

const subPackagesConfig = [
  {
    root: 'pages/views',
    pages: [
      'profile/index',
    ]
  },
  {
    root: 'pages_sub/custom-elements',
    pages: [
      'list/index',
      'tab-swiper/index'
    ]
  },
  {
    root: 'pages_sub/ui',
    pages:[
      'list/index',
      'icon/index',
      'button/index',
      'switch/index',
      'picker/index',
      'view/index'
    ]
  }
]

export default defineAppConfig({
  componentFramework: 'glass-easel',
  pages: [
    // 'layout/index/index',
    'pages/home/index',
    'pages/mine/index',
  ],
  subPackages: [
    ...subPackagesConfig
  ],
  tabBar: {
    custom: true,
    ...defaultTabbarConfig
  },
  window: {
    navigationStyle: 'custom',
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  /** taro里面不支持这些 */
  // renderer: 'skyline',
  // lazyCodeLoading: 'requiredComponents',
  // rendererOptions: {
  //   skyline : {
  //     defaultDisplayBlock: true,
  //     defaultContentBox: true,
  //     disableABTest: true,
  //     sdkVersionBegin: "3.0.0",
  //     sdkVersionEnd: "15.255.255"
  //   }
  // }
})
