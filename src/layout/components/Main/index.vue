<script setup lang="ts"></script>

<template>
	<section class="app-main">
		<router-view v-slot="{ Component, route }">
			<transition name="fade-tranform" mode="out-in">
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
