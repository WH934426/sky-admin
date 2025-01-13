import request from '@/utils/request.ts';
import type {
	CategoryPageQueryDTO,
	CategoryEntity,
	CategoryDTO
} from './types/category.ts';
import type { PageResult } from '@/types/result';

/**
 * 获取分类列表
 * @param params 分类列表查询
 * @returns 列表数据
 */
export const categoryGetListAPI = (params: CategoryPageQueryDTO) => {
	return request.get<PageResult<CategoryEntity>>('/category/page', { params });
};

/**
 * 根据id删除菜品分类
 * @param id 菜品分类id
 */
export const categoryDeleteAPI = (id: number) => {
	return request.delete('/category', { params: { id } });
};
/**
 * 添加菜品分类
 * @param data 菜品分类信息
 */
export const categoryAddAPI = (data: CategoryDTO) => {
	return request.post('/category', data);
};

/**
 * 修改菜品分类
 * @param data 菜品分类信息
 */
export const categoryUpdateAPI = (data: CategoryDTO) => {
	return request.put('/category', data);
};

/**
 * 启用/禁用菜品分类
 * @param status 启用/禁用状态 0 禁用 1 启用
 * @param id 菜品分类id
 */
export const categoryUpdateStatusAPI = (status: number, id: number) => {
	return request.post(`/category/status/${status}`, {}, { params: { id } });
};
