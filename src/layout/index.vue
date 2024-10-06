<script setup lang="ts">
import { AppMain, Navbar, Sidebar } from './components';
</script>

<template>
	<div class="app-wrapper">
		<Sidebar class="sidebar-container" />
		<div class="main-container">
			<Navbar />
			<AppMain />
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
