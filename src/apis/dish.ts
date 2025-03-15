import request from '@/utils/request';
import type {
	DishPageQueryDTO,
	DishVO,
	DishDTO,
	GetDishById
} from './types/dish';
import type { PageResult } from '@/types/result';

/**
 * 菜品分页查询
 * @param params 分页查询参数
 * @returns 分页查询结果
 */
export const dishGetListAPI = (params: DishPageQueryDTO) => {
	return request.get<PageResult<DishVO>>('/dish/page', { params });
};

/**
 * 批量删除菜品
 * @param ids 菜品id集合
 * @returns 删除后的列表数据
 */
export const dishDeleteAPI = (ids: string) => {
	return request.delete('/dish', { params: { ids } });
};

/**
 * 起售/停售菜品
 * @param status 起售/停售 0 停售 1 起售
 * @param id 菜品id
 */
export const dishUpdateStatusAPI = (status: number, id: number) => {
	return request.post(`/dish/status/${status}`, {}, { params: { id } });
};

/**
 * 添加菜品
 * @returns data 菜品数据
 */
export const dishAddAPI = (data: DishDTO) => {
	return request.post('/dish', data);
};

/**
 * 根据id查询菜品
 * @param id 菜品id
 * @returns
 */
export const dishGetByIdAPI = (id: number) => {
	return request.get<GetDishById>(`/dish/${id}`);
};

/**
 * 修改菜品
 * @param data 需要修改的菜品数据
 * @returns 修改后的菜品数据
 */
export const dishUpdateAPI = (data: DishDTO) => {
	return request.put('/dish', data);
};
