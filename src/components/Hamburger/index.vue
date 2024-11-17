<script lang="ts" setup>
defineProps<{ isActive: boolean }>();
const $emits = defineEmits(['toggleClick']);

const handleClick = () => {
	$emits('toggleClick');
};
</script>

<template>
	<div :class="[{ 'is-active': isActive }]" @click="handleClick">
		<svg-icon
			class="icon"
			color="#fff"
			height="20px"
			name="hamburger"
			width="20px"
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
