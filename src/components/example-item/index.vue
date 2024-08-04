<template>
  <view class="example-item-wrapper">
    <view class="example-item__header">
      <text>{{ title }}</text>
    </view>
    <view class="example-item__content" :style="wrapperStyle">
      <slot></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
interface Props {
  title: string;
  border?: boolean;
  direction?: 'row' | 'column';
  gap?: string | number;
  wrap?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'row',
  gap: 10,
  wrap: true
})
const wrapperStyle = computed(() => ({
  flexDirection: props.direction,
  gap: typeof props.gap === 'string' ? props.gap : `${props.gap}rpx`,
  flexWrap: props.wrap ? 'wrap' : 'nowrap'
}))
</script>

<style lang="scss">
.example-item {
  &-wrapper {
    border-radius: 24px;
    padding: 30px;
    background-color: #fff;
  }
  &__header {
    border-left: 10px solid #009688;
    padding: 4px 24px;
  }
  &__content {
    padding: 20px 0;
    margin-top: 40px;
    border-top: 5px solid #009688;
    border-bottom: 5px solid #009688;
    display: flex;
  }
}
</style>
