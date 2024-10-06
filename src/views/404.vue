<script setup lang="ts">
const $router = useRouter();
// 使用onMounted生命周期钩子来确保DOM已加载完毕
onMounted(() => {
	const timer = setTimeout(() => {
		$router.push('/dashboard');
	}, 700);

	// 清除定时器（当组件卸载时）
	onUnmounted(() => {
		clearTimeout(timer);
	});
});
</script>

<template>
	<el-empty description="暂无数据"></el-empty>
</template>

<style lang="scss" scoped></style>
