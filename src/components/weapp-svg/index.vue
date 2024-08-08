<template>
  <Suspense>
    <template #default>
      <image class="weapp-svg" v-bind="attrs" :src="base64Svg" :style="customStyle"></image>
    </template>
    <template #fallback> <view></view> </template>
  </Suspense>
</template>

<script setup lang="ts">
import Taro from '@tarojs/taro';
import { computed, ref, useAttrs, watchEffect } from 'vue';

interface Props {
  size: number;
  name: string;
  color?: string;
  radius?: number|string;
}

const attrs = useAttrs()

const props = withDefaults(defineProps<Props>(), {
  color: '',
  size: 40
});

const base64Svg = ref<any>();

const svgModule = require(`../../assets/svg/${props.name}.svg`);

const convertSvg = computed(() => {
  return props.color ? svgModule.replace(/fill="#*[a-zA-Z0-9]+"/g, `fill="${props.color}"`) : svgModule;
});

watchEffect(() => {
  base64Svg.value = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(convertSvg.value)}`;
});

const customStyle = computed(() => ({
  width: Taro.pxTransform(props.size),
  height: Taro.pxTransform(props.size),
}));
</script>

<style lang="scss">
.weapp-svg {
  flex-shrink: 0;
  position: relative;
  vertical-align: -2px;
}
</style>
