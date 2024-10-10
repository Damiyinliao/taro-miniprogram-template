<template>
  <view class="mine-page">
    <TaroNavbar background="transparent" :back="false" />
    <view class="personal-info">
      <view class="avatar" @tap="navTo('/pages/views/profile/index')">
        <image class="w-full h-full" :src="avatar"></image>
      </view>
      <view class="intro">
        <view class="nickname">{{ userInfo.nickName }}</view>
        <view class="phone margin-top-auto">手机：{{ '13567950783' }}</view>
        <view class="description">微信小程序开发档案</view>
      </view>
    </view>
    <view class="ui-modules">
      <view class="module-item" v-for="(item, index) in moduleList" :key="index" @tap="leaveFor(item.page)">
        <image v-if="item.icon.includes('images')" class="module-item__icon" :src="item.icon"></image>
        <weapp-svg v-else :name="item.icon" radius="50%" :size="48"></weapp-svg>
        <view class="module-item__desc text-ellipsis">
          <view class="module-name">{{ item.name }}</view>
          <view class="module-desc">{{ item.desc }}</view>
        </view>
      </view>
    </view>
    <view class="more-list">
      <view
        class="more-list__item"
        v-for="(item, index) in moreList"
        :key="index"
        @tap="navTo(item.page)"
      >
        <view class="flex" style="gap: 5px;">
          <font-icon :name="item.icon" />
          <text>{{ item.name }}</text>
        </view>
        <font-icon name="fudianshouzhan" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
// import Taro from '@tarojs/taro';
import { computed, ref } from 'vue';
import { useUserStore } from '@/store';
import { navTo } from '@/utils';
import IconTaroUI from '@/assets/images/logo-taro.png';

const user = useUserStore();
const avatar = computed(() => user.getAvatar)
const moduleList = [
  {
    name: 'We UI',
    icon: 'wechat',
    page: '/pages_sub/ui/list/index?anchor=we',
    desc: '微信小程序自身UI'
  },
  {
    name: 'Taro UI',
    icon: IconTaroUI,
    page: '/pages_sub/ui/list/index?anchor=taro',
    desc: '一套基于 Taro 框架开发的多端 UI 组件库'
  },
  {
    name: 'Nut UI',
    icon: 'jd',
    page: '/pages_sub/ui/list/index?anchor=nut',
    desc: '京东Nut UI组件库'
  }
];

const moreList = [
  {
    name: 'Custom Components',
    icon: 'zujianliebiao',
    page: '/pages_sub/custom-elements/list/index'
  },
  {
    name: 'Tab Swiper',
    icon: 'zujianliebiao',
    page: '/pages_sub/custom-elements/tab-swiper/index'
  }
]

// const canIUseGetUserProfile = ref(false);
const userInfo = ref({
  nickName: '',
  avatarUrl: '',
  gender: 0,
})

function leaveFor(url: string) {
  navTo(url);
}
</script>

<style lang="scss">
.mine-page {
  padding: 0 32px;
  color: rgba(0, 0, 0, 0.8);
  font-size: 32px;
  .personal-info {
    display: flex;
    .avatar {
      width: 128px;
      height: 128px;
      overflow: hidden;
      border-radius: 50%;
      background-color: #D8D8D8;
    }
    .intro {
      padding: 0 30px;
      .nickname {
        font-size: 40px;
        font-weight: 700;
      }
      .phone {
        margin-top: 20px;
        color: #a5a5a5;
        font-size: 28px;
      }
      .description {
        color: #a5a5a5;
        font-size: 28px;
      }
    }
  }
  .ui-modules {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    margin-top: 46px;
    .module-item {
      width: 330px;
      height: 144px;
      box-sizing: border-box;
      padding: 24px;
      background-color: #fff;
      border-radius: 24px;
      display: flex;
      gap: 16px;
      &__icon {
        border-radius: 50%;
        width: 48px;
        height: 48px;
        flex-shrink: 0;
      }
      &__desc {
        flex: 1;
      }
      .module-name {
        padding: 4px 0;
      }
      .module-desc {
        color: rgba(0, 0, 0, 0.3);
        font-size: 24px;
      }
    }
  }
  .more-list {
    background-color: #fff;
    border-radius: 24px;
    padding: 24px;
    margin-top: 40px;
    &__item {
      border-bottom: 2px solid #EDEDED;
      padding: 20px 0;
      display: flex;
      justify-content: space-between;
      &:active {
        background-color: #f1f1f1;
      }
    }
  }
}
</style>
