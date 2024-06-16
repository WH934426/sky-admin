import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
  CancelTokenSource,
} from 'axios'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { getRequestKey, removePending, pending, checkPending } from './requestOptimize'
import { useUserStore } from '@/store'

const router = useRouter()
// 请求实例
const service: AxiosInstance = axios.create({
  // 读取环境配置文件中的VITE_APP_PREFIX,
  baseURL: import.meta.env.VITE_APP_PREFIX,
  timeout: 1000 * 10,
})

// 创建一个取消令牌源
const createCancelTokenSource = (): CancelTokenSource => axios.CancelToken.source()
// 拦截请求
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const userStore = useUserStore()
    // 获取token
    const token = userStore.token
    // 如果存在token
    if (token) {
      // 将token添加到请求头
      config.headers['token'] = `Bearer ${token}`
    } else if (config.url !== '/login') {
      // 如果不存在token且请求的url不为/login，则跳转到/login
      router.push('/login')
      throw new Error('Unauthorized')
    }

    // 如果请求方法为GET，且参数存在
    if (config.method?.toUpperCase() === 'GET' && config.params) {
      // 将参数转换为字符串并添加到url
      const paramsString = new URLSearchParams(config.params).toString()
      config.url += `${config.url?.includes('?') ? '&' : '?'}${paramsString}`
      // 删除参数
      delete config.params
    }

    // 获取请求的key
    const key = getRequestKey(config)
    // 如果存在重复请求
    if (checkPending(key)) {
      // 创建取消令牌源
      const source = createCancelTokenSource()
      // 将token添加到请求头
      config.cancelToken = source.token
      // 取消请求
      source.cancel('重复请求')
    } else {
      // 标记为正在请求
      pending[key] = true
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

// 拦截器，用于处理响应
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 如果响应的数据状态为401，则跳转到登录页面
    if (response.data.status === 401) {
      router.push('/login')
    }
    // 如果响应的配置存在，则将响应的URL替换为去除/api的值
    if (response.config && response.config.url) {
      response.config.url = response.config.url.replace('/api', '')
    }
    // 获取请求的key
    const key = getRequestKey(response.config)
    // 移除请求的key
    removePending(key)
    // 如果响应的数据代码为200，则返回响应
    if (response.data.code === 200) {
      return response
    }
    // 否则返回响应
    return response
  },
  (error) => {
    // 如果错误存在，且响应的状态为401，则跳转到登录页面
    if (error && error.response) {
      switch (error.response.status) {
        case 401:
          error.message = 'token 失效，请重新登录'
          router.push('/login')
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = '请求地址错误'
          break
        case 500:
          error.message = '服务器故障'
          break
        default:
          error.message = '网络连接故障'
      }
    }
    // 将错误的URL替换为去除/api的值
    error.config.url = error.config.url.replace('/api', '')
    // 获取请求的key
    const key = getRequestKey(error.config)
    // 移除请求的key
    removePending(key)
    // 返回错误
    return Promise.reject(error)
  },
)

export default service
