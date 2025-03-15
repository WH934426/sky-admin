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

/**
 * 新增菜品需要的数据
 */
export interface DishDTO {
	/**
	 * 分类id
	 */
	categoryId: number;
	/**
	 * 菜品描述
	 */
	description?: string;
	/**
	 * 口味
	 */
	flavors?: DishFlavorEntity[];
	/**
	 * 菜品id
	 */
	id?: number;
	/**
	 * 菜品图片路径
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
	 * 菜品状态：1为起售，0为停售
	 */
	status?: number;
}

/**
 * DishFlavor
 */
export interface DishFlavorEntity {
	/**
	 * 菜品id
	 */
	dishId?: number;
	/**
	 * 口味id
	 */
	id?: number;
	/**
	 * 口味名称
	 */
	name: string;
	/**
	 * 口味值
	 */
	value: string;
}

export type GetDishById = DishVO & DishFlavorEntity[];
