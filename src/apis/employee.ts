import request from '@/utils/request.ts';
import type {
	EmployeeEntity,
	EmployeePageQueryDTO,
	LoginDTO,
	LoginVO,
	EmployeeDTO,
	EmployeeEditPasswordDTO
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

/**
 * 添加员工
 * @param data 员工数据
 */
export const empAddAPI = (data: EmployeeDTO) => {
	return request.post('/employee', data);
};

/**
 * 根据id获取员工信息
 * @param id 员工id
 */ export const empGetById = (id: number) => {
	return request.get<EmployeeEntity>(`/employee/${id}`);
};

/**
 * 修改员工信息
 * @param data 员工数据
 */
export const empUpdateAPI = (data: EmployeeDTO) => {
	return request.put('/employee', data);
};

/**
 * 修改员工密码
 * @param data 员工密码数据
 */
export const empUpdatePasswordAPI = (data: EmployeeEditPasswordDTO) => {
	return request.put('/employee/editPassword', data);
};
