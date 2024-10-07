<script setup lang="ts">
defineProps<{ isActive: boolean }>();
const $emits = defineEmits(['toggleClick']);

const handleClick = () => {
	$emits('toggleClick');
};
</script>

<template>
	<div :class="[{ 'is-active': isActive }]" @click="handleClick">
		<svg-icon
			name="hamburger"
			width="20px"
			height="20px"
			class="icon"
			color="#fff"
		/>
	</div>
</template>

<style lang="scss" scoped>
.is-active {
	transform: rotate(180deg);
}
.icon {
	vertical-align: middle;
}
</style>
