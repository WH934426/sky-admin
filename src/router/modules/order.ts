import Layout from '@/layout/index.vue';

export default {
	path: '/order',
	component: Layout,
	children: [
		{
			path: '',
			component: () => import('@/views/order/index.vue'),
			name: 'Order',
			meta: {
				title: '订单管理',
				icon: 'order',
				order: 3
			}
		}
	]
};
