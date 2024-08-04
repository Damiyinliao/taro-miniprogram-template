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
  direction: 'row' | 'column'
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'row'
})
const wrapperStyle = computed(() => ({
  flexDirection: props.direction
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
