<template>
  <page-wrapper nav-title="个人信息" bg-color="#fff">
    <view class="">
      <button class="avatar-wrapper" open-type="chooseAvatar" @chooseAvatar="onChooseAvatar">
        <image class="avatar-image w-full h-full" :src="avatar" />
      </button>
    </view>
    <view class="">
      <view class="cell-input">
        <view class="cell-input__title">昵称</view>
        <view class="cell-input__content">
          <input type="nickname" placeholder="请输入昵称" v-model="nickName" @change="onChangeName" />
        </view>
      </view>
    </view>
  </page-wrapper>
</template>

<script setup lang="ts">
import Taro from '@tarojs/taro';
import { computed, ref, watch } from 'vue';
import { useUserStore } from '@/store';
import { CommonEvent } from '@tarojs/components';

const user = useUserStore();
const avatar = computed(() => user.getAvatar);
const nickName = computed(() => user.getNickName);

function onChooseAvatar(e: CommonEvent) {
  const { avatarUrl } = e.detail;
  user.setUserState('avatar', avatarUrl);
}

/** 获取微信昵称时在开发者工具上无法检测到值，真机上面可以 */
function onChangeName(e: CommonEvent) {
  Taro.showToast({ title: e.detail.value, icon: 'none', duration: 5000 })
  user.setUserState('nickName', e.detail.value);
}
</script>

<style lang="scss">
.avatar-wrapper {
  margin: 40px auto;
  width: 120px;
  height: 120px;
  padding: 0;
  border-radius: 14px;
  overflow: hidden;
}
.cell-input {
  padding: 32px;
  display: flex;
  align-items: center;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  &__title {
    width: 200px;
    font-size: 32px;
    text-align: left;
  }
  &__content {
    display: flex;
    align-items: center;
  }
}
</style>
