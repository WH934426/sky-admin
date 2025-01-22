/**
 * 菜品模块
 */

// 菜品分页查询
export interface DishPageQueryDTO {
	/**
	 * 分类id
	 */
	categoryId?: number;
	/**
	 * 菜品名称
	 */
	name?: string;
	/**
	 * 页码
	 */
	page: number;
	/**
	 * 每页记录数
	 */
	pageSize: number;
	/**
	 * 分类状态
	 */
	status?: number;
	[property: string]: any;
}

// 菜品分页查询返回值
export interface DishVO {
	/**
	 * 菜品分类id
	 */
	categoryId: number;
	/**
	 * 分类名称
	 */
	categoryName: string;
	/**
	 * 描述信息
	 */
	description: string;
	id: number;
	/**
	 * 菜品图片
	 */
	image: string;
	/**
	 * 菜品名称
	 */
	name: string;
	/**
	 * 菜品价格
	 */
	price: number;
	/**
	 * 菜品状态 0 停售 1 起售
	 */
	status: number;
	updateTime: string;
}
