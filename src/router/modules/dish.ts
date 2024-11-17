import Layout from '@/layout/index.vue';

export default {
	path: '/dish',
	component: Layout,
	children: [
		{
			path: '',
			component: () => import('@/views/dish/index.vue'),
			name: 'Dish',
			meta: {
				title: '菜品管理',
				icon: 'dish',
				order: 5
			}
		},
		{
			path: 'add',
			component: () => import('@/views/dish/DishAdd.vue'),
			name: 'AddDish',
			meta: {
				title: '添加菜品',
				hidden: true
			}
		}
	]
};
