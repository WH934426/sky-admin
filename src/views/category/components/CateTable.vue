<script setup lang="ts">
import { categoryDeleteAPI, categoryUpdateStatusAPI } from '@/apis/category';
import { CategoryEntity } from '@/apis/types/category';
import { ElMessageBox, ElMessage } from 'element-plus';

defineProps<{
	tableData: CategoryEntity[];
	isSearch: boolean;
}>();

// 定义事件
const $emits = defineEmits(['edit', 'delete', 'toggleStatus']);

/**
 * 修改按钮
 * @param row
 */
const editBtn = async (row: CategoryEntity) => {
	$emits('edit', row);
};

/**
 * 删除按钮
 * @param row
 */
const delBtn = async (row: CategoryEntity) => {
	await ElMessageBox.confirm(`确定删除${row.name}吗？`, '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning'
	});
	await categoryDeleteAPI(row.id as number);
	ElMessage.success('删除成功');
	$emits('delete', row);
};

/**
 * 启用/禁用按钮
 * @param {CategoryEntity} row 当前行数据
 */
const handleCategoryStatus = async (row: CategoryEntity) => {
	await ElMessageBox.confirm(
		`确定${row.status === 1 ? '禁用' : '启用'}${row.name}吗？`,
		'提示',
		{
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		}
	);
	await categoryUpdateStatusAPI(!row.status ? 1 : 0, row.id);
	ElMessage.success(`${row.status === 1 ? '禁用' : '启用'}成功`);
	$emits('toggleStatus', row);
};
</script>

<template>
	<el-table v-if="tableData.length" :data="tableData" class="table-box" stripe>
		<el-table-column align="center" label="分类名称" prop="name" />
		<el-table-column align="center" label="分类类型" prop="type">
			<template #default="scope">
				<span>{{ scope.row.type === 1 ? '菜品分类' : '套餐分类' }}</span>
			</template>
		</el-table-column>
		<el-table-column align="center" label="排序" prop="sort" />
		<el-table-column align="center" label="状态" prop="type">
			<template #default="scope">
				<span>
					{{ scope.row.status === 0 ? '禁用' : '启用' }}
				</span>
			</template>
		</el-table-column>
		<el-table-column label="操作时间" prop="updateTime" />
		<el-table-column align="center" label="操作" width="200">
			<template #default="scope">
				<el-button size="small" type="success" @click="editBtn(scope.row)">
					修改
				</el-button>
				<el-button size="small" type="danger" @click="delBtn(scope.row)">
					删除
				</el-button>
				<el-button
					size="small"
					type="info"
					@click="handleCategoryStatus(scope.row)"
				>
					{{ scope.row.status === 0 ? '启用' : '禁用' }}
				</el-button>
			</template>
		</el-table-column>
	</el-table>
</template>

<style lang="scss" scoped></style>
