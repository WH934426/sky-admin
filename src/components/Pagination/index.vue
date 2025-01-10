<script lang="ts" setup>
interface Props {
	total: number;
	currentPage?: number;
	pageSize?: number;
	pageSizes?: number[];
}

const props = withDefaults(defineProps<Props>(), {
	currentPage: 1,
	pageSize: 10,
	pageSizes: () => [5, 10]
});

const emit = defineEmits<{
	(e: 'update:currentPage', value: number): void;
	(e: 'update:pageSize', value: number): void;
}>();

// 双向绑定当前页码和每页条数
const internalCurrentPage = ref(props.currentPage);
const internalPageSize = ref(props.pageSize);

watch(
	() => props.currentPage,
	(newVal) => {
		internalCurrentPage.value = newVal;
	}
);

watch(
	() => props.pageSize,
	(newVal) => {
		internalPageSize.value = newVal;
	}
);

watch(internalCurrentPage, () => {
	emit('update:currentPage', internalCurrentPage.value);
});

watch(internalPageSize, () => {
	emit('update:pageSize', internalPageSize.value);
});
</script>

<template>
	<el-pagination
		v-model:current-page="internalCurrentPage"
		v-model:page-size="internalPageSize"
		:hide-on-single-page="true"
		:page-sizes="props.pageSizes"
		:total="props.total"
		layout="total, sizes, prev, pager, next, jumper"
		class="page-list"
	/>
</template>

<style lang="scss" scoped>
.page-list {
	text-align: center;
	margin-top: 30px;
}
</style>
