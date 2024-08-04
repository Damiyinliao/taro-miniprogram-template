<template>
  <view class="weui-switch">
    <example-item title="基础用法-开关">
      <switch :checked="switchChecked" @change="switchChange"/>
    </example-item>
    <example-item title="禁用状态">
      <switch :checked="switchChecked" :disabled="true" />
    </example-item>
    <example-item title="颜色">
      <switch :checked="switchChecked" color="#009688" @change="switchChange" />
    </example-item>
    <example-item title="checkbox形状">
      <switch type="checkbox" :checked="switchChecked2" @change="switchChange2"/>
    </example-item>
  </view>
</template>
<!-- 自定义switch -->
<!-- https://developers.weixin.qq.com/community/develop/article/doc/0008a880750fc04a50a94193c51013 -->

<script setup lang="ts">
import { ref } from 'vue';
import { CommonEvent } from '@tarojs/components/types/common';

const switchChecked = ref(true);
const switchChecked2 = ref(false);

function switchChange(e: CommonEvent) {
  console.log("🚀 ~ switchChange ~ e:", e);
  switchChecked.value = e.detail.value;
}
function switchChange2(e: CommonEvent) {
  switchChecked2.value = e.detail.value;
}
</script>

<style lang="scss">

</style>
