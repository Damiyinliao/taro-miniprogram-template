<template>
  <svg v-if="!isWeapp" class="svg-icon-scoped" aria-hidden="true" :style="customStyle">
    <use :href="iconName" />
  </svg>
  <Suspense v-else>
    <template #default>
      <weapp-svg :color="props.color" :name="props.name" :size="props.size" :radius="props.radius"></weapp-svg>
    </template>
    <template #fallback> <view></view> </template>
  </Suspense>
</template>

<script setup lang="ts">
import Taro from '@tarojs/taro';
import { computed } from 'vue';
import WeappSvg from '../weapp-svg/index.vue';

interface Props {
  name: string;
  color?: string;
  size?: number;
  radius?: number|string;
}

const props = withDefaults(defineProps<Props>(), {
  color: '',
  size: 30
});
const isWeapp = process.env.TARO_ENV === 'weapp';

const iconName = computed(() => `#icon-${props.name}`);

const customStyle = computed(() => ({
  color: props.color,
  width: Taro.pxTransform(props.size),
  height: Taro.pxTransform(props.size),
}))

// if (!isWeapp) {
//   import(`@/assets/icons/${props.name}.svg`);
// }
</script>

<style lang="scss">
.svg-icon-scoped {
  flex-shrink: 0;
  position: relative;
  vertical-align: -2px;
}
</style>
