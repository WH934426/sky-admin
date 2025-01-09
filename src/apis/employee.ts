import request from '@/utils/request.ts';
import type { LoginDTO, LoginVO } from './types/employee';

/**
 * 员工登录
 * @param data 员工登录数据
 * @return EmployeeLoginVO 员工登录返回数据
 */
export const empLoginAPI = (data: LoginDTO) => {
	return request.post<LoginVO>('/employee/login', data);
};

/**
 * 员工退出登录
 */
export const empLogoutAPI = () => {
	return request.post('/employee/logout');
};
