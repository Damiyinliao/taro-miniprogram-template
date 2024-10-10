<template>
  <Transition name="modal">
    <view v-if="show" class="modal-mask" :style="maskStyle">
      <view class="modal-container" :animation="containerAnimation">
        <view class="modal-container__inner">
          <view class="modal-header">
            <view v-if="props.title" class="modal-header__title">{{ props.title }}</view>
            <slot v-else name="header"></slot>
          </view>
          <view class="modal-body">
            <slot name="body"></slot>
          </view>
        </view>
        <view class="modal-footer">
          <slot name="footer">
            <view class="modal-footer__content">
              <view class="modal-footer__btn" v-if="showCancel" @tap="onCancel(false)">取消</view>
              <view class="modal-footer__btn" @tap="onConfirm">确定</view>
            </view>
          </slot>
        </view>
      </view>
    </view>
  </Transition>
</template>

<script setup lang="ts">
import Taro from '@tarojs/taro';
import { ref, watch } from 'vue';

interface Props {
  title?: string;
  visible: boolean;
  showCancel?: boolean;
}

interface Emits {
  (e: 'update:visible', visible: boolean): void;
  (e: 'confirm'): void;
}

const props = withDefaults(defineProps<Props>(), {
  showCancel: true,
});
const emit = defineEmits<Emits>();

const show = ref(false);
const maskStyle = ref({});
const containerAnimation = ref({});

// 创建背景遮罩动画
const createMaskAnimation = (opacity: number, duration: number) => {
  const animation = Taro.createAnimation({
    duration,
    timingFunction: 'ease',
  });

  animation.opacity(opacity).step();
  return animation.export();
};

// 创建内容容器动画
const createContainerAnimation = (opacity: number, scale: number, duration: number) => {
  const animation = Taro.createAnimation({
    duration,
    timingFunction: 'ease',
  });

  animation.opacity(opacity).scale(scale).step();
  return animation.export();
};

const onCancel = (val: boolean = false) => {
  setTimeout(() => {
    emit('update:visible', val);
  }, 50);
};

const onConfirm = () => {
  emit('confirm');
  onCancel();
};

// 监听 props.visible 的变化，触发动画
watch(
  () => props.visible,
  (newVal) => {
    if (newVal) {
      // 动画进入效果
      show.value = true;
      maskStyle.value = createMaskAnimation(1, 300);
      containerAnimation.value = createContainerAnimation(1, 1, 300);
    } else {
      // 动画离开效果
      containerAnimation.value = createContainerAnimation(0, 0.9, 300);
      maskStyle.value = createMaskAnimation(0, 300);
      // 动画结束后隐藏元素
      setTimeout(() => {
        show.value = false;
      }, 300); // 延时与动画时长一致
    }
  },
  { immediate: true }
);
</script>

<style lang="scss">
.modal-mask {
  position: fixed;
  z-index: 10000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 80%;
  margin: auto;
  background-color: #fff;
  border-radius: 24px;
  overflow: hidden;
  transform: scale(0.9); /* 初始缩放值 */
  opacity: 0; /* 初始透明度 */
  transition: opacity 0.3s ease, transform 0.3s ease; /* 进入动画 */
  &__inner {
    padding: 30px 30px;
  }
}

.modal-header {
  &__title {
    text-align: center;
    font-size: 32px;
    font-weight: bold;
    padding: 20px 0;
  }
}

.modal-body {
  margin: 20px 0;
}

.modal-footer {
  position: relative;
  border-top: 2px solid #f1f1f1;
  &__content {
    display: flex;
  }
  &__btn {
    flex: 1;
    font-weight: bold;
    font-size: 32px;
    text-align: center;
    padding: 30px 0;
    &:last-child {
      border-left: 2px solid #f1f1f1;
      color: #576b95;
    }
    &:active {
      background-color: #f1f1f1;
    }
  }
}
</style>
