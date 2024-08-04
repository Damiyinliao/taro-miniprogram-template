<template>
  <view class="picker-list-wrapper flex-column">
    <example-item title="单选选择器">
      <picker
        mode="selector"
        :range="selector"
        :value="selectorValue"
        @change="handleSelectorChange"
      >
        <view class="component-inner-slot flex justify-between">
          <view class="component-inner-slot__label">请选择单个选项</view>
          <view class="component-inner-slot__value">{{ selector[selectorValue] }}</view>
        </view>
      </picker>
    </example-item>
    <example-item title="时间选择器">
      <picker
        mode="time"
        :value="time"
        @change="handleTimeChange"
      >
        <view class="component-inner-slot flex justify-between">
          <view class="component-inner-slot__label">请选择时间</view>
          <view class="component-inner-slot__value">{{ time }}</view>
        </view>
      </picker>
    </example-item>
    <example-item title="日期选择器">
      <picker
        mode="date"
        :value="defaultDate"
        @change="handleDateChange"
      >
        <view class="component-inner-slot flex justify-between">
          <view class="component-inner-slot__label">请选择日期</view>
          <view class="component-inner-slot__value">{{ defaultDate }}</view>
        </view>
      </picker>
    </example-item>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { CommonEvent } from '@tarojs/components/types/common'

const selector = ref(['杭州', '湖州', '台州', '绍兴', '舟山', '温州']);
const selectorValue = ref(0);

const time = ref('06:18');

const defaultDate = ref('2024-08-03');

function handleSelectorChange(e: CommonEvent) {
  selectorValue.value = e.detail.value
}

function handleTimeChange(e: CommonEvent) {
  time.value= e.detail.value
}

function handleDateChange (e: CommonEvent) {
  defaultDate.value = e.detail.value
}
</script>

<style lang="scss">
.picker-list-wrapper {
  gap: 32px;
}
</style>
