import type { RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/index.vue';

export const constantRoutes: Array<RouteRecordRaw> = [
	{
		path: '/',
		redirect: '/dashboard'
	},
	{
		path: '/login',
		component: () => import('@/views/login/index.vue'),
		meta: {
			hidden: true,
			title: '苍穹外卖',
			auth: false
		}
	},
	{
		path: '/404',
		component: () => import('@/views/404.vue'),
		meta: {
			hidden: true,
			title: '苍穹外卖',
			auth: false
		}
	},
	// TODO: 后期拆分
	{
		path: '/dashboard',
		component: Layout,
		children: [
			{
				path: '',
				component: () => import('@/views/dashboard/index.vue'),
				name: 'Dashboard',
				meta: {
					title: '工作台',
					icon: 'dashboard',
					order: 1
				}
			}
		]
	},
	// 添加路由信息在此之前
	{
		path: '/:catchAll(.*)',
		redirect: '/404'
	}
];
