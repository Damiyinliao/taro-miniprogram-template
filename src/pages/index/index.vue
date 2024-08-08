<template>
  <page-wrapper nav-title="index">
    <view class="flex-center">{{ msg }}</view>
  </page-wrapper>
</template>

<script>
import { ref } from 'vue'
import './index.scss'

export default {
  setup () {
    const msg = ref('Hello world')
    return {
      msg
    }
  }
}
</script>
