<template>
  <image
    v-bind="attrs"
    class="taro-image-component"
    :src="icon[props.name]"
    :style="mainStyle"
  />
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useAttrs } from 'vue'

interface Props {
  name: string,
  size?: number,
  radius?: number|string

}

const attrs = useAttrs()

const icon = {
  'home': require('@/assets/icons/home.svg'),
  'wechat': require('@/assets/svg/wechat.svg'),
  'jd': require('@/assets/svg/jd.svg'),
  'component': require('@/assets/svg/component.svg'),
  'arrow-right': require('@/assets/svg/arrow-right.svg')
}

const props = withDefaults(defineProps<Props>(), {
  size: 30,
  radius: 0
});

const mainStyle = computed(() => ({
  height: props.size + 'rpx',
  width: props.size + 'rpx',
  '--taro-image-radius': typeof props.radius === 'string' ? props.radius : props.radius + 'px'
}));
</script>

<style lang="scss">
.taro-image-component {
  display: block;
  border-radius: var(--taro-image-radius);
}
</style>
