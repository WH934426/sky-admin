import axios from 'axios';
import type {
	AxiosInstance,
	InternalAxiosRequestConfig,
	AxiosError,
	AxiosResponse
} from 'axios';

const request: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_APP_BASE_URL,
	timeout: 5 * 60 * 1000 // 5分钟
});

// 请求拦截器
request.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		// TODO: 添加token，并实现鉴权
		return config;
	},
	(error: AxiosError) => {
		return Promise.reject(error);
	}
);

// 响应拦截器
request.interceptors.response.use(
	(response: AxiosResponse) => {
		console.log('resonse', response);
		if (response.status === 401) {
			// TODO: 使用vue-router进行跳转
			window.location.href = '/login';
		}

		// 清除代理路径
		if (response.config.url) {
			response.config.url = response.config.url.replace('/api', '');
		}
		return response.data;
	},
	(error: AxiosError) => {
		if (error && error.response) {
			switch (error.response.status) {
				case 401:
					// TODO: 使用vue-router进行跳转
					window.location.href = '/login';
					break;
				case 405:
					error.message = '请求错误';
					break;
			}
		}
		// 清除代理路径
		if (error.config && error.config.url) {
			error.config.url = error.config.url.replace('/api', '');
		}
		return Promise.reject(error);
	}
);

export default request;
