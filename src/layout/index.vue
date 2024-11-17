<script lang="ts" setup>
import { useAppStore } from '@/stores';
import { AppMain, Navbar, Sidebar } from './components';

const appStore = useAppStore();
// 动态类名
const classObj = computed(() => {
	return {
		hideSidebar: !appStore.isSidebarOpened,
		openedSidebar: appStore.isSidebarOpened,
		withoutAnimation: appStore.isWithoutAnimation
	};
});
const openedSidebar = computed(() => appStore.isSidebarOpened);
const handleClickOutside = () => {
	appStore.closeSidebar(false);
};
</script>

<template>
	<div :class="classObj" class="app-wrapper">
		<div
			v-if="openedSidebar"
			class="drawer-bg"
			@click="handleClickOutside"
		></div>
		<Sidebar class="sidebar-container" />
		<div class="main-container">
			<Navbar />
			<AppMain />
		</div>
	</div>
</template>

<style lang="scss" scoped>
$sidebarWidth: 190px;

.app-wrapper {
	position: relative;
	height: 100%;
	width: 100%;
	min-width: 1366px;
	overflow-x: auto;
	overflow-y: hidden;

	&:after {
		content: '';
		display: table;
		clear: both;
	}

	.drawer-bg {
		background: #000;
		opacity: 0.3;
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		z-index: 999;
	}

	.sidebar-container {
		transition: width 0.28s;
		width: $sidebarWidth;
		height: 100%;
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		z-index: 1000;
		overflow: hidden;
	}

	.main-container {
		min-height: 100%;
		height: 100%;
		width: calc(100% - $sidebarWidth);
		margin-left: $sidebarWidth;
		background: #f3f4f7;
		position: relative;
	}
}

// 动态类名
.hideSidebar {
	.sidebar-container {
		width: 80px !important;
	}

	.main-container {
		margin-left: 80px;
		width: calc(100% - 80px);
	}
}

.withoutAnimation {
	.main-container,
	.sidebar-container {
		transition: none;
	}
}
</style>
