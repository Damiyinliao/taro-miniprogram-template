import Taro from '@tarojs/taro';
import { ref, defineComponent } from 'vue';
import { View, Text } from '@tarojs/components';
import CustomNavbar from '@/components/navbar/index.vue'
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
          <CustomNavbar title="首页" loading={loading.value} homeButton={true} />
          <Text>{msg.value}</Text>
        </View>
      )
    }
  }
})
