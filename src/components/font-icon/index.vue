<template>
  <view class="font-icon-component" :style="componentStyle">
    <text class="font-icon-inner iconfont" :class="'icon-' + props.name"></text>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  name: string;
 size?: number | number;
 color?: string;
}

const props = withDefaults(defineProps<Props>(), {
  color: 'rgba(0, 0, 0, 0.8)',
  size: 32
});

const componentStyle = computed(() => ({
  '--font-icon-size': typeof props.size === 'string' ? props.size : `${props.size}rpx`,
  color: props.color
}));
</script>

<style lang="scss">
.font-icon-component {
  display: inline-block;
  .font-icon-inner {
    // color: var(--font-icon-color);
    font-size: var(--font-icon-size);
  }
}
</style>
