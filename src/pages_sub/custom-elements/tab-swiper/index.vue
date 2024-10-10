<template>
  <view :style="rootStyle">
    <taro-navbar title="Tab Swiper"></taro-navbar>
    <view class="tab-swiper">
      <view class="tab-swiper__inner">
        <scroll-view
          class="tab-swiper__scroll"
          :scroll-x="true"
          :enable-flex="true"
          :scroll-with-animation="true"
          :scroll-left="navScrollLeft"
        >
          <view class="nav-list">
            <view
              class="nav-item"
              v-for="(item, index) in navList"
              :key="index"
              :class="{active: navIndex === index}"
              @tap="onNavTap(index)"
            >
              <text>{{ item.name }}</text>
            </view>
            <view class="nav-line" :style="{ transform : `translateX(${lineOffsetLeft}px)` }"></view>
          </view>
        </scroll-view>
      </view>
    </view>
    <swiper
      class="swiper-wrapper h-full mt-5"
      :current="navIndex"
      :duration="300"
      @change="onNavChange"
    >
      <swiper-item v-for="(arr, index) in list" :key="index">
        <view class="list-wrapper">
          <view class="item" v-for="(item, idx) in arr" :key="idx">
            <!-- <image class="item-img" :src="item.img"></image> -->
            <view class="item-text">{{ item.city }}</view>
          </view>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script lang="ts" setup>
import Taro, { NodesRef } from '@tarojs/taro';
import { computed, ref } from 'vue';
import { useAppStore } from '@/store';
import { CommonEvent } from '@tarojs/components';
import { getMultipleRect } from '@/utils';

const appStore = useAppStore();
const navIndex = ref(0);
const navScrollLeft = ref(0);
const navLineWidth = ref(40);
const lineOffsetLeft = ref(0);
const rootStyle = computed(() => ({
  flex: 1,
  background: '#f6f6f6',
  '--nav-height': `${appStore.navHeight}px`,
  '--nav-line-width': `${navLineWidth.value}px`,
  '--nav-line-transform': `translateX(${lineOffsetLeft.value})px`
}));
const navList = [
  { name: "江苏" },
  { name: "浙江" },
  { name: "上海" },
  { name: "河南" },
  { name: "河北" },
  { name: "重庆" },
  { name: "天津" },
  { name: "广东" },
]

const list = [
  [
    {"img":"/imgs/default.jpg","city":"南京"},
    {"img":"/imgs/default.jpg","city":"苏州"},
    {"img":"/imgs/default.jpg","city":"南通"},
    {"img":"/imgs/default.jpg","city":"无锡"}
  ],
  [
    {"img":"/imgs/default.jpg","city":"杭州"},
    {"img":"/imgs/default.jpg","city":"宁波"},
    {"img":"/imgs/default.jpg","city":"温州"}
  ],
  [
    {"img":"/imgs/default.jpg","city":"上海"}
  ],
  [
    {"img":"/imgs/default.jpg","city":"郑州"},
    {"img":"/imgs/default.jpg","city":"开封"},
    {"img":"/imgs/default.jpg","city":"洛阳"},
    {"img":"/imgs/default.jpg","city":"周口"}
  ],
  [
    {"img":"/imgs/default.jpg","city":"石家庄"},
    {"img":"/imgs/default.jpg","city":"唐山"},
    {"img":"/imgs/default.jpg","city":"秦皇岛"}
  ],
  [
    {"img":"/imgs/default.jpg","city":"重庆"}
  ],
  [
    {"img":"/imgs/default.jpg","city":"天津"}
  ],
  [
    {"img":"/imgs/default.jpg","city":"广州"},
    {"img":"/imgs/default.jpg","city":"深圳"}
  ]
];

function onNavTap(index: number) {
  switchTab(index);
  // navIndex.value = index;
  // navScrollLeft.value = index >= 4 ? index*60 : 0
}
function onNavChange(e: CommonEvent<{current: number}>) {
  navIndex.value = e.detail.current
  navScrollLeft.value = e.detail.current >= 4 ? e.detail.current*60 : 0
}

/** 下一次 DOM 更新循环之后执行回调函数 */
function nextTick(cb: () => void) {
  if (Taro.canIUse('nextTick')) {
    Taro.nextTick(cb);
  } else {
    setTimeout(() => {
      cb();
    }, 1000 / 30)
  }
}

function switchTab(idx: number) {
  // console.log("🚀 ~ switchTab ~ idx:", idx)
  if (navIndex.value === idx) return;
  // navIndex.value = idx;
  // navScrollLeft.value = idx >= 4 ? idx*60 : 0;
  nextTick(async () => {
    await resize(idx);
    navIndex.value = idx;
    navScrollLeft.value = idx >= 4 ? idx*60 : 0;
    // await scrollIntoView();
  })
}

async function resize(idx: number) {
  const currentIndex = idx;
  const rects = await getMultipleRect('.nav-item');
  console.log("🚀 ~ resize ~ rects:", rects);
  // const lineRect = await getRect('.nav-line');
  const rect = rects[currentIndex];
  if (rect == null) {
    return;
  }
  let offsetLeft = rects.slice(0, currentIndex).reduce((prev, curr) => prev + curr.width, 0);
  lineOffsetLeft.value = offsetLeft;
}

function scrollIntoView() {
  const currentIndex = navIndex.value;
  // const { currentIndex, scrollable } = this.data;
  // if (!scrollable) {
  //   return;
  // }
  // Promise.all([
  //   getAllRect('.nav-item'),
  //   getRect('.nav-line'),
  // ]).then(([navRects, lineRect]) => {
  //   const navRect = navRects[currentIndex];
  //   const offsetLeft = navRects.slice(0, currentIndex).reduce((prev, curr) => prev + curr.width, 0);
  //   lineOffsetLeft.value = offsetLeft - (lineRect.width - navRect.width) / 2;
  // });
}


// Taro.useLoad(() => {
//   Promise.all([
//     getAllRect('.nav-item'),
//     getRect('.nav-line')
//   ]).then(([rects = [], lineRect]) => {
//     console.log("🚀 ~ ]).then ~ lineRect:", lineRect)
//     console.log("🚀 ~ ]).then ~ rects:", rects)
//     const rect = rects[navIndex.value];
//     if (!rect) return;
//     let offsetLeft = rects.slice(0, navIndex.value).reduce((prev, curr) => prev + curr.width, 0);
//     offsetLeft += (rect.width - lineRect.width) / 2;
//     lineOffsetLeft.value = offsetLeft
//   })
// })
</script>

<style lang="scss">
.tab-swiper {
  color: #181818;
  height: 100px;
  &__inner {
    position: fixed;
    top: var(--nav-height);
    right: 0;
    left: 0;
    background-color: #fff;
    width: 100%;
  }
  &__scroll {
    height: 100px;
    width: 100%;
    white-space: nowrap;
  }
  .nav-list {
    position: relative;
  }
  .nav-item {
    width: 20%;
    font-size: 32px;
    height: 100px;
    line-height: 100px;
    box-sizing: border-box;
    display: inline-block;
    text-align: center;
    &.active {
      font-weight: 550;
      font-size: 34px;
    }
  }
  .nav-line {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1;
    height: 6px;
    background-color: var(--primary-color);
    // width: var(--nav-line-width);
    width: 20%;
    transition-duration: 0.3s;
    -webkit-transition-duration: 0.3s;
    transform: var(--nav-line-transform);
    -webkit-transform: var(--nav-line-transform);
  }
}
.list-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 32px;
  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    background-color: #555353;
  }
}
</style>
