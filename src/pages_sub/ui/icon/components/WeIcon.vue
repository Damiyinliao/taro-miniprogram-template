<template>
  <view class="weui-icon-wrapper flex-column">
    <example-item title="微信图标-种类">
      <view class="group">
        <block v-for="(item, index) in iconType" :key="index">
          <icon :type="item" :size="40"></icon>
        </block>
      </view>
    </example-item>
    <example-item title="微信图标-大小">
      <view class="group">
        <block v-for="(item, index) in iconSize" :key="index">
          <icon type="success" :size="item"></icon>
        </block>
      </view>
    </example-item>
    <example-item title="微信图标-种类">
      <view class="group">
        <block v-for="(item, index) in iconColor" :key="index">
          <icon type="success" :size="40" :color="item"></icon>
        </block>
      </view>
    </example-item>
  </view>
</template>

<script setup lang="ts">
const iconSize = [20, 30, 40, 50, 60, 70]
const iconColor = ['red', 'orange', 'yellow', 'green', 'rgb(0,255,255)', 'blue', 'purple']
const iconType = ['success', 'success_no_circle', 'info', 'warn', 'waiting', 'cancel', 'download', 'search', 'clear']
</script>

<style lang="scss">
.weui-icon-wrapper {
  gap: 32px;
  .group {
    padding: 32px 0;
    display: flex;
    gap: 20px;
    align-items: center;
    flex-wrap: wrap;
  }
}
</style>
