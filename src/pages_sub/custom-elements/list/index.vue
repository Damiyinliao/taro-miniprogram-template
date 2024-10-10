<template>
  <view class="cutom-page">
    <TaroNavbar title="列表" />
    <view class="custom-list flex-col">
      <example-item title="Modal" direction="row">
        <button type="primary" size="mini" @tap="showNativeModal">Native Modal</button>
        <button type="primary" size="mini" id="show-modal" @tap="onOpenModal">Custom Modal</button>
        <modal v-model:visible="showModal" title="Custom Modal">
          <template #body>
            <view>custom header</view>
          </template>
        </modal>
      </example-item>
      <example-item title="半屏弹窗">
        <button type="primary" size="mini" @tap="onHalfScreen">点击展示</button>
        <HalfScreen v-model:visible="showHalfScreen"></HalfScreen>
      </example-item>
    </view>
  </view>
</template>

<script setup lang="ts">
import Taro from '@tarojs/taro';
import { ref } from 'vue';
import Modal from '@/components/modal/index.vue';
import HalfScreen from '@/pages_sub/components/HalfScreen.vue';

const showModal = ref(false);
const showHalfScreen = ref(false)
function onOpenModal() {
  showModal.value = true
}
function showNativeModal() {
  Taro.showModal({
    title: '提示',
    content: '原生modal',
    success: () => {

    }
  })
}

function onHalfScreen() {
  showHalfScreen.value = true
}
</script>

<style lang="scss">
.cutom-page {
  .custom-list {
    gap: 20px;
  }

}
.teleportId {
  position: relative;
}
</style>
