	<!-- customStyle 自定义css样式
	scrollable 是否横向滚动
	lineOffsetLeft 当前选择的线条偏移量
	lineWidth 线条的宽度 -->

<template>
<view class="cl-tabs"  style="{{customStyle}}">
  <scroll-view scroll-x="{{ scrollable }}" scroll-with-animation class="" scroll-left="{{ scrollLeft }}">
    <view class="cl-tabs-nav {{scrollable ? 'cl-tabs-scroll' : 'cl-tabs-noscroll'}}">
      <view
        wx:for="{{list}}"
        data-index="{{index}}"
        class="cl-tab {{currentIndex==index ? 'cl-tab-active' : ''}}"
        @catchtap="swich"
      >{{item.title}}</view>
      <view
        class="cl-tabs__line"
        style="
          width:{{lineWidth}}px;
          transform:translateX({{lineOffsetLeft}}px);
          -webkit-transform:translateX({{lineOffsetLeft}}px);
          transition-duration:0.3s;
          -webkit-transition-duration:0.3s;
        "
        >
      </view>

    </view>
  </scroll-view>
</view>
</template>
<script lang="ts" setup>
import Taro from '@tarojs/taro';

// getAllRect, getRect, nextTicks 这三个看下面的注释。
function nextTick(cb) {
     if (Taro.canIUse('nextTick')) {
         Taro.nextTick(cb);
     }
     else {
         setTimeout(() => {
             cb();
         }, 1000 / 30);
     }
 }
function getRect(context, selector) {
    return new Promise((resolve) => {
        Taro.createSelectorQuery()
            .in(context)
            .select(selector)
            .boundingClientRect()
            .exec((rect = []) => resolve(rect[0]));
    });
}
function getAllRect(context, selector) {
  return new Promise((resolve) => {
    Taro.createSelectorQuery()
      .in(context)
      .selectAll(selector)
      .boundingClientRect()
      .exec((rect = []) => resolve(rect[0]));
  });
}
// import { getAllRect, getRect, nextTick } from '../../js/utils';
// Component({
//   properties: {
//       list: {
//             type: Array,
//             value: []
//       },
//       customStyle: {
//             type: String,
//             value: ''
//       },
//       active:{
//             type:Number,
//             value:0
//       },
//       scrollable: {
//             type: Boolean,
//             value: true
//       }
//   },
//   data: {
//       scrollLeft: 0,
//       currentIndex: 0,
//       lineOffsetLeft: 0,
//       lineWidth: 40
//   },
// lifetimes: {
//   //在组件在视图层布局完成后执行
//   ready: function () {
//     let that = this;
//     this.setData({
//       currentIndex:this.data.active,
//       scrollable: this.data.list.length <= 5 ? false : true
//     },
  function () {
      const currentIndex = that.data.currentIndex;
      Promise.all([
        getAllRect(this, '.cl-tab'),
        getRect(this, '.cl-tabs__line'),
      ]).then(([rects = [], lineRect]) => {
        const rect = rects[currentIndex];
        if (rect == null) {
          return;
        }
        let lineOffsetLeft = rects.slice(0, currentIndex).reduce((prev, curr) => prev + curr.width, 0);
        lineOffsetLeft += (rect.width - lineRect.width) / 2;
        that.setData({
          lineOffsetLeft
        });
      });
    };
//   }
//   }
  //切换组件
function swich (e) {
  const { data } = this;
  const currentIndex = e.currentTarget.dataset.index;
  if (currentIndex === data.currentIndex) {
      return;
  }
  const shouldEmitChange = data.currentIndex !== null;
  this.setData({ currentIndex });
  nextTick(() => {
      resize();
      scrollIntoView();
      if (shouldEmitChange) {
      //绑定事件到change
            this.triggerEvent('change', {
                index: currentIndex
            })
      }
  });
}
function resize() {
  const { currentIndex } = this.data;
  Promise.all([
      getAllRect(this, '.cl-tab'),
      getRect(this, '.cl-tabs__line'),
  ]).then(([rects = [], lineRect]) => {
      const rect = rects[currentIndex];
      if (rect == null) {
            return;
      }
      let lineOffsetLeft = rects.slice(0, currentIndex).reduce((prev, curr) => prev + curr.width, 0);
      lineOffsetLeft += (rect.width - lineRect.width) / 2;
      this.setData({
            lineOffsetLeft
      });
  });
}
function scrollIntoView() {
  const { currentIndex, scrollable } = this.data;
  if (!scrollable) {
    return;
  }
  Promise.all([
    getAllRect(this, '.cl-tab'),
    getRect(this, '.cl-tabs-nav'),
  ]).then(([tabRects, navRect]) => {
    const tabRect = tabRects[currentIndex];
    const offsetLeft = tabRects.slice(0, currentIndex).reduce((prev, curr) => prev + curr.width, 0);
    this.setData({
      scrollLeft: offsetLeft - (navRect.width - tabRect.width) / 2,
    });
  });
}
</script>
<style>
.cl-tabs{
     background-color: #ffffff;
}

.cl-tabs-scroll {
     position: relative;
     user-select: none;
     white-space: nowrap;
}
.cl-tabs-noscroll{
     display: -webkit-flex;
     display: flex;
     overflow: hidden;

}

.cl-tab {
     position: relative;
     min-width: 0;
     padding: 0 20rpx;
     text-align: center;
     cursor: pointer;
     color: #000000;
     font-size: 28rpx;
     line-height: 80rpx;
}
.cl-tabs-scroll .cl-tab{
     display: inline-block;
     padding:0 30rpx;
}
.cl-tabs-noscroll .cl-tab{
     flex: 1;
}
.cl-tab-active{
     font-weight: 500;
     color:#f63434;
}
.cl-tabs__line {
     position: absolute;
     bottom: 0;
     left: 0;
     z-index: 1;
     height: 6rpx;
     background-color: #f63434;
}

</style>
