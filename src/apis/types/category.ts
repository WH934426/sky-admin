/**
 * 分类模块
 */

// 分类查询条件
export interface CategoryPageQueryDTO {
	/**
	 * 分类名称
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
	 * 分类类型：1为菜品分类，2为套餐分类
	 */
	type?: number;
}

// 分类查询结果
export interface CategoryEntity {
	createTime: string;
	createUser: number;
	id: number;
	name: string;
	sort: number;
	status: number;
	type: number;
	updateTime: string;
	updateUser: number;
}

// 新增和修改菜品的数据
export interface CategoryDTO {
	// 分类id
	id?: number;
	// 分类名称
	name: string;
	// 排序，升序
	sort: number;
	// 菜品分类类型 1 菜品分类 2 套餐分类
	type: number;
}
