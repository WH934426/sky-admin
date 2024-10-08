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
				title: '员工管理',
				icon: 'employee',
				order: 7
			}
		}
	]
};
