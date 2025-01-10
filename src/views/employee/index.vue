<script lang="ts" setup>
import { empGetListAPI } from '@/apis/employee';
import SearchBar from './components/SearchBar.vue';
import EmpTable from './components/EmpTable.vue';
import type { EmployeeEntity } from '@/apis/types/employee';

const name = ref(''); // 查询名称
const total = ref(0); // 总条数
const tableData = ref<EmployeeEntity[]>([]); // 表格数据
const page = ref(1); // 当前页码
const pageSize = ref(10); // 每页条数

// 获取员工列表
const getEmpList = async () => {
	// 构造查询条件
	const params = {
		name: name.value,
		page: page.value,
		pageSize: pageSize.value
	};
	const res = await empGetListAPI(params);
	total.value = res.data.total;
	tableData.value = res.data.records;
};

// 更新页码或每页条数时重新获取数据
watch([page, pageSize], getEmpList);

onMounted(() => {
	getEmpList();
});
</script>

<template>
	<div class="dashboard-container">
		<div class="container">
			<!-- 页面头部 -->
			<SearchBar v-model="name" @search="getEmpList" @clear="getEmpList" />
			<!-- 表格 -->
			<EmpTable :table-data="tableData" @account-status="getEmpList" />
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
