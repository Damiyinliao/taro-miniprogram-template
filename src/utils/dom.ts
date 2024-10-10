import Taro from "@tarojs/taro";

/** 获取指定选择器对应元素的位置信息和尺寸信息 */
export function getRect(selector: string): Promise<Taro.NodesRef.BoundingClientRectCallback> {
  return new Promise((resolve) => {
    const query = Taro.createSelectorQuery();
    query.select(selector).boundingClientRect();
    query.exec((rect = []) => resolve(rect[0]));
  })
}

/** 获取指定选择器对应多个元素的位置信息和尺寸信息 */
export function getMultipleRect(selector: string): Promise<Taro.NodesRef.BoundingClientRectCallbackResult[]> {
  return new Promise((resolve) => {
    const query = Taro.createSelectorQuery();
    query.selectAll(selector).boundingClientRect();
    query.exec((rect = []) => resolve(rect[0]));
  })
}
