import Taro from "@tarojs/taro";

/**
 * @description 封装页面跳转
 * @param url 跳转的路径
 * @param params 跳转的参数
 */
export function navTo(url: string, params?: Object) {
  const p = params ? Object.keys(params).map(key => `${key}=${params[key]}`).join('&') : '';
  Taro.navigateTo({
    url: `${url}?${p}`
  });
}

/**
 * @description 复制数据到剪切板
 */
export function copySomething(value: number|string) {
  Taro.setClipboardData({
    data: value.toString(),
    success: function () {
      Taro.showToast({
        title: '复制成功',
        icon: 'success',
        duration: 2000
      })
    }
  })
}
