import { defineStore } from 'pinia';
import type { LoginDTO, LoginVO } from '@/apis/types/employee';
import { Get_Token, Remove_Token, Set_Token } from '@/utils/auth';
import { empLoginAPI, empLogoutAPI } from '@/apis/employee';

export const useUserStore = defineStore('user', () => {
	const userinfo = ref<LoginVO>({
		id: 0,
		name: '',
		username: '',
		token: Get_Token() || ''
	});

	/**
	 * 登录
	 * @param data 登录参数
	 */
	const login = async (data: LoginDTO) => {
		const res = await empLoginAPI(data);

		// 保存用户信息
		userinfo.value.token = res.data.token;
		userinfo.value.name = res.data.name;
		userinfo.value.username = res.data.username;

		// 保存token到本地
		Set_Token(res.data.token);
	};

	/**
	 * 员工退出登录
	 */
	const logout = async () => {
		await empLogoutAPI();
		// 清除用户信息
		userinfo.value = {
			id: 0,
			name: '',
			username: '',
			token: ''
		};
		// 清除token
		Remove_Token();
	};

	return {
		userinfo,
		login,
		logout
	};
});
