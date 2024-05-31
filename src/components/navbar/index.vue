<template>
  <view class="custom-navbar" :style="wrapperStyle">
    <view class="custom-navbar_inner">
      <view class="custom-navbar__left">
        <!-- 返回上一页 -->
        <block v-if="props.back">
          <view
            class="navbar-back"
            hoverClass="navbar-back-active"
            :hoverStayTime="100"
            ariaRole="button"
            ariaLabel="返回"
            @tap="onBack"
          >
            <view class="navbar-back_icon"></view>
          </view>
        </block>
         <!-- 返回首页 -->
        <block v-if="props.homeButton">
          <view class="navbar-home-wrapper">
            <view
              class="navbar-home-btn"
              hoverClass="navbar-home-active"
              ariaRole="button"
              ariaLabel="首页"
              @tap="onHome"
            >
              <svg-icon name="home" :size="50" />
            </view>
          </view>
        </block>
      </view>
      <view class="custom-navbar__center">
        <view v-if="props.loading" class="navbar-loading" ariaRole="alert">
          <view
            class="navbar-loading_icon"
            ariaRole="img"
            ariaLabel="加载中"
          ></view>
        </view>
        <block v-if="props.title">
          <text class="navbar-title">{{props.title}}</text>
        </block>
        <block v-else>
          <slot name="center"></slot>
        </block>
      </view>
       <!-- 右侧留空 -->
      <view class='custom-navbar__right'>
        <slot name="right"></slot>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import Taro from '@tarojs/taro'
import { computed } from 'vue';
import { useAppStore } from '@/store/modules'
import SvgIcon from '@/components/svg-icon/index.vue'
import './index.scss'

interface Props {
  title?: string
  color?: string
  background?: string
  back?: boolean
  delta?: number
  titleSize?: number
  loading?: boolean
  homeButton?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  titleSize: 16,
  color: '#000000',
  background: '#ffffff',
  back: true,
  delta: 1,
  loading: false,
  homeButton: false,
})

const app = useAppStore()

const wrapperStyle = computed(() => {
  return {
    height: `${app.navHeight}px`,
    opacity: 1,
    background: props.background,
    '--nav-height': `${app.navHeight}px`,
    '--nav-padding-left': `${app.leftInnerPadding}px`,
    '--nav-padding-right': `${app.rightInnerPadding}px`,
    '--nav-padding-top': `${app.topInnerPadding}px`,
    '--nav-left-width': `${app.leftContainerWidth}px`,
    '--nav-title-size': `${props.titleSize}px`,
    '--nav-title-color': props.color,
  }
})

function onBack() {
  Taro.navigateBack({ delta: props.delta })
}

function onHome() {
  console.log('返回首页')
}
</script>
