<script setup lang="ts">
import { AppMain, Navbar, Sidebar } from './components';
import { useAppStore, DeviceType } from '@/stores';

const appStore = useAppStore();
// 动态类名
const classObj = computed(() => {
	return {
		hideSidebar: !appStore.sidebar.opened,
		openedSidebar: appStore.sidebar.opened,
		withoutAnimation: appStore.sidebar.withoutAnimation,
		mobile: appStore.device === DeviceType.Mobile
	};
});
const openedSidebar = computed(() => appStore.sidebar.opened);
const handleClickOutside = () => {
	appStore.closeSidebar(false);
};
</script>

<template>
	<div class="app-wrapper" :class="classObj">
		<div
			class="drawer-bg"
			v-if="classObj.mobile && openedSidebar"
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

// 移动端
.mobile {
	.sidebar-container {
		transition: transform 0.28s;
		width: $sidebarWidth 0.28s;
	}

	.main-container {
		margin-left: 0;
	}

	&.openedSidebar {
		position: fixed;
		top: 0;
	}
	&.hideSidebar {
		.sidebar-container {
			pointer-events: none;
			transition-duration: 0.3s;
			transform: translate3d(-$sidebarWidth, 0, 0);
		}
	}
}

.withoutAnimation {
	.main-container,
	.sidebar-container {
		transition: none;
	}
}
</style>
