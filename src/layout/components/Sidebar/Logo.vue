<script lang="ts" setup>
import { useAppStore } from '@/stores';

// 是否折叠
const appStore = useAppStore();
const isCollapse = computed(() => !appStore.isSidebarOpened);
</script>

<template>
	<div class="logo">
		<div v-if="!isCollapse" class="sidebar-logo">
			<img
				alt=""
				src="@/assets/images/white_logo.png"
				style="width: 131px; height: 40px"
			/>
		</div>
		<div v-else class="sidebar-logo-mini">
			<img
				alt=""
				src="@/assets/images/mini-logo.png"
				style="width: 30px; height: 30px"
			/>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.logo {
	text-align: center;
	background-color: #ffc100;
	padding: 15px 0 0;
	height: 60px;

	img {
		display: inline-block;
	}
}
</style>
