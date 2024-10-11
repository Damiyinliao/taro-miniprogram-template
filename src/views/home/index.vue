<template>
  <view>
    <taro-navbar title="首页">

    </taro-navbar>
    <button type="primary" size='mini' @tap="handleNav('/mine')">跳转到我的页面</button>
    <button type="primary" size='mini' @tap="handleNav('/sub')">跳转到分包页面</button>
  </view>
</template>

<script setup lang="ts">
import router from '../../router';
import Taro from '@tarojs/taro';
import { ref } from 'vue';

const loading = ref(false);

Taro.usePullDownRefresh(() => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    Taro.stopPullDownRefresh()
  }, 1000)
});

function handleNav(path: string) {
  router.push(path)
}
</script>

<style lang="scss">
.home-page {
  .title {
    font-size: 24px;
    color: #333;
  }
  .content {
    font-size: 16px;
    color: #666;
  }
}

</style>
