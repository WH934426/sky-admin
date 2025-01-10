import request from '@/utils/request.ts';
import type {
	EmployeeEntity,
	EmployeePageQueryDTO,
	LoginDTO,
	LoginVO
} from './types/employee';
import type { PageResult } from '@/types/result';

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

/**
 * 获取员工列表
 * @param params 分页查询参数
 * @return EmployeeEntity 员工列表
 */
export const empGetListAPI = (params: EmployeePageQueryDTO) => {
	return request.get<PageResult<EmployeeEntity>>('/employee/page', { params });
};

/**
 * 修改员工账号状态
 * @param params status 状态，id 员工id
 */ export const empUpdateStatusAPI = (params: any) => {
	return request.post(
		`/employee/status/${params.status}`,
		{},
		{
			params: {
				id: params.id
			}
		}
	);
};
