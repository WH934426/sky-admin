<script lang="ts" setup>
import { CategoryEntity } from '@/apis/types/category';
import SearchBar from './components/SearchBar.vue';
import CateTable from './components/CateTable.vue';
import CateDialog from './components/CateDialog.vue';
import { categoryGetListAPI } from '@/apis/category';

const name = ref(''); // 分类名称
const page = ref(1); // 当前页
const pageSize = ref(10); // 每页显示条数
const categoryType = ref<number | undefined>(undefined); // 分类类型
const tableData = ref<CategoryEntity[]>([]); // 表格数据
const total = ref(0); // 总条数
const isSearch = ref(false); // 区分搜不到还是无数据

/**
 * 获取分类数据
 * @param searching 是否查询
 */
const getCategoryList = async (searching?: boolean) => {
	if (searching) {
		isSearch.value = false;
	}
	const params = {
		name: name.value,
		page: page.value,
		pageSize: pageSize.value,
		type: categoryType.value
	};
	const res = await categoryGetListAPI(params);
	tableData.value = res.data.records;
	total.value = res.data.total;
};

const dialogVisible = ref(false); // 弹框可见性
const dialogTitle = ref(''); // 弹框标题
/**
 * 新增分类按钮
 * @param type 分类类型
 */
const handleAddClass = (type: 'dish' | 'setmeal') => {
	dialogVisible.value = true;
	dialogTitle.value = type === 'dish' ? '添加菜品分类' : '添加套餐分类';
};

const cateId = ref(0); // 分类id
/**
 * 修改分类按钮
 * @param row
 */
const handleEdit = (row: CategoryEntity) => {
	dialogVisible.value = true;
	cateId.value = row.id as number;
	dialogTitle.value = row.type === 1 ? '修改菜品分类' : '修改套餐分类';
};

// 提交表单
const handleSubmit = async (payload: { data: any; isCountinue: boolean }) => {
	if (!payload.isCountinue) {
		dialogVisible.value = false;
	}
	await getCategoryList();
};

// 关闭弹窗
const handleColseDialog = () => {
	dialogVisible.value = false;
};

// 分页器
watch([page, pageSize], async () => {
	await getCategoryList(true);
});

onMounted(async () => {
	await getCategoryList();
});
</script>

<template>
	<div class="dashboard-container">
		<div class="container">
			<!-- 页面头部 -->
			<SearchBar
				v-model:model-value="name"
				v-model:category-type="categoryType"
				@search="getCategoryList(true)"
				@add="handleAddClass"
			/>
			<!-- 表格 -->
			<CateTable
				v-if="tableData.length"
				:table-data="tableData"
				:is-search="isSearch"
				@edit="handleEdit"
				@delete="getCategoryList()"
				@toggle-status="getCategoryList()"
			/>
			<!-- 空组件 -->
			<Empty v-else :is-search="isSearch" />
			<!-- 分页器 -->
			<Pagination
				v-model:currentPage="page"
				v-model:pageSize="pageSize"
				:total="total"
			/>
			<!-- 弹窗 -->
			<CateDialog
				:category-id="cateId"
				:dialog-visible="dialogVisible"
				:dialog-title="dialogTitle"
				@submit="handleSubmit"
				@close="handleColseDialog"
			/>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
