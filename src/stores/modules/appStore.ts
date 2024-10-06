import { defineStore } from 'pinia';
import { Set_Sidebar_Status } from '@/utils/auth';

export enum DeviceType {
	Mobile = 0,
	Desktop = 1
}

export const useAppStore = defineStore('app', () => {
	// 侧边栏状态
	const sidebar = ref({
		opened: true,
		withoutAnimation: false
	});

	/**
	 * 更新侧边栏状态
	 *
	 * @param status 'opened' | 'closed'
	 */
	const updateSidebarStatus = (status: 'opened' | 'closed') => {
		Set_Sidebar_Status(status);
	};

	/**
	 * 切换侧边栏的显示状态
	 *
	 * @param withoutAnimation 是否使用动画效果
	 */
	const toggleSidebar = (withoutAnimation: boolean) => {
		sidebar.value.opened = !sidebar.value.opened;
		sidebar.value.withoutAnimation = withoutAnimation;
		updateSidebarStatus(sidebar.value.opened ? 'opened' : 'closed');
	};

	/**
	 * 关闭侧边栏
	 * @param withoutAnimation 动画效果
	 */
	const closeSidebar = (withoutAnimation: boolean) => {
		sidebar.value.opened = false;
		sidebar.value.withoutAnimation = withoutAnimation;
		updateSidebarStatus('closed');
	};

	// 设置状态码
	const statusNumber = ref(0);
	const setStatusNumber = (device: DeviceType) => {
		statusNumber.value = device;
	};

	// 设备类型
	const device = ref(DeviceType.Desktop);
	const toggleDevice = (_device: DeviceType) => {
		device.value = _device;
	};

	return {
		sidebar,
		toggleSidebar,
		closeSidebar,
		statusNumber,
		setStatusNumber,
		device,
		toggleDevice
	};
});
