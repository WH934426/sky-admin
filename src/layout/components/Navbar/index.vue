<script lang="ts" setup>
import { useAppStore, useUserStore } from '@/stores';

const appStore = useAppStore();
// 侧边栏状态
const isCollapse = computed(() => appStore.isSidebarOpened);
// 切换侧边栏状态
const toggleSideBar = () => {
	appStore.toggleSidebar(false);
};
// 营业状态码 后台约定 1/0
const status = ref(1);

// 显示弹窗
const shopShow = ref(false);
const toggleShow = () => {
	shopShow.value = true;
};
const mouseLeaves = () => {
	shopShow.value = false;
};

// 退出登录
const $router = useRouter();
const userStore = useUserStore();
const logout = async () => {
	await userStore.logout();
	await $router.push('/login');
};
</script>

<template>
	<div class="navbar">
		<!-- 左 -->
		<div class="status-box">
			<Hamburger
				id="hamburger-container"
				:is-active="isCollapse"
				class="hamburger-container"
				@toggle-click="toggleSideBar"
			/>
			<span v-if="status === 1" class="business-btn opened">营业中</span>
			<span v-else class="business-btn closing">打烊中</span>
		</div>
		<!-- 右 -->
		<div class="right-menu">
			<div class="right-status">
				<!-- TODO:音频 -->
				<span class="nav-icon operatingState"> <i></i> 营业状态设置</span>
			</div>
			<div class="avatar-wrapper">
				<div
					:class="shopShow ? 'userInfo' : ''"
					@mouseenter="toggleShow"
					@mouseleave="mouseLeaves"
				>
					<el-button :class="shopShow ? 'active' : ''" type="primary">
						管理员
						<i class="el-icon-arrow-down"></i>
					</el-button>
					<!-- 弹窗 -->
					<div v-if="shopShow" class="userList">
						<p class="amendPwdIcon">修改密码<i></i></p>
						<p class="logout" @click="logout">退出登录<i></i></p>
					</div>
				</div>
			</div>
		</div>

		<!-- TODO:营业状态弹层 -->
		<!-- TODO: 修改密码弹层  -->
	</div>
</template>

<style lang="scss" scoped>
.navbar {
	height: 60px;
	position: relative;
	background: #ffc100;

	.status-box {
		float: left;
		height: 100%;
		align-items: center;
		display: flex;

		.hamburger-container {
			padding: 0 12px 0 20px;
			cursor: pointer;
			transition: background 0.3s;

			&:hover {
				background: rgba(0, 0, 0, 0.025);
			}
		}

		.business-btn {
			height: 22px;
			line-height: 20px;
			background: #fd3333;
			border: 1px solid #fff;
			border-radius: 4px;
			display: inline-block;
			padding: 0 6px;
			color: #fff;
		}

		.closing {
			background: #6a6a6a;
		}
	}

	.right-menu {
		float: right;
		margin-right: 20px;
		color: #333;
		font-size: 14px;

		&:focus {
			outline: none;
		}

		span {
			padding: 0 10px;
			width: 130px;
			display: inline-block;
			cursor: pointer;

			&:hover {
				background: rgba($color: #ffffff, $alpha: 0.52);
			}
		}

		.amendPwdIcon,
		.logout {
			i {
				width: 18px;
				height: 18px;
				// 不使用background，不造成覆盖
				background-size: contain;
				background-repeat: no-repeat;
				background-position: center center;
				margin-top: 8px;
			}
		}

		.amendPwdIcon i {
			background-image: url('@/assets/icons/btn_gaimi@2x.png');
		}

		.logout {
			cursor: pointer;

			i {
				background-image: url('@/assets/icons/btn_close@2x.png');
			}
		}
	}

	.right-status {
		height: 100%;
		line-height: 60px;
		display: flex;
		align-items: center;
		float: left;

		.nav-icon {
			color: #fff;

			i {
				display: inline-block;
				width: 18px;
				height: 18px;
				vertical-align: sub;
				margin: 0 4px 0 0;
			}
		}

		.operatingState {
			i {
				background: url('@/assets/icons/time.png') no-repeat;
				background-size: contain;
			}
		}
	}

	.avatar-wrapper {
		margin-top: 14px;
		margin-left: 18px;
		position: relative;
		float: right;
		width: 120px;
		text-align: left;

		.el-button--primary {
			color: #333;
			background: #fff;
			border-radius: 4px;
			padding: 0 12px;
			position: relative;
			width: 120px;
			text-align: left;
			border: 0 none;
			height: 32px;
			line-height: 32px;

			&.active {
				.el-icon-arrow-down {
					transform: rotate(-180deg);
				}
			}
		}
	}
}
</style>

<!-- 全局样式 -->
<style lang="scss">
.el-icon-arrow-down {
	background: url('@/assets/icons/up.png') no-repeat 50% 50%;
	background-size: contain;
	width: 8px;
	height: 8px;
	transform: rotate(0deg);
	margin-left: 16px;
	position: absolute;
	right: 16px;
	top: 12px;

	&.before {
		content: '';
	}
}

.userInfo {
	background: #fff;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 99;
	box-shadow: 0 2px 4px 0 rgba($color: #000000, $alpha: 0.14);
	width: 100%;
	height: 105px;
	border-radius: 4px;
	line-height: 32px;
	padding: 0 0 5px;

	.userList {
		width: 95%;
		padding-left: 5px;
	}

	p {
		cursor: pointer;
		height: 32px;
		line-height: 32px;
		padding: 0 5px 0 7px;

		i {
			margin-left: 10px;
			vertical-align: middle;
			float: right;
		}

		&:hover {
			background: #f6f1e1;
		}
	}
}
</style>
