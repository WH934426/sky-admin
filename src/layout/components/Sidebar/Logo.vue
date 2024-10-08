<script setup lang="ts">
import { useAppStore } from '@/stores';
// 是否折叠
const appStore = useAppStore();
const isCollapse = computed(() => !appStore.sidebar.opened);
</script>

<template>
	<div class="logo">
		<div class="sidebar-logo" v-if="!isCollapse">
			<img
				src="@/assets/images/white_logo.png"
				alt=""
				style="width: 131px; height: 40px"
			/>
		</div>
		<div class="sidebar-logo-mini" v-else>
			<img
				src="@/assets/images/mini-logo.png"
				alt=""
				style="width: 30px; height: 30px"
			/>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.logo {
	text-align: center;
	background-color: #4b3e37;
	padding: 15px 0 0;
	height: 60px;
	img {
		display: inline-block;
	}
}
</style>
