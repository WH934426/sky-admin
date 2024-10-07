import Layout from '@/layout/index.vue';

export default {
	path: '/statistics',
	component: Layout,
	children: [
		{
			path: '',
			component: () => import('@/views/statistics/index.vue'),
			name: 'Statistics',
			meta: {
				title: '数据统计',
				icon: 'statistics',
				order: 2
			}
		}
	]
};
