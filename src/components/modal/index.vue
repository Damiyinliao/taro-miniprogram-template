<template>
  <Transition name="modal">
    <view v-if="show" class="modal-mask">
      <view class="modal-container">
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
              <view class="modal-footer__btn" v-if="showCancel" @tap="onCancel()">取消</view>
              <view class="modal-footer__btn" @tap="onConfirm">确定</view>
            </view>
          </slot>
        </view>
      </view>
    </view>
  </Transition>
</template>
<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  title?: string
  visible: boolean;
  showCancel?: boolean;
}

interface Emits {
  (e: 'update:visible', visible: boolean): void;
  (e: 'confirm'): void
}

const props = withDefaults(defineProps<Props>(), {
  showCancel: true
});
const emit = defineEmits<Emits>();

const show = computed({
  get() {
    return props.visible
  },
  set(val) {
    onCancel(val)
  }
})

function onCancel(val: boolean = false) {
  setTimeout(() => {
    emit('update:visible', val)
  }, 50)
}

function onConfirm() {
  emit('confirm');
  onCancel()
}
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
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 80%;
  margin: auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  border-radius: 24px;
  overflow: hidden;
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

.modal-default-button {
  float: right;
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

/*
 * 对于 transition="modal" 的元素来说
 * 当通过 Vue.js 切换它们的可见性时
 * 以下样式会被自动应用。
 *
 * 你可以简单地通过编辑这些样式
 * 来体验该模态框的过渡效果。
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
