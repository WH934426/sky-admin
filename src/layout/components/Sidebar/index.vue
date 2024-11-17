<script lang="ts" setup>
import { useAppStore } from '@/stores';
import type { RouteItem } from '@/types/router.d.ts';
import Logo from './Logo.vue';

// 是否折叠
const appStore = useAppStore();
const isCollapse = computed(() => !appStore.sidebar.opened);

const $route = useRoute();
const defaultActive = computed(() => $route.path);
const $router = useRouter();

// 提取后的路由信息接口
interface RouteVoid {
	path: string;
	title: string;
	icon: string | undefined;
	order: number;
}

// 提取所需字段的函数
function extractRouteInfo(routes: RouteItem[]): RouteVoid[] {
	return routes.reduce((acc: RouteVoid[], route) => {
		if (route.children && route.children.length > 0) {
			// 遍历子路由
			route.children.forEach((child) => {
				if (child.meta && child.meta.title && child.meta.order) {
					// 使用子路由的完整路径
					const fullPath = `${route.path}/${child.path}`.replace(/\/\//g, '/');
					acc.push({
						path: fullPath,
						title: child.meta.title,
						icon: child.meta.icon,
						order: child.meta.order
					});
				}
			});
		} else if (route.meta && route.meta.title && route.meta.order) {
			// 如果没有子路由，直接添加当前路由
			acc.push({
				path: route.path,
				title: route.meta.title,
				icon: route.meta.icon,
				order: route.meta.order
			});
		}
		return acc;
	}, []);
}

const extractedRoutes = computed(() =>
	extractRouteInfo($router.options.routes as unknown as RouteItem[])
);

// 确保菜单项按 order 排序
const sortedExtractedRoutes = computed(() => {
	return [...extractedRoutes.value].sort((a, b) => a.order - b.order);
});
</script>

<template>
	<div class="sidebar">
		<!-- Logo -->
		<Logo />
		<!-- 目录 -->
		<el-scrollbar wrap-class="scrollbar-wrapper">
			<el-menu
				:collapse="isCollapse"
				:collapse-transition="false"
				:default-active="defaultActive"
				:router="true"
			>
				<el-menu-item
					v-for="route in sortedExtractedRoutes"
					:key="route.path"
					:index="route.path"
					class="item"
				>
					<svg-icon
						:name="route.icon"
						class="icon"
						height="18px"
						width="18px"
					/>
					<span class="title">{{ route.title }}</span>
				</el-menu-item>
			</el-menu>
		</el-scrollbar>
	</div>
</template>

<style lang="scss" scoped>
.sidebar {
	height: 100%;
	width: 100%;

	.el-scrollbar {
		height: 100%;
		background-color: rgb(52, 55, 68);

		.el-scrollbar__view {
			height: 100%;
		}

		.el-scrollbar__bar.is-vertical {
			right: 0;
		}

		.el-scrollbar__bar.is-horizontal {
			display: none;
		}
	}

	.el-menu {
		border: none;
		height: calc(95vh - 23px);
		width: 100%;
		padding: 47px 15px 0;
		--el-menu-bg-color: #343744;
		--el-menu-text-color: #f4f4f5;
		--el-menu-active-color: #333333;

		.el-menu-item {
			color: #f4f4f5;
			height: 42px;
			line-height: 38px;
			margin: 0 0 20px 0;
			position: relative;
			font-size: 14px;

			&:hover {
				color: #ffffff;
				background: #ffc100;
				border-radius: 4px;

				span {
					color: #ffffff;
				}
			}
		}

		.el-menu-item.router-link-active,
		.el-menu-item.is-active {
			background-color: #e3e3e3;
			color: #f4f4f5;
			border-radius: 4px;

			span {
				color: #333333;
				font-weight: 500;
			}
		}

		.el-menu-item.is-active {
			color: #bfcbd9;
		}

		.el-submenu__title {
			font-size: 16px;
			position: relative;
			z-index: 9;
		}
	}

	.item {
		display: flex;
		align-items: center; // 垂直居中对齐
		padding: 0 20px; // 内边距可以根据需要调整

		.icon {
			margin-right: 20px; // 图标和标题之间的间距
			width: 18px; // 设置图标宽度
			height: 18px; // 设置图标高度
			display: inline-flex; // 确保图标是内联元素
			align-items: center; // 垂直居中对齐
			justify-content: center; // 水平居中对齐
		}

		.title {
			white-space: nowrap; // 防止标题换行
			overflow: hidden; // 隐藏溢出的内容
			text-overflow: ellipsis; // 溢出时显示省略号
		}
	}
}

// 隐藏侧边栏样式
.sidebar.hideSidebar {
	.el-menu {
		.el-menu-item {
			padding-left: 0;

			&:hover {
				background-color: #4d4d4d;
			}
		}

		.el-menu-item.router-link-active,
		.el-menu-item.is-active {
			background-color: #e3e3e3;
		}

		.el-menu-item.router-link-active:hover,
		.el-menu-item.is-active:hover {
			background-color: #ffc200;
		}
	}
}
</style>
