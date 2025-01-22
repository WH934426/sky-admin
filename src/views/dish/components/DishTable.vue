<script setup lang="ts">
import type { DishVO } from '@/apis/types/dish';
import { dishUpdateStatusAPI } from '@/apis/dish';
import { ElMessage, ElMessageBox } from 'element-plus';

defineProps<{
	tableData: DishVO[];
	isSearch: boolean;
	checkList: number[];
}>();

const emit = defineEmits(['delete', 'toggleStatus', 'update:checkList']);

const router = useRouter();

// 复选框选中状态改变时触发
const handleSelectionChange = (selection: DishVO[]) => {
	emit(
		'update:checkList',
		selection.map((item) => item.id)
	);
};

/**
 * 修改按钮
 * @param row 当前行数据
 */
const editBtn = (row: DishVO) => {
	router.push({ path: '/dish/add', query: { id: row.id } });
};
/**
 * 删除按钮
 * @param row
 */
const delBtn = async (row: DishVO) => {
	emit('delete', row);
};

/**
 * 启用/禁用按钮
 * @param {CategoryEntity} row 当前行数据
 */
const handleDishStatus = async (row: DishVO) => {
	await ElMessageBox.confirm(
		`确定${row.status === 1 ? '停售' : '起售'}${row.name}吗？`,
		'提示',
		{
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		}
	);
	await dishUpdateStatusAPI(!row.status ? 1 : 0, row.id);
	ElMessage.success(`${row.status === 1 ? '停售' : '起售'}成功`);
	emit('toggleStatus', row);
};
</script>

<template>
	<el-table
		:data="tableData"
		class="table-box"
		stripe
		@selection-change="handleSelectionChange"
	>
		<el-table-column type="selection" width="30" />
		<el-table-column align="center" label="菜品名称" prop="name" />
		<el-table-column prop="image" label="图片">
			<template #default="scope">
				<el-image
					style="width: 80px; height: 40px; border: none; cursor: pointer"
					:src="scope.row.image"
				>
					<div class="image-slot">
						<img
							src="@/assets/images/noImg.png"
							style="width: auto; height: 40px; border: none"
						/>
					</div>
				</el-image>
			</template>
		</el-table-column>
		<el-table-column prop="categoryName" label="菜品分类" />
		<el-table-column label="售价">
			<template #default="scope">
				<span style="margin-right: 10px">
					￥{{ scope.row.price.toFixed(2) }}
				</span>
			</template>
		</el-table-column>
		<el-table-column label="售卖状态">
			<template #default="scope">
				<div
					class="tableColumn-status"
					:class="{ 'stop-use': String(scope.row.status) === '0' }"
				>
					{{ String(scope.row.status) === '0' ? '停售' : '启售' }}
				</div>
			</template>
		</el-table-column>
		<el-table-column prop="updateTime" label="最后操作时间" />
		<el-table-column align="center" label="操作" width="200">
			<template #default="scope">
				<el-button size="small" type="success" @click="editBtn(scope.row)">
					修改
				</el-button>
				<el-button size="small" type="danger" @click="delBtn(scope.row.id)">
					删除
				</el-button>
				<el-button
					size="small"
					type="info"
					@click="handleDishStatus(scope.row)"
				>
					{{ scope.row.status === 1 ? '停售' : '启售' }}
				</el-button>
			</template>
		</el-table-column>
	</el-table>
</template>

<style lang="scss" scoped></style>
