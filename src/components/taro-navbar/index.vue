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
import Taro from '@tarojs/taro';
import { computed } from 'vue';
import { useAppStore } from '@/store/modules';
import SvgIcon from '@/components/svg-icon/index.vue';

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
  color: '#000',
  background: '#fff',
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
    '--nav-bar-background': props.background,
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
<style lang="scss">
@keyframes loading {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

.custom-navbar {
  position: relative;
  overflow: hidden;
  background-color: var(--nav-bar-background);
  z-index: 9999;
  &_inner {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding-top: var(--nav-padding-top);
    height: var(--nav-height);
    padding-left: var(--nav-padding-left);
    padding-right: var(--nav-padding-right);
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: var(--nav-bar-background);
  }
  &__left {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: var(--nav-left-width);
    .navbar-back-active {
      opacity: 0.5;
    }
    .navbar-back {
      padding: 0 12px;
      &:active {
        opacity: 0.5;
      }
      &_icon {
        font-size: 24px;
        width: 24px;
        height: 48px;
        -webkit-mask: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='24' viewBox='0 0 12 24'%3E  %3Cpath fill-opacity='.9' fill-rule='evenodd' d='M10 19.438L8.955 20.5l-7.666-7.79a1.02 1.02 0 0 1 0-1.42L8.955 3.5 10 4.563 2.682 12 10 19.438z'/%3E%3C/svg%3E") no-repeat 50% 50%;
        mask: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='24' viewBox='0 0 12 24'%3E  %3Cpath fill-opacity='.9' fill-rule='evenodd' d='M10 19.438L8.955 20.5l-7.666-7.79a1.02 1.02 0 0 1 0-1.42L8.955 3.5 10 4.563 2.682 12 10 19.438z'/%3E%3C/svg%3E") no-repeat 50% 50%;
        -webkit-mask-size: cover;
        mask-size: cover;
        background-color: rgb(0, 0, 0, .9);
      }
    }
    .navbar-home-wrapper {
      .navbar-home-btn {
        padding: 0 12px;
        &:active {
          opacity: 0.5;
        }
      }
      .navbar-home-active {
        opacity: 0.5;
      }
    }
  }
  &__center {
    flex: 1;
    align-self: stretch;
    position: relative;
    text-align: center;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    .navbar-loading {
      margin-right: 4px;
      align-items: center;
      &_icon {
        font-size: 32px;
        width: 32px;
        height: 32px;
        display: block;
        background: transparent url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='80px' height='80px' viewBox='0 0 80 80' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3Eloading%3C/title%3E%3Cdefs%3E%3ClinearGradient x1='94.0869141%25' y1='0%25' x2='94.0869141%25' y2='90.559082%25' id='linearGradient-1'%3E%3Cstop stop-color='%23606060' stop-opacity='0' offset='0%25'%3E%3C/stop%3E%3Cstop stop-color='%23606060' stop-opacity='0.3' offset='100%25'%3E%3C/stop%3E%3C/linearGradient%3E%3ClinearGradient x1='100%25' y1='8.67370605%25' x2='100%25' y2='90.6286621%25' id='linearGradient-2'%3E%3Cstop stop-color='%23606060' offset='0%25'%3E%3C/stop%3E%3Cstop stop-color='%23606060' stop-opacity='0.3' offset='100%25'%3E%3C/stop%3E%3C/linearGradient%3E%3C/defs%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' opacity='0.9'%3E%3Cg%3E%3Cpath d='M40,0 C62.09139,0 80,17.90861 80,40 C80,62.09139 62.09139,80 40,80 L40,73 C58.2253967,73 73,58.2253967 73,40 C73,21.7746033 58.2253967,7 40,7 L40,0 Z' fill='url(%23linearGradient-1)'%3E%3C/path%3E%3Cpath d='M40,0 L40,7 C21.7746033,7 7,21.7746033 7,40 C7,58.2253967 21.7746033,73 40,73 L40,80 C17.90861,80 0,62.09139 0,40 C0,17.90861 17.90861,0 40,0 Z' fill='url(%23linearGradient-2)'%3E%3C/path%3E%3Ccircle id='Oval' fill='%23606060' cx='40.5' cy='3.5' r='3.5'%3E%3C/circle%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A") no-repeat;
        background-size: 100%;
        margin-left: 0;
        animation: loading linear infinite 1s;
      }
    }
    .navbar-title {
      font-size: var(--nav-title-size);
      font-weight: 500;
      color: var(--nav-title-color);
    }
  }
}
</style>
