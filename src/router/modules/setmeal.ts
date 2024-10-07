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
				title: '订单管理',
				icon: 'combo',
				setmeal: 4
			}
		}
	]
};
