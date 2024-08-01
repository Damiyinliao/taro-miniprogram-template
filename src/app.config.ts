export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/mine/index',
  ],
  subPackages: [
    {
      root: 'pages_sub/taro-ui',
      pages: [
        'picker/index'
      ]
    }
  ],
  tabBar: {
    color: '#000',
    selectedColor: '#0E595F',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页',
        iconPath: 'assets/images/home.png',
        selectedIconPath: 'assets/images/home-selected.png'
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的',
        iconPath: 'assets/images/smile.png',
        selectedIconPath: 'assets/images/smile-selected.png'
      }
    ]
  },
  window: {
    navigationStyle: 'custom',
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
})
