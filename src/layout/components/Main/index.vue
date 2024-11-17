<script lang="ts" setup></script>

<template>
	<section class="app-main">
		<router-view v-slot="{ Component, route }">
			<transition mode="out-in" name="fade-transform">
				<component :is="Component" :key="route.path" />
			</transition>
		</router-view>
	</section>
</template>

<style lang="scss" scoped>
.app-main {
	height: calc(100% - 64px);
	overflow-y: auto;
}
</style>
