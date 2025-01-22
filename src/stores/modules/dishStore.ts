import { defineStore } from 'pinia';
import { dishGetListAPI } from '@/apis/dish';

// 定义 DishCate 接口
interface DishCate {
	value: number;
	label: string;
}

export const useDishCategoryStore = defineStore('dishCategory', () => {
	// 存储菜品分类信息
	const categories = ref<DishCate[]>([]);
	// 加载状态
	const loading = ref(false);
	// 错误信息
	const error = ref<Error | null>(null);

	/**
	 * 获取所有菜品分类
	 * @returns 菜品分类信息
	 */
	const getAllCategories = async () => {
		// 如果 categories 已经有数据，则直接返回，避免重复请求
		if (categories.value.length > 0) {
			return;
		}
		// 设置加载状态为 true，表示正在加载数据
		loading.value = true;
		try {
			let page = 1;
			const pageSize = 10;
			// 创建一个 Map 用于存储分类信息，避免重复
			const categoryMap = new Map();

			// 使用 while 循环不断请求下一页数据，直到没有更多数据
			while (true) {
				const params = {
					page,
					pageSize
				};

				// 调用 接口获取数据
				const res = await dishGetListAPI(params);
				// 获取当前页的分类数据
				const records = res.data.records;

				// 如果当前页没有数据，则跳出循环
				if (records.length === 0) break;

				// 遍历当前页的分类数据
				records.forEach((dish) => {
					// 如果 categoryMap 中还没有当前分类，则添加进去
					if (!categoryMap.has(dish.categoryId)) {
						categoryMap.set(dish.categoryId, {
							value: dish.categoryId,
							label: dish.categoryName
						});
					}
				});

				// 如果总数据量小于等于当前页码乘以每页大小，则跳出循环
				if (res.data.total <= page * pageSize) break;
				// 页码加 1，继续请求下一页数据
				page++;
			}

			// 将 categoryMap 中的所有分类转换为数组，并赋值给 categories
			categories.value = Array.from(categoryMap.values());
		} catch (err: any) {
			error.value = err;
		} finally {
			loading.value = false;
		}
	};

	return {
		categories,
		getAllCategories
	};
});
