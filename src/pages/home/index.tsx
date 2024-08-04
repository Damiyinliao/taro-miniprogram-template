import Taro from '@tarojs/taro';
import { ref, defineComponent } from 'vue';
import { View, Text } from '@tarojs/components';
import TaroNavbar from '@/components/taro-navbar/index.vue'
import './index.scss'

export default defineComponent({
  name: 'Home',
  setup() {
    const msg = ref('Hello world');
    const loading = ref(false);

    Taro.usePullDownRefresh(() => {
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
        Taro.stopPullDownRefresh()
      }, 1000)
    });

    return () => {
      return (
        <View>
          <TaroNavbar title="首页" loading={loading.value} back={false} />
          <Text>{msg.value}</Text>
        </View>
      )
    }
  }
})
