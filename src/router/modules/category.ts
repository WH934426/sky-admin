import Layout from '@/layout/index.vue';

export default {
	path: '/category',
	component: Layout,
	children: [
		{
			path: '',
			component: () => import('@/views/category/index.vue'),
			name: 'Category',
			meta: {
				title: '分类管理',
				icon: 'category',
				order: 6
			}
		}
	]
};
