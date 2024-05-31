import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios-miniprogram';

const config = {
  baseURL: process.env.TARO_APP_API,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
};

interface HttpResponse {
  code: number;
  data: any;
  msg: string;
}

class RequestHttp {
  service: AxiosInstance;
  public constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config);

    /**
     * @description 请求拦截器
     * @param {AxiosRequestConfig} config 请求配置
     * @param {AxiosRequestConfig} config 请求配置
     */
    this.service.interceptors.request.use(
      (config: AxiosRequestConfig) => {
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
        return response;
      },
      (error: any) => {
        return Promise.reject(error);
      }
    )
  }

  get(url: string, params?: any): Promise<AxiosResponse> | Promise<HttpResponse> {
    return this.service.get(url, { params });
  }
}

export default new RequestHttp(config);
