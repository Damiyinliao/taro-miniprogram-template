<template>
  <view class="weui-button-wrapper" id="buttonContainer">
    <button type="primary">页面主操作 Normal</button>
    <button type="primary" :loading="true">页面主操作 Loading</button>
    <button type="primary" :disabled="true">页面主操作 Disabled</button>

    <button type="default">页面次要操作 Normal</button>
    <button type="default" :disabled="true">页面次要操作 Disabled</button>

    <button type="warn">警告类操作 Normal</button>
    <button type="warn" :disabled="true">警告类操作 Disabled</button>

    <button type="primary" :plain="true">按钮</button>
    <button type="primary" :disabled="true" :plain="true">不可点击的按钮</button>

    <button type="default" :plain="true">按钮</button>
    <button type="default" :disabled="true" :plain="true">按钮</button>

    <button class="mini-btn" type="primary" size="mini">按钮</button>
    <button class="mini-btn" type="default" size="mini">按钮</button>
    <button class="mini-btn" type="warn" size="mini">按钮</button>
  </view>
</template>

<script setup lang="ts">
const types = ['default', 'primary', 'warn'];
const data = {
  defaultSize: 'default',
  primarySize: 'default',
  warnSize: 'default',
  disabled: false,
  plain: false,
  loading: false
}
</script>

<style lang="scss">
.weui-button-wrapper {
  button {
    margin-top: 30rpx;
    margin-bottom: 30rpx;
  }
  .button-sp-area {
    margin: 0 auto;
    width: 60%;
  }
  .mini-btn {
    margin-right: 10rpx;
  }
}
</style>

