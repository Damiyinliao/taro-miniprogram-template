<template>
  <image
    v-bind="attrs"
    :src="icon[props.name]"
    :style="{
      height: props.size + 'rpx',
      width: props.size + 'rpx'
    }"
  />
</template>

<script lang="ts" setup>
import { useAttrs } from 'vue'

interface Props {
  name: string
  size?: number
}

const attrs = useAttrs()

const icon = {
  'home': require('@/assets/icons/home.svg'),
}

const props = withDefaults(defineProps<Props>(), {
  size: 30
})
</script>

<style lang="scss">

</style>
