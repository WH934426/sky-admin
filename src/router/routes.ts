import Layout from '@/layout/index.vue'
import type { RouteRecordRaw } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '苍穹外卖',
      hidden: true,
      notNeedAuth: true,
    },
  },
  {
    path: '/404',
    name: 'Not Found',
    component: () => import('@/views/404.vue'),
    meta: {
      title: '苍穹外卖',
      hidden: true,
      notNeedAuth: true,
    },
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: {
          title: '工作台',
          icon: 'dashboard',
          affix: true,
          sort: 1,
        },
      },
      {
        path: '/statistics',
        component: () => import('@/views/statistics/index.vue'),
        name: 'Statistics',
        meta: {
          title: '数据统计',
          icon: 'icon-statistics',
          sort: 2,
        },
      },
      {
        path: 'order',
        component: () => import('@/views/order/index.vue'),
        name: 'Order',
        meta: {
          title: '订单管理',
          icon: 'icon-order',
          sort: 3,
        },
      },
      {
        path: 'setmeal',
        component: () => import('@/views/setmeal/index.vue'),
        name: 'Setmeal',
        meta: {
          title: '套餐管理',
          icon: 'icon-combo',
          sort: 4,
        },
      },
      {
        path: '/setmeal/add',
        component: () => import('@/views/setmeal/AddSetmeal.vue'),
        name: 'AddSetmeal',
        meta: {
          title: '添加套餐',
          hidden: true,
        },
      },
      {
        path: 'dish',
        component: () => import('@/views/dish/index.vue'),
        name: 'Dish',
        meta: {
          title: '菜品管理',
          icon: 'icon-dish',
          sort: 5,
        },
      },
      {
        path: '/dish/add',
        component: () => import('@/views/dish/AddDishType.vue'),
        name: 'AddDishType',
        meta: {
          title: '添加菜品',
          hidden: true,
        },
      },
      {
        path: 'category',
        component: () => import('@/views/category/index.vue'),
        name: 'Category',
        meta: {
          title: '分类管理',
          icon: 'icon-category',
          sort: 6,
        },
      },
      {
        path: 'employee',
        component: () => import('@/views/employee/index.vue'),
        name: 'Employee',
        meta: {
          title: '员工管理',
          icon: 'icon-employee',
          sort: 7,
        },
      },
      {
        path: '/employee/add',
        component: () => import('@/views/employee/AddEmployee.vue'),
        name: 'AddEmployee',
        meta: {
          title: '添加员工',
          hidden: true,
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'NotFound',
    meta: {
      hidden: true,
    },
  },
]
