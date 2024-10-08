import Layout from '@/layout/index.vue';

export default {
	path: '/setmeal',
	component: Layout,
	children: [
		{
			path: '',
			component: () => import('@/views/setmeal/index.vue'),
			name: 'Setmeal',
			meta: {
				title: '套餐管理',
				icon: 'combo',
				order: 4
			}
		}
	]
};
