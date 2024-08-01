<template>
  <nut-config-provider>
    <nut-tabbar v-model="active" @tab-switch="tabSwitch" bottom safe-area-inset-bottom placeholder>
      <nut-tabbar-item
        v-for="(item, index) in List"
        :key="index"
        :tab-title="item.title"
        :icon="item.icon"
      >
      </nut-tabbar-item>
    </nut-tabbar>
  </nut-config-provider>
</template>

<script lang="ts" setup>
import { h, ref } from 'vue'
import { Home, Category, Find, Cart, My } from '@nutui/icons-vue-taro'

const active = ref(0);

const List = ref([
  {
    title: 'Home',
    icon: h(Home)
  },
  {
    title: 'Category',
    icon: h(Category)
  },
  {
    title: 'Find',
    icon: h(Find)
  },
  {
    title: 'Cart',
    icon: h(Cart)
  },
  {
    title: 'My',
    icon: h(My)
  }
])

const tabSwitch = (item: Record<string, unknown>, index: number) => {
  console.log(item, index)
}
</script>

<style lang="scss">

</style>
