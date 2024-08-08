import Taro from "@tarojs/taro";
import { defineStore } from "pinia";

interface UserState {
  nickName: string;
  avatar: string;
  defaultAvatarUrl: string;
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    nickName: handleUserInfo('nickName'),
    avatar: handleUserInfo('avatar'),
    defaultAvatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
  }),
  getters: {
    getAvatar(): string {
      return this.avatar ? this.avatar : this.defaultAvatarUrl
    },
    getNickName(): string {
      return this.nickName ? this.nickName: '安仔'
    }
  },
  actions: {
    setUserState(...args: any) {
      this.$patch({ [args[0]]: args[1] });
      const userInfo = Taro.getStorageSync('userInfo');
      Taro.setStorageSync('userInfo', {
        ...userInfo,
        [args[0]]: args[1]
      })
    },
  }
})

function handleUserInfo(key: string) {
  const userInfo = Taro.getStorageSync('userInfo');
  return userInfo[key] || ''
}
