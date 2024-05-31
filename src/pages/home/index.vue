<template>
  <view class="home-page">
    <CustomNavbar title="首页" :loading="true" :home-button="true" />
    <text class="title">{{ msg }}</text>
  </view>
</template>

<script lang="ts" setup>
import Taro from '@tarojs/taro'
import { ref } from 'vue'
import CustomNavbar from '@/components/navbar/index.vue'
import './index.scss'

const msg = ref('Hello world')

Taro.usePullDownRefresh(() => {
  setTimeout(() => {
    Taro.stopPullDownRefresh()
  }, 1000)
})
</script>
