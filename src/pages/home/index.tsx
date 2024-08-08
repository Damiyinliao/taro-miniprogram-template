import Taro from '@tarojs/taro';
import { ref, defineComponent } from 'vue';
import { View, Text, Button } from '@tarojs/components';
import TaroNavbar from '@/components/taro-navbar/index.vue';
import router from '@/router';
import './index.scss'

export default defineComponent({
  name: 'Home',
  setup() {

    const loading = ref(false);

    Taro.usePullDownRefresh(() => {
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
        Taro.stopPullDownRefresh()
      }, 1000)
    });

    function handleNav() {
      router.push('/index')
    }

    return () => {
      return (
        <View>
          <TaroNavbar title="首页" loading={loading.value} back={false} />
          {/* 必须使用layout布局才能使用router来进行导航 */}
          {/* <Button type="primary" size='mini' onClick={handleNav}>跳转到index页面</Button> */}
        </View>
      )
    }
  }
})
