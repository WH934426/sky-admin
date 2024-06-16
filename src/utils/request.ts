import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'

// 请求实例
const service: AxiosInstance = axios.create({
  // 读取环境配置文件中的VITE_APP_PREFIX,
  baseURL: import.meta.env.VITE_APP_PREFIX,
  timeout: 1000 * 10,
})

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // TODO 在请求头中添加token
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, message, data } = response.data
    if (code === 200) {
      return data
    } else {
      return Promise.reject(new Error(message))
    }
  },
  (error: AxiosError) => {
    let message = ''
    const status = error.response?.status
    switch (status) {
      case 401:
        message = 'token 失效，请重新登录'
        break
      case 403:
        message = '拒绝访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器故障'
        break
      default:
        message = '网络连接故障'
    }
    console.log(message)
    return Promise.reject(error)
  },
)

// 定义二次封装的API接口
const request = {
  get<T = any>(url: string, config?: InternalAxiosRequestConfig): Promise<T> {
    return service.get(url, config)
  },
  post<T = any>(url: string, data?: object, config?: InternalAxiosRequestConfig): Promise<T> {
    return service.post(url, data, config)
  },
  put<T = any>(url: string, data?: object, config?: InternalAxiosRequestConfig): Promise<T> {
    return service.put(url, data, config)
  },
  delete<T = any>(url: string, config?: InternalAxiosRequestConfig): Promise<T> {
    return service.delete(url, config)
  },
}

export default request
