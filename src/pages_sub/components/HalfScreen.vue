<template>
  <page-container
    class="page-container"
    :show="show"
    :round="props.round"
    :position="props.position"
    :duration="props.duration"
    :overlay="props.overlay"
    :overlay-style="props.overlayStyle"
    :custom-style="props.customStyle"
  >
    <view class="page-container__inner flex-center">
      <view class="close" @tap="close">V</view>
    </view>
  </page-container>
</template>

<script setup lang="ts">
// import Taro from '@tarojs/taro';
import { computed } from 'vue';

interface Props {
  visible: boolean;
  round?: boolean;
  position?: 'top'|'right'|'left'|'bottom';
  duration?: number;
  overlay?: boolean;
  customStyle?: string;
  overlayStyle?: string;
  onClose?: () => void;
}

interface Emits {
  (e: 'update:visible', visible: boolean): void
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  round: true,
  position: 'bottom',
  duration: 300,
  overlay: true,
  customStyle: 'height: 50%'
});

const emit = defineEmits<Emits>()

const show = computed({
  get() {
    return props.visible
  },
  set(value: boolean) {
    emit('update:visible', value)
  }
})

function close() {
  emit('update:visible', false);
  props.onClose && props.onClose()
}

</script>

<style lang="scss">
.page-container {
  &__inner {
    .close {
      position: absolute;
      left: 20px;
      top: 20px;
      background-color: #F8F8F8;
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 24px;
      border-radius: 50%;
      color: #ababab;
    }
  }
}
</style>
