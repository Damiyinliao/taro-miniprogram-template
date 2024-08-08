<template>
  <view class="page-container" :style="rootStyle">
    <taro-navbar :title="props.navTitle"></taro-navbar>
    <page-title v-if="props.pageTitle">{{ pageTitle }}</page-title>
    <page-title v-else-if="pgTitle">{{ pgTitle }}</page-title>
    <view class="page-container__inner">
      <slot></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import Taro from '@tarojs/taro';
import { computed, ref } from 'vue';

interface Props {
  navTitle?: string;
  pageTitle?: string;
  bgColor?: string;
}
const props = withDefaults(defineProps<Props>(), {
  bgColor: '#F4F5F7'
});

const uiCategory = {
  we: 'We UI',
  taro: 'Taro UI',
  nut: 'Nut UI'
}
const uiType = ref('')
const pgTitle = computed(() => uiCategory[uiType.value] || '');

const router = Taro.useRouter();

const rootStyle = computed(() => ({
  backgroundColor: props.bgColor
}))

function onLoad() {
  const { ui } = router.params;
  if (ui) {
    uiType.value = ui
  }
}

onLoad();
</script>

<style lang="scss">
.page-container {
  flex: 1;
  &__inner {
    padding: 32px;
  }
}
</style>
