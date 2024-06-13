import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios-miniprogram';

const config = {
  baseURL: process.env.TARO_APP_API,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
};

const CancelToken = axios.CancelToken

class RequestHttp {
  service: AxiosInstance;
  private pending: Record<string, any>

  public constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config);
    this.pending = {};

    /**
     * @description 请求拦截器
     * @param {AxiosRequestConfig} config 请求配置
     * @param {AxiosRequestConfig} config 请求配置
     */
    this.service.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const key = config.url + '&' + config.method
        this.removePending(key, true)
        config.cancelToken = new CancelToken(c => {
          this.pending[key] = c
        })
        return config;
      },
      (error: any) => {
        return Promise.reject(error);
      }
    );

    /**
     * @description 响应拦截器
     * @param {AxiosResponse} response 响应结果
     */

    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const key = response.config.url + '&' + response.config.method;
        this.removePending(key);
        return Promise.resolve(response);
      },
      (error: any) => {
        return Promise.reject(error);
      }
    )
  }
  removePending(key: string, isRequest = false) {
    try {
      if (this.pending[key] && isRequest) {
        this.pending[key]('取消重复请求')
      }
      delete this.pending[key]
    } catch (e) {
      console.warn(e)
    }
  }

  get(url: string, params?: any): Promise<AxiosResponse> | Promise<HttpResponse> {
    return this.service.get(url, { params });
  }
  post(url: string, data?: any): Promise<AxiosResponse> | Promise<HttpResponse> {
    return this.service.post(url, data);
  }
  put(url: string, data?: any): Promise<AxiosResponse> | Promise<HttpResponse> {
    return this.service.put(url, data);
  }
  delete(url: string, data?: any): Promise<AxiosResponse> | Promise<HttpResponse> {
    return this.service.delete(url, { data });
  }
  upload(url: string, data?: FormData): Promise<AxiosResponse> | Promise<HttpResponse> {
    return this.service.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
}

export default new RequestHttp(config);
