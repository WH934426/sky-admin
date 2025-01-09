import type {
	AxiosError,
	AxiosInstance,
	AxiosPromise,
	AxiosResponse,
	InternalAxiosRequestConfig
} from 'axios';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/stores';

const service: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_APP_BASE_URL,
	timeout: 5 * 60 * 1000 // 5分钟
});

// 请求拦截器
service.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		const userStore = useUserStore();
		const hasToken = userStore.userinfo.token;

		if (hasToken) {
			config.headers['token'] = hasToken;
		}
		return config;
	},
	(error: AxiosError) => {
		return Promise.reject(error);
	}
);

// 响应拦截器
service.interceptors.response.use(
	(response: AxiosResponse) => {
		// 调试信息
		console.log('response', response);
		if (response.data.code === 200) {
			return response.data;
		} else {
			ElMessage.error(response.data.message);
			return Promise.reject(new Error(response.data.message));
		}
	},
	(error: AxiosError) => {
		let message;
		const status = error.response?.status;
		switch (status) {
			case 401:
				message = 'token 失效，请重新登录';
				break;
			case 403:
				message = '拒绝访问';
				break;
			case 404:
				message = '请求地址错误';
				break;
			case 500:
				message = '服务器故障';
				break;
			default:
				message = '网络连接故障';
		}
		ElMessage.error(message);
		return Promise.reject(error);
	}
);

// 定义二次封装的API接口
const request = {
	get<T = any>(
		url: string,
		config?: Partial<InternalAxiosRequestConfig>
	): AxiosPromise<T> {
		return service.get(url, config);
	},

	post<T = any>(
		url: string,
		data?: object,
		config?: Partial<InternalAxiosRequestConfig>
	): AxiosPromise<T> {
		return service.post(url, data, config);
	},

	put<T = any>(
		url: string,
		data?: object,
		config?: Partial<InternalAxiosRequestConfig>
	): AxiosPromise<T> {
		return service.put(url, data, config);
	},

	delete<T = any>(
		url: string,
		config?: Partial<InternalAxiosRequestConfig>
	): AxiosPromise<T> {
		return service.delete(url, config);
	}
};
export default request;
