<template>
  <view class="mine-page">
    <TaroNavbar bgColor="transparent" :back="false" />
    <view class="personal-info">
      <view class="avatar">
        <image src=""></image>
      </view>
      <view class="intro">
        <view class="nickname">
          {{ '大米饮料' }}
        </view>
        <view class="phone">
          手机：{{ '13567950783' }}
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
</script>

<style lang="scss">
.mine-page {
  padding: 0 32px;
  color: rgba(0, 0, 0, 0.8);
  .personal-info {
    display: flex;
    .avatar {
      width: 128px;
      height: 128px;
      overflow: hidden;
      border-radius: 50%;
      background-color: #D8D8D8;
    }
    .intro {
      padding: 0 30px;
      .nickname {
        font-size: 40px;
        font-weight: 700;
      }
      .phone {
        margin-top: 20px;
        color: rgba(0, 0, 0, 0.3);
        font-size: 28px;
      }
    }
  }
}
</style>
