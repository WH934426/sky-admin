<script lang="ts" setup>
import SearchBar from './components/SearchBar.vue';
import DishTable from './components/DishTable.vue';
import { dishDeleteAPI, dishGetListAPI } from '@/apis/dish';
import type { DishVO } from '@/apis/types/dish';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useDishCategoryStore } from '@/stores';

const router = useRouter();

const name = ref('');
const page = ref(1);
const pageSize = ref(10);
const categoryId = ref<number | undefined>(undefined);
// 菜品状态 0 停售 1 起售
const saleStatus = ref<1 | 0 | undefined>(undefined);
const tableData = ref<DishVO[]>([]);
const total = ref(0);
const isSearch = ref(false);

/**
 * 获取菜品列表
 */
const getDishList = async (searching?: boolean) => {
	if (searching) {
		isSearch.value = false;
	}
	const params = {
		name: name.value,
		page: page.value,
		pageSize: pageSize.value,
		categoryId: categoryId.value,
		status: saleStatus.value
	};
	const res = await dishGetListAPI(params);
	tableData.value = res.data.records;
	total.value = res.data.total;
};

// 加载store中的菜品分类信息
const dishCateStore = useDishCategoryStore();
// 获取菜品分类
const dishCate = computed(() => dishCateStore.categories);

// 复选框
const checkList = ref<number[]>([]);

// 删除操作
const handleDelete = async (
	type: 'Simple' | 'Batch',
	rowId?: number | string
) => {
	if (type === 'Batch' && checkList.value.length === 0) {
		ElMessage.error('请选择要删除的菜品');
		return;
	}

	await ElMessageBox.confirm(
		`确定${type === 'Simple' ? '删除该' : '批量删除'}菜品吗？`,
		'提示',
		{
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		}
	);

	// 根据类型判断是单条删除还是批量删除
	const ids = type === 'Batch' ? checkList.value.join(',') : String(rowId);

	await dishDeleteAPI(ids);
	ElMessage.success(`${type === 'Simple' ? '删除' : '批量删除'}成功`);
	await getDishList();

	// 清空复选框
	if (type === 'Batch') {
		checkList.value = [];
	}
};

// 删除按钮
const deleteRow = (row: DishVO) => {
	handleDelete('Simple', row.id);
};

// 分页器
watch([page, pageSize], async () => {
	await getDishList();
});

onMounted(() => {
	getDishList();
	// 获取所有分类信息
	dishCateStore.getAllCategories();
});
</script>

<template>
	<div class="dashboard-container">
		<div class="container">
			<!-- 页面头部 -->
			<SearchBar
				v-model:model-value="name"
				v-model:dish-status="saleStatus"
				v-model:category-id="categoryId"
				:category-list="dishCate"
				@search="getDishList(true)"
				@clear="getDishList(true)"
			>
				<template #buttons>
					<el-button type="danger" @click="handleDelete('Batch')">
						批量删除
					</el-button>
					<el-button type="success" @click="router.push('/dish/add')">
						新建菜品
					</el-button>
				</template>
			</SearchBar>
			<!-- 表格 -->
			<DishTable
				v-if="tableData.length"
				:table-data="tableData"
				:is-search="isSearch"
				v-model:check-list="checkList"
				@delete="deleteRow"
				@toggle-status="getDishList"
			/>
			<!-- 空组件 -->
			<Empty v-else :is-search="isSearch" />
			<!-- 分页器 -->
			<Pagination
				v-model:currentPage="page"
				v-model:pageSize="pageSize"
				:total="total"
			/>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
