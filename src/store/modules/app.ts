import Taro from '@tarojs/taro';
import { defineStore } from 'pinia';

export const useAppStore = defineStore({
  id: 'app',
  state: () => ({
    navHeight: 44, // 导航栏高度
    leftInnerPadding: 0, // 导航栏左侧内边距
    rightInnerPadding: 0, // 导航栏右侧内边距
    topInnerPadding: 0, // 导航栏上侧内边距
    leftContainerWidth: 0, // 导航栏左侧容器宽度
    platform: '', // 平台
  }),
  getters: {
  },
  actions: {
    setDeviceInfo() {
      const systemInfo = Taro.getSystemInfoSync();  // 获取设备信息
      console.log('systemInfo--设备信息', systemInfo);
      const capsuleInfo = Taro.getMenuButtonBoundingClientRect();   // 获取胶囊信息
      console.log('capsuleInfo--胶囊信息', capsuleInfo);
      if (!systemInfo.statusBarHeight) {
        systemInfo.statusBarHeight = systemInfo.platform === 'android' ? 48 : 44;
      }
      const nav_right_padding = systemInfo.windowWidth - capsuleInfo.right;  // 胶囊右侧到屏幕右侧的距离
      const nav_height = systemInfo.statusBarHeight + capsuleInfo.height + (capsuleInfo.top - systemInfo.statusBarHeight) * 2;  // 导航栏高度
      this.platform = systemInfo.platform;  // 平台
      this.navHeight = nav_height;  // 导航栏高度
      this.leftInnerPadding = nav_right_padding;  // 导航栏左侧内边距
      this.rightInnerPadding = nav_right_padding + capsuleInfo.width;  // 导航栏右侧内边距
      this.topInnerPadding = systemInfo.statusBarHeight;  // 导航栏上侧内边距
      this.leftContainerWidth = capsuleInfo.width;  // 导航栏左侧容器宽度
    }
  },
});
