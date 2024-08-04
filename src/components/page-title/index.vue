<template>
  <view class="page-title flex">
    <view class="page-title__inner">
      <slot></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
</script>

<style lang="scss">
.page-title {
  margin: 32px;
  // padding: 10px 0;
  &__inner {
    padding: 10px 0;
    border-bottom: 10px solid #009688;
  }
}
</style>
