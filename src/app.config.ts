
const subPackagesConfig = [
  {
    root: 'pages/views',
    pages: [
      'profile/index',
    ]
  }
]

export default defineAppConfig({
  // componentFramework: 'glass-easel',
  pages: [
    'pages/home/index',
    'pages/mine/index',
  ],
  subPackages: [
    ...subPackagesConfig
  ],
  // tabBar: defaultTabbarConfig,
  tabBar: {
    custom: true,
    color: '#727171',
    selectedColor: '#000',
    list: [
      {
        pagePath: 'pages/home/index',
        iconPath: 'assets/tabbar/island.png',
        selectedIconPath: 'assets/tabbar/island-selected.png',
        text: '首页'
      },
      {
        pagePath: 'pages/mine/index',
        iconPath: 'assets/tabbar/mine.png',
        selectedIconPath: 'assets/tabbar/mine-selected.png',
        text: '我的'
      }
    ]
  },
  window: {
    navigationStyle: 'custom',
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
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
