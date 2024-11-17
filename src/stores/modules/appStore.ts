import { Set_Sidebar_Status } from '@/utils/auth';
import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', () => {
	// 侧边栏状态
	const sidebar = ref({
		opened: true,
		withoutAnimation: false
	});

	/**
	 * 切换侧边栏的显示状态
	 *
	 * @param _withoutAnimation 是否使用动画效果
	 */
	const toggleSidebar = (_withoutAnimation: boolean) => {
		sidebar.value.opened = !sidebar.value.opened;
		sidebar.value.withoutAnimation = _withoutAnimation;
		if (sidebar.value.opened) {
			Set_Sidebar_Status('opened');
		} else {
			Set_Sidebar_Status('closed');
		}
	};

	/**
	 * 关闭侧边栏
	 * @param _withoutAnimation 动画效果
	 */
	const closeSidebar = (_withoutAnimation: boolean) => {
		sidebar.value.opened = false;
		sidebar.value.withoutAnimation = _withoutAnimation;
		Set_Sidebar_Status('closed');
	};

	const isSidebarOpened = computed(() => sidebar.value.opened);
	const isWithoutAnimation = computed(() => sidebar.value.withoutAnimation);

	return {
		sidebar,
		toggleSidebar,
		closeSidebar,
		isSidebarOpened,
		isWithoutAnimation
	};
});
