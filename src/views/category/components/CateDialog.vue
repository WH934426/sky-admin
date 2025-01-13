<script setup lang="ts">
import { categoryAddAPI, categoryUpdateAPI } from '@/apis/category';
import { ElMessage } from 'element-plus';

const props = defineProps<{
	categoryId: number; // 分类id
	dialogVisible: boolean; // 对话框显示
	dialogTitle: string; // 对话框标题
}>();

const $emits = defineEmits(['submit', 'close']);

// 存放新增表单的字段
const formRef = ref();
const formData = ref({
	categoryName: '',
	categoryType: 1, // 分类类型：1为菜品分类，2为套餐分类
	categorySort: 0, // 分类排序
	categoryId: 0 // 分类id ，新增时不需要
});

// 表单规则
const validateCateName = (_: any, value: any, callback: any) => {
	const reg = /^[A-Za-z\u4e00-\u9fa5]+$/;
	if (!value) {
		callback(new Error('分类名称不能为空'));
	} else if (value.length < 2) {
		callback(new Error('分类名称不能少于2个字符'));
	} else if (!reg.test(value)) {
		callback(new Error('分类名称只能包含字母和汉字'));
	} else {
		callback();
	}
};
const validateCateSort = (_: any, value: any, callback: any) => {
	if (value || String(value) === '0') {
		const reg = /^\d+$/;
		if (!reg.test(value)) {
			callback(new Error('排序只能输入数字类型'));
		} else if (Number(value) > 99) {
			callback(new Error('排序只能输入0-99数字'));
		} else {
			callback();
		}
	} else {
		callback(new Error('排序不能为空'));
	}
};
const formRules = ref({
	categoryName: [
		{
			required: true,
			trigger: 'blur',
			validator: validateCateName
		}
	],
	categorySort: [
		{
			required: true,
			trigger: 'blur',
			validator: validateCateSort
		}
	]
});

/**
 * 提交按钮
 * @param {boolean} isContinue 是否继续添加
 */
const submitCategoryForm = (isContinue: boolean) => {
	formRef.value.validate(async (valid: boolean) => {
		if (valid) {
			let message;
			// 新增分类
			if (formData.value.categoryType === 1) {
				// 新增菜品分类
				if (formData.value.categoryId === 0) {
					await categoryAddAPI({
						name: formData.value.categoryName,
						sort: formData.value.categorySort,
						type: formData.value.categoryType
					});
					message = '菜品分类添加成功';
				} else {
					// 修改菜品分类
					await categoryUpdateAPI({
						id: formData.value.categoryId,
						name: formData.value.categoryName,
						sort: formData.value.categorySort,
						type: formData.value.categoryType
					});
					message = '菜品分类修改成功';
				}
			} else {
				// TODO: 新增套餐分类
			}
			ElMessage.success(message);
			$emits('submit', { data: formData.value, isContinue });
		}
	});
};

// 取消按钮
const cancel = () => {
	$emits('close');
};

// 本地变量
const localDialogVisible = ref(props.dialogVisible);
const localDialogTitle = ref(props.dialogTitle);

// 监听props的变化
watch(
	() => [props.categoryId, props.dialogVisible, props.dialogTitle],
	([newId, newVisible, newTitle]) => {
		formData.value.categoryId = newId as number;
		localDialogVisible.value = newVisible as boolean;
		localDialogTitle.value = newTitle as string;
	}
);
</script>

<template>
	<el-dialog v-model="localDialogVisible" :title="localDialogTitle" width="30%">
		<el-form
			ref="formRef"
			:model="formData"
			:rules="formRules"
			label-width="100px"
		>
			<el-form-item label="分类名称" prop="categoryName">
				<el-input
					v-model="formData.categoryName"
					maxlength="20"
					placeholder="请输入分类名称"
				/>
			</el-form-item>
			<el-form-item label="排序" prop="categorySort">
				<el-input v-model="formData.categorySort" placeholder="请输入排序" />
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button type="primary" @click="submitCategoryForm(false)">
				确定
			</el-button>
			<el-button type="primary" @click="submitCategoryForm(true)">
				保存并继续添加
			</el-button>
			<el-button type="info" @click="cancel()">取消</el-button>
		</template>
	</el-dialog>
</template>

<style lang="scss" scoped></style>
