<template>
  <page-wrapper nav-title="Button" :page-title="pageTitle">
    <WeButton />
  </page-wrapper>
</template>

<script setup lang="ts">
import Taro from '@tarojs/taro';
import WeButton from './components/WeButton.vue';
import { computed, ref } from 'vue';

const uiCategory = {
  we: 'We UI',
  taro: 'Taro UI',
  nut: 'Nut UI'
}
const uiType = ref('')
const pageTitle = computed(() => uiCategory[uiType.value] || '');

const router = Taro.useRouter();

function onLoad() {
  const { ui } = router.params;
  console.log("🚀 ~ onLoad ~ ui:", ui)
  if (ui) {
    uiType.value = ui
  }
}

onLoad();
</script>

<style lang="scss">

</style>
