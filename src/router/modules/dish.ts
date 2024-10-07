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
		}
	]
};
