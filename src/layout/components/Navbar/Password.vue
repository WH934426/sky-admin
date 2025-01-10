<script lang="ts" setup>
import { empUpdatePasswordAPI } from '@/apis/employee';
import { useUserStore } from '@/stores';
import { ElMessage } from 'element-plus';

const props = defineProps<{
	dialogFormVisible: boolean;
}>();

const $emits = defineEmits(['closed']);
const handlePwdClosed = () => {
	$emits('closed');
	// 清空表单
	formRef.value.resetFields();
};

// 创建本地状态处理可见性
const dialogFormVisible = ref(props.dialogFormVisible);
// 监听父组件传来的dialogFormVisible，同步到本地状态
watch(
	() => props.dialogFormVisible,
	(value) => {
		dialogFormVisible.value = value;
	}
);

// 表单数据
const formRef = ref();
const formData = ref({
	oldPassword: '',
	newPassword: '',
	confirmPassword: ''
});

const validatePwd = (_: any, value: any, callback: any) => {
	const regex = /^[A-Za-z0-9]{6,20}$/;
	if (!value) {
		callback(new Error('请输入密码'));
	} else if (!regex.test(value)) {
		callback(new Error('6 - 20位密码，数字或字母，区分大小写'));
	} else {
		callback();
	}
};

const validateConfirmPwd = (_: any, value: any, callback: any) => {
	if (!value) {
		callback(new Error('请再次输入密码'));
	} else if (value !== formData.value.newPassword) {
		callback(new Error('两次输入密码不一致'));
	} else {
		callback();
	}
};

const formRules = ref({
	oldPassword: [{ required: true, validator: validatePwd, trigger: 'blur' }],
	newPassword: [{ required: true, validator: validatePwd, trigger: 'blur' }],
	confirmPassword: [
		{ required: true, validator: validateConfirmPwd, trigger: 'blur' }
	]
});

// 保存密码按钮
const userStore = useUserStore();
const $router = useRouter();
const handleSave = () => {
	formRef.value.validate(async (valid: boolean) => {
		if (valid) {
			const data = {
				empId: userStore.userinfo.id, // 适配接口的员工id
				oldPassword: formData.value.oldPassword,
				newPassword: formData.value.newPassword
			};
			await empUpdatePasswordAPI(data);
			$emits('closed');
			// 清空表单
			formRef.value.resetFields();
			// 清空本地状态
			formData.value = {
				oldPassword: '',
				newPassword: '',
				confirmPassword: ''
			};
			// 退出登录
			ElMessage.success('修改密码成功，请重新登录');
			await $router.push('/login');
		}
	});
};
</script>

<template>
	<el-dialog
		title="修改密码"
		v-model="dialogFormVisible"
		width="568px"
		class="pwdCon"
		@close="handlePwdClosed"
	>
		<el-form
			ref="formRef"
			:model="formData"
			:rules="formRules"
			label-width="85px"
		>
			<el-form-item label="旧密码" prop="oldPassword">
				<el-input
					v-model="formData.oldPassword"
					type="password"
					placeholder="请输入旧密码"
				/>
			</el-form-item>
			<el-form-item label="新密码" prop="newPassword">
				<el-input
					v-model="formData.newPassword"
					type="password"
					placeholder="请输入新密码，6 - 20位密码，数字或字母，区分大小写"
				/>
			</el-form-item>
			<el-form-item label="确认密码" prop="confirmPassword">
				<el-input
					v-model="formData.confirmPassword"
					type="password"
					label="确认密码："
					placeholder="请再次输入新密码"
				/>
			</el-form-item>
			<el-form-item>
				<el-button @click="handlePwdClosed">取消</el-button>
				<el-button type="primary" @click="handleSave">保存</el-button>
			</el-form-item>
		</el-form>
	</el-dialog>
</template>

<style scoped lang="scss">
.pwdCon {
	background: #fff;

	.el-dialog__body {
		padding: 60px 100px 0;
	}

	.el-input__inner {
		padding: 0 12px;
	}

	.el-form-item {
		margin-bottom: 26px;
	}

	.el-form-item__label {
		text-align: left;
	}

	.el-dialog__footer {
		padding-top: 14px;
	}
}
</style>
