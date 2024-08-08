<template>
  <view class="we-page-container flex-col">
    <example-item title="page-container 弹出位置">
      <button type="primary" size="mini" @tap="popup" data-position="right">右侧弹出</button>
      <button type="primary" size="mini" @tap="popup" data-position="top">顶部弹出</button>
      <button type="primary" size="mini" @tap="popup" data-position="bottom">底部弹出</button>
      <button type="primary" size="mini" @tap="popup" data-position="center">中央弹出</button>
    </example-item>
    <example-item title="page-container 直圆角">
      <button type="primary" size="mini" @tap="changeRound">设置{{round ? '直角' : '圆角'}}</button>
    </example-item>
    <example-item title="page-container 弹出位置">
      <button type="primary" size="mini" @tap="changeOverlay">设置{{overlay ? '无' : '有'}}遮罩</button>
      <button type="primary" size="mini" @tap="changeOverlayStyle" data-type="black">黑色半透明遮罩</button>
      <button type="primary" size="mini" @tap="changeOverlayStyle" data-type="white">白色半透明遮罩</button>
      <button type="primary" size="mini" @tap="changeOverlayStyle" data-type="blur">模糊遮罩</button>
    </example-item>
    <page-container
      :show="visible"
      :round="round"
      :position="state.position"
      :duration="state.duration"
      :overlay="overlay"
      :overlay-style="state.overlayStyle"
      :custom-style="state.customStyle"
    >
      <view class="page-container-inner flex-center">
        <button type="primary" @tap="exit">退出</button>
      </view>
    </page-container>
  </view>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { CommonEvent } from '@tarojs/components';

const visible = ref(false);
const round = ref(false);
const overlay = ref(false);
const state = reactive({
  show: false,
  duration: 300,
  position: 'right',
  round: false,
  overlay: true,
  customStyle: '',
  overlayStyle: '',
})

function popup(e: CommonEvent) {
  const { position } = e.currentTarget.dataset;
  if (position === 'bottom') {
    state.customStyle = 'height: 30%'
  } {
    state.customStyle = ''
  }
  state.position = position;
  visible.value = true;
}

function changeRound() {
  round.value = !round.value;
}

function changeOverlay() {
  overlay.value = !overlay.value;
}

function changeOverlayStyle(e: CommonEvent) {
  const { type } = e.currentTarget.dataset;
  let overlayStyle = '';
  switch(type) {
    case 'black':
      overlayStyle = 'background-color: rgba(0, 0, 0, 0.7)'
      break
    case 'white':
      overlayStyle = 'background-color: rgba(255, 255, 255, 0.7)'
      break
    case 'blur':
      overlayStyle = 'background-color: rgba(0, 0, 0, 0.7); filter: blur(4px);'
  }
  state.overlayStyle = overlayStyle;
}

function exit() {
  visible.value = false
}
</script>

<style lang="scss">
.we-page-container {
  gap: 20px;
}
.page-container-inner {
  width: 100%;
  height: 100%;
  min-height: 600px;
}
</style>
