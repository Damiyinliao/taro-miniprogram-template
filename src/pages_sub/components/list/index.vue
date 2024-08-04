<template>
  <view class="cutom-page">
    <TaroNavbar title="列表" />
    <view class="custom-list flex-col">
      <example-item title="Modal" direction="row">
        <button type="primary" size="mini" @tap="showNativeModal">Native Modal</button>
        <button type="primary" size="mini" id="show-modal" @tap="onOpenModal">Custom Modal</button>
        <teleport to="#teleportId" v-if="showModal">
          <modal v-model:visible="showModal" title="Custom Modal">
            <template #body>
              <view>custom header</view>
            </template>
          </modal>
        </teleport>
      </example-item>
    </view>
    <view id="teleportId" class="teleportId"></view>
  </view>

</template>

<script setup lang="ts">
import Taro from '@tarojs/taro';
import { ref } from 'vue';
import Modal from '@/components/modal/index.vue';

const showModal = ref(false);
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
