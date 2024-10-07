import Layout from '@/layout/index.vue';

export default {
	path: '/employee',
	component: Layout,
	children: [
		{
			path: '',
			component: () => import('@/views/employee/index.vue'),
			name: 'Employee',
			meta: {
				title: '订单管理',
				icon: 'employee',
				employee: 7
			}
		}
	]
};
