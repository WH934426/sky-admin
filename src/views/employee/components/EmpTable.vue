<script lang="ts" setup>
import { empUpdateStatusAPI } from '@/apis/employee.ts';
import { EmployeeEntity } from '@/apis/types/employee';
import { ElMessageBox, ElMessage } from 'element-plus';

defineProps<{
	tableData: EmployeeEntity[];
}>();

const emit = defineEmits(['accountStatus']);

// 检查是否为超级管理员
const checkAdmin = (row: EmployeeEntity) => {
	// 超级管理员不允许修改
	if (row.username === 'admin') {
		ElMessage.warning('超级管理员不允许修改');
		return true;
	}
	return false;
};

// 修改按钮
const $router = useRouter();
const handleUpdateBtn = (row: EmployeeEntity) => {
	if (checkAdmin(row)) {
		return;
	}
	$router.push({
		path: '/employee/add',
		query: {
			id: row.id
		}
	});
};

// 账号状态
const handleAccountStatus = async (row: EmployeeEntity) => {
	if (checkAdmin(row)) {
		return;
	}
	await ElMessageBox.confirm(
		`确定${row.status === 1 ? '禁用' : '启用'}该账号吗？`,
		'提示',
		{
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		}
	);
	const params = {
		status: row.status ? 0 : 1,
		id: row.id
	};
	await empUpdateStatusAPI(params);
	ElMessage.success('该员工账号状态已被修改');
	emit('accountStatus', row);
};
</script>

<template>
	<el-table :data="tableData">
		<el-table-column label="员工名称" prop="name" />
		<el-table-column label="账号" prop="username" />
		<el-table-column label="手机号" prop="phone" />
		<el-table-column label="账号状态" prop="status">
			<template #default="scope">
				{{ scope.row.status === 1 ? '启用' : '禁用' }}
			</template>
		</el-table-column>
		<el-table-column label="最后操作时间" prop="updateTime" />
		<el-table-column label="操作">
			<template #default="scope">
				<el-button text @click="handleUpdateBtn(scope.row)">修改</el-button>
				<el-button text @click="handleAccountStatus(scope.row)">
					{{ scope.row.status === 1 ? '禁用' : '启用' }}
				</el-button>
			</template>
		</el-table-column>
	</el-table>
</template>

<style lang="scss" scoped></style>
