<template>
  <view class="ui-list-page">
    <TaroNavbar title="列表" />
    <view class="module-list" v-for="item in moduleList" :key="item.id" :id="item.id">
      <view class="module-list__title">{{ item.name }}</view>
      <view class="module-list__item" v-for="(group, idx) in item.list" :key="idx">
        <view class="flex module-list__item-header" @tap="handleUnfold(group.id)">
          <view class="module-list__icon flex-center">
            <image :src="group.icon"></image>
          </view>
          <view class="module-list__info">
            <view class="title">{{ group.name }}</view>
            <view class="content">{{ group.desc }}</view>
          </view>
          <view class="module-list__arrow flex-center" :class="{active: group.id === activeGroupId}">
            <text class="guide-icon icon-font icon-fudianshouzhan"></text>
          </view>
        </view>
        <view class="group-pages" :class="{active: group.id === activeGroupId}">
          <view class="navigator-box" :class="{active: group.id === activeGroupId}">
            <view class="navigator-box__item" v-for="itemm in group.pages" :key="itemm.name" @tap="navTo(itemm.page)">
              <view>{{ itemm.name }}</view>
              <text class="icon-font icon-fudianshouzhan"></text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <AtDrawer :show="drawerVisible" right mask width="300px" @close="onClose">
      <view class="drawer-wrapper flex-col" :style="drawerStyle">
        <view
          class="drawer-item"
          v-for="(item, index) in drawerList"
          :key="index"
          @tap="navTo(item.page)"
        >
          <text>{{ item.name }}</text>
          <text class="icon-font icon-fudianshouzhan"></text>
        </view>
      </view>
    </AtDrawer>
  </view>
</template>

<script setup lang="ts">
import Taro from '@tarojs/taro';
import { computed, ref } from 'vue';
import { useAppStore } from '@/store/index';
import { navTo } from '@/utils/index';
import { AtDrawer } from 'taro-ui-vue3';
import IconForm from '@/assets/images/icon-list-form.png';
import IconBasic from '@/assets/images/icon-list-basic.png';
import IconView from '@/assets/images/icon-list-view.png';

type GroupList = {
  name: string;
  page: string;
}

const router = Taro.useRouter()
const app = useAppStore();
const activeGroupId = ref('');

const moduleList = [
  {
    name: 'WeUI',
    id: 'we',
    list: [
      {
        id: 'weui-basic',
        name: '基础',
        icon: IconBasic,
        desc: '包含图标、按钮等',
        pages: [
          {
            name: 'Button',
            page: '/pages_sub/ui/button/index?ui=we'
          },
          {
            name: 'Icon',
            page: '/pages_sub/ui/icon/index?ui=we'
          }
        ]
      },
      {
        id: 'weui-form',
        name: '表单',
        icon: IconForm,
        desc: '包含标签栏、导航栏、分段器等',
        pages: [
          {
            name: 'Switch',
            page: '/pages_sub/ui/switch/index?ui=we'
          },
          {
            name: 'Picker',
            page: '/pages_sub/ui/picker/index?ui=we'
          }
        ]
      },
      {
        id: 'weui-view',
        name: '视图',
        icon: IconView,
        desc: '包含弹窗、标签等',
        pages: [
          {
            name: 'View',
            page: '/pages_sub/ui/view/index?ui=we'
          }
        ]
      }
    ]
  },
  {
    id: 'nut',
    name: 'NutUI',
    list: [
      {
        id: 'nutui-from',
        name: '表单',
        icon: IconForm,
        desc: '包含标签栏、导航栏、分段器等',
        pages: [
          {
            name: 'Icon',
            page: '/pages_sub/ui/icon/index'
          },
          {
            name: 'Picker',
            page: '/pages_sub/ui/picker/index'
          }
        ]
      },
    ]
  },
  {
    id: 'taro',
    name: 'TaroUI',
    list: [
      {
        id: 'taroui-form',
        name: '表单',
        icon: IconForm,
        desc: '包含标签栏、导航栏、分段器等',
        pages: [
          {
            name: 'Icon',
            page: '/pages_sub/ui/icon/index'
          },
          {
            name: 'Picker',
            page: '/pages_sub/ui/picker/index'
          }
        ]
      },
    ]
  }
]

const drawerVisible = ref(false);
const drawerList = ref<GroupList[]>([])
const drawerStyle = computed(() => ({
  paddingTop: `${app.navHeight}px`
}));

function handleUnfold(id: string) {
  if (activeGroupId.value && activeGroupId.value !== id) {
    activeGroupId.value = id
  } else if (!activeGroupId.value) {
    activeGroupId.value = id
  } else {
    activeGroupId.value = ''
  }
}

function showDrawer(list: GroupList[]) {
  drawerList.value = list;
  drawerVisible.value = true
}

function onClose() {
  drawerVisible.value = false
}

function onLoad() {
  const { anchor } = router.params;
  console.log("🚀 ~ onLoad ~ anchor:", anchor)
  if (anchor) {
    Taro.pageScrollTo({
      selector: `#${anchor}`,
      duration: 300,
    })
  }
}

Taro.useLoad(onLoad);
</script>

<style lang="scss">
.ui-list-page {
  .module-list {
    padding: 32px;
    &__title {
      font-size: 32px;
      font-weight: bold;
      border-left: 5px solid #009688;
      padding: 5px 20px;
      margin-bottom: 10px;
    }
    &__item {
      display: flex;
      flex-direction: column;
      background-color: #fff;
      box-shadow: 0 8px 40px 0 rgba(0, 0, 0, 0.04);
      border-radius: 10px;
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    &__item-header {
      padding: 20px 30px;
      flex: 1;
      gap: 24px;
    }
    &__icon {
      width: 70px;
      height: 70px;
      border: 5px solid rgba(120, 164, 250, 0.16);
      border-radius: 50%;
      image {
        width: 30px;
        height: 30px;
      }
    }
    &__info {
      flex: 1;
      .title {
        color: #6a6a77;
        font-size: 28px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      .content {
        color: #88889c;
        font-size: 22px;
      }
    }
    &__arrow {
      width: 62px;
      height: 62px;
      color: #fff;
      text-align: center;
      background: #009688;
      box-shadow: 4px 10px 30px 0 rgba(120, 164, 250, 0.3);
      border-radius: 50%;
      transition: all .3s;
      &.active {
        transform: rotate(90deg);
      }
    }
  }
  .drawer-wrapper {
    padding: 32px;
    gap: 32px;
    height: 90%;
    justify-content: center;
    .drawer-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px 0;
      border-bottom: 2px solid #eee;
      &:active {
        background-color: #eee;
      }
    }
  }
  .group-pages {
    height: 0;
    overflow: hidden;
    &.active {
      height: auto;
    }
    .navigator-box {
      opacity: 0;
      position: relative;
      background-color: #fff;
      line-height: 1.41176471;
      font-size: 34px;
      transform: translateY(-50%);
      transition: .3s;
      &.active {
        opacity: 1;
        transform: translateY(0);
      }
      &__item {
        border-top: 1px solid rgba(0,0,0,0.1);
        padding: 20px 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        &:active {
          background-color: #f1f1f1;
        }
      }
    }
  }
}
</style>

