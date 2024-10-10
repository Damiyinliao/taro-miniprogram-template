<template>
  <view class="tab-bar">
    <view class="tabbar-list">
      <view
        class="tabbar-item"
        v-for="(item, index) in tabList"
        :key="item.path"
        :data-idx="index"
        :data-path="item.path"
        @tap="handleSwitch"
      >
        <view class="tabbar-item__inner" :class="{active: selected === index}">
          <weapp-svg
            :name="item.icon"
            :size="item.iconSize"
            :color="selected === index ? item.iconColorSelected : item.iconColor"
          ></weapp-svg>
          <text class="tabbar-text" :class="{active: selected === index}">{{ item.text }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import Taro from '@tarojs/taro';
import { computed } from 'vue';
import { useAppStore } from '@/store';
import WeappSvg from '@/components/weapp-svg/index.vue';

const appStore = useAppStore();
const tabList = [
  {
    id: 1,
    path: '/pages/home/index',
    icon: 'guide',
    iconColor: '#2c2c2c',
    iconColorSelected: '#00AA88',
    iconSize: 50,
    text: '首页',
  },
  {
    id: 2,
    path: '/pages/mine/index',
    icon: 'account',
    iconColor: '#2c2c2c',
    iconColorSelected: '#00AA88',
    text: '我的',
    iconSize: 50,
  }
]

const selected = computed(() => appStore.selectedTabIndex);

const handleSwitch = (e: any) => {
  appStore.setTabIndex(e.currentTarget.dataset.idx)
  Taro.switchTab({
    url: e.currentTarget.dataset.path
  });
}

</script>
<style lang="scss">
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  --safe-area-bottom: env(safe-area-inset-bottom);
  padding-bottom: var(--safe-area-bottom, 20px);
  .tabbar-list {
    margin: 0 32px;
    border-radius: 999px;
    height: 100px;
    background-color: #fff;
    box-shadow: 0 6px 30px 5px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    display: flex;
    align-items: center;
    .tabbar-item {
      flex: 1;
      text-align: center;
      &__inner {
        display: inline-flex;
        flex-direction: column;
        padding: 0 50px;
        border-radius: 999px;
        &.active {
          background-color: #edf6ff;
        }
      }
      .tabbar-text {
        font-size: 28px;
        color: #2c2c2c;
        &.active {
          color: #00AA88;
        }
      }
    }
  }
  .zhanwei {
    height: env(safe-area-inset-bottom);
    background: transparent;
  }
}
</style>
