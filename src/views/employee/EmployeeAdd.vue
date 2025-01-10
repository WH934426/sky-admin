<script lang="ts" setup>
import type { EmployeeDTO } from '@/apis/types/employee';
import { empAddAPI, empGetById, empUpdateAPI } from '@/apis/employee';
import { FormRules, ElMessage } from 'element-plus';

// 表单数据
const formRef = ref();
const formData = ref<EmployeeDTO>({
	name: '',
	username: '',
	phone: '',
	sex: '1',
	idNumber: ''
});
const formRules = ref<FormRules<EmployeeDTO>>({
	name: [
		{ required: true, message: '员工姓名不能为空', trigger: 'blur' },
		{
			min: 1,
			max: 12,
			message: '员工姓名长度应在1到12个字符之间',
			trigger: 'blur'
		},
		{
			pattern: /^[\u4e00-\u9fa5a-zA-Z]+$/,
			message: '员工姓名只能包含汉字或字母',
			trigger: 'blur'
		}
	],
	username: [
		{
			required: true,
			message: '账号输入不符，请输入3-20个字符',
			trigger: 'blur'
		},
		{
			min: 3,
			max: 20,
			message: '账号输入不符，请输入3-20个字符',
			trigger: 'blur'
		},
		{
			pattern: /^[a-zA-Z0-9]+$/,
			message: '账号只能包含字母和数字',
			trigger: 'blur'
		}
	],
	phone: [
		{ required: true, message: '请输入正确的手机号', trigger: 'blur' },
		{ pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
	],
	sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
	idNumber: [
		{
			pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
			message: '身份证号码不正确',
			trigger: 'blur'
		}
	]
});

// 按钮类别
const btnType = ref<'add' | 'edit'>('add');

// 表单提交
const submitForm = (isContinue: boolean) => {
	formRef.value.validate(async (valid: boolean) => {
		if (valid) {
			// 新增 或 编辑
			if (btnType.value === 'add') {
				await empAddAPI(formData.value);
				ElMessage.success('员工添加成功');
				// 判断是否继续添加
				if (isContinue) {
					formRef.value.resetFields();
				} else {
					goBack();
				}
			} else {
				await empUpdateAPI(formData.value);
				ElMessage.success('员工信息修改成功');
				goBack();
			}
		}
	});
};

// 返回按钮
const $router = useRouter();
const goBack = () => {
	$router.push('/employee');
};

const $route = useRoute();
onMounted(() => {
	// 判断是否是编辑模式
	btnType.value = $route.query.id ? 'edit' : 'add';
	getEmpById();
});

// 根据id获取员工信息
const getEmpById = async () => {
	if (btnType.value === 'edit') {
		const res = await empGetById(Number($route.query.id));
		formData.value = res.data;
	}
};
</script>

<template>
	<div class="add-container">
		<div class="container">
			<el-form
				ref="formRef"
				:model="formData"
				:rules="formRules"
				label-width="180px"
			>
				<!-- 表单内容  -->
				<el-form-item label="账号" prop="username">
					<el-input v-model="formData.username" />
				</el-form-item>
				<el-form-item label="员工姓名" prop="name">
					<el-input v-model="formData.name" />
				</el-form-item>
				<el-form-item label="手机号" prop="phone">
					<el-input v-model="formData.phone" />
				</el-form-item>
				<el-form-item label="性别" prop="sex">
					<el-radio v-model="formData.sex" label="1">男</el-radio>
					<el-radio v-model="formData.sex" label="2">女</el-radio>
				</el-form-item>
				<el-form-item label="身份证号" prop="idNumber">
					<el-input v-model="formData.idNumber" />
				</el-form-item>
				<!-- 按钮   -->
				<div class="sub-box">
					<el-button type="primary" @click="submitForm(false)">
						保存
					</el-button>
					<el-button
						v-if="btnType === 'add'"
						type="success"
						@click="submitForm(true)"
					>
						保存并继续添加员工
					</el-button>
					<el-button type="info" @click="goBack">返回</el-button>
				</div>
			</el-form>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.add-container {
	margin: 30px;

	.container {
		position: relative;
		z-index: 1;
		background: #fff;
		padding: 30px;
		border-radius: 4px;

		.sub-box {
			padding-top: 30px;
			text-align: center;
			border-top: solid 1px #f3f4f7;
		}
	}

	.el-form-item {
		margin-bottom: 29px;
	}

	.el-input {
		width: 300px;
	}
}
</style>
