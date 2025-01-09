<script setup lang="ts">
import { useUserStore } from '@/stores';

// 登录表单数据
const formRef = ref();
const loginForm = ref({
	username: '',
	password: ''
});

const loginFormRules = ref({
	username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
	password: [
		{ required: true, message: '请输入密码', trigger: 'blur' },
		{ min: 6, message: '密码必须在6位以上', trigger: 'blur' }
	]
});

// 加载效果
const loading = ref(false);

// 登录方法
const $router = useRouter();
const userStore = useUserStore();
const handleLogin = () => {
	formRef.value.validate(async (valid: boolean) => {
		if (valid) {
			await userStore.login(loginForm.value);
			loading.value = true;
			$router.push('/');
		}
	});
};
</script>

<template>
	<div class="login">
		<div class="login-box">
			<img src="@/assets/images/login-l.png" alt="" />
			<div class="login-form">
				<el-form ref="formRef" :model="loginForm" :rules="loginFormRules">
					<div class="login-form-title">
						<img
							src="@/assets/images/icon_logo.png"
							alt=""
							style="width: 149px; height: 38px"
						/>
					</div>
					<el-form-item prop="username">
						<el-input
							v-model="loginForm.username"
							type="text"
							placeholder="请输入用户名"
							autocomplete="off"
						/>
					</el-form-item>
					<el-form-item prop="password">
						<el-input
							v-model="loginForm.password"
							type="password"
							placeholder="请输入密码"
							show-password
						/>
					</el-form-item>
					<el-form-item style="width: 100%">
						<el-button
							class="login-btn"
							type="primary"
							style="width: 100%"
							size="default"
							:loading="loading"
							@click="handleLogin"
						>
							<span v-if="!loading">登录</span>
							<span v-else>登录中...</span>
						</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.login {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	background-color: #333;

	.login-box {
		width: 1000px;
		height: 474.38px;
		border-radius: 8px;
		display: flex;
		img {
			width: 60%;
			height: auto;
		}
	}

	.login-form {
		background-color: #fff;
		width: 40%;
		border-radius: 0 8px 8px 0;
		display: flex;
		justify-content: center;
		align-items: center;

		.login-form-title {
			height: 36px;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-bottom: 40px;
		}

		.el-form {
			width: 214px;
			height: 307px;
		}
		.el-form-item {
			margin-top: 30px;
		}
		.el-form-item.is-error .el-input__inner {
			border: 0 !important;
			border-bottom: 1px solid #fd7065 !important;
			background: #fff !important;
		}
		.input-icon {
			height: 32px;
			width: 18px;
			margin-left: -2px;
		}
		.el-input__inner {
			border: 0;
			border-bottom: 1px solid #e9e9e8;
			border-radius: 0;
			font-size: 12px;
			font-weight: 400;
			color: #333333;
			height: 32px;
			line-height: 32px;
		}
		.el-input__prefix {
			left: 0;
		}
		.el-input--prefix .el-input__inner {
			padding-left: 26px;
		}
		.el-input__inner::placeholder {
			color: #aeb5c4;
		}
		.el-form-item--medium .el-form-item__content {
			line-height: 32px;
		}
		.el-input--medium .el-input__icon {
			line-height: 32px;
		}

		.login-btn {
			border-radius: 17px;
			padding: 11px 20px !important;
			margin-top: 10px;
			font-weight: 500;
			font-size: 12px;
			border: 0;
			color: #333;
			background-color: #ffc200;
			&:hover,
			&:focus {
				background-color: #ffc200;
				color: #fff;
			}
		}
	}
}
</style>
