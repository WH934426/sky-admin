<script setup lang="ts">
import { Get_Token } from '@/utils/auth';
import { Plus } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

// 定义props
interface Props {
	type?: string;
	size?: number;
	imageUrl: string;
}
const props = withDefaults(defineProps<Props>(), {
	type: '.jpg,.jpeg,.png',
	size: 1024 * 1024 * 2,
	imageUrl: ''
});

const emits = defineEmits(['imageChange']);

// 监听props变化
const localImageUrl = ref('');
watch(
	() => props.imageUrl,
	(newVal) => {
		localImageUrl.value = newVal;
	}
);

// 为上传添加token
const headers = {
	token: Get_Token()
};

// 上传成功
const handleAvatarSuccess = (response: any) => {
	// console.log(response); { code, data: url , msg }
	localImageUrl.value = `${response.data}`;
	ElMessage.success('图片上传成功');
	emits('imageChange', localImageUrl.value);
};

// 上传前
const beforeAvatarUpload = (file: File) => {
	if (file.size > props.size) {
		ElMessage.error(`上传文件大小不能超过${props.size}M!`);
		return false;
	}
	return true;
};

// 上传失败
const handleAvatarError = () => {
	ElMessage.error('图片上传失败');
};

// 删除图片
const delOldImage = () => {
	localImageUrl.value = '';
	emits('imageChange', localImageUrl.value);
};
</script>

<template>
	<div class="upload-item">
		<el-upload
			class="avatar-uploader"
			action="/api/common/upload"
			:auto-upload="false"
			:accept="type"
			:headers="headers"
			:show-file-list="false"
			:on-success="handleAvatarSuccess"
			:before-upload="beforeAvatarUpload"
			:on-error="handleAvatarError"
		>
			<img v-if="localImageUrl" :src="localImageUrl" class="avatar" />
			<el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
			<span v-if="imageUrl" class="el-upload-list__item-actions">
				<span class="el-upload-span" @click.stop="delOldImage"> 删除图片 </span>
				<span class="el-upload-span"> 重新上传 </span>
			</span>
		</el-upload>
		<p class="upload-tips">
			<slot />
		</p>
	</div>
</template>

<style lang="scss" scoped>
.avatar-uploader .el-icon-plus:after {
	position: absolute;
	display: inline-block;
	content: ' ' !important;
	left: calc(50% - 20px);
	top: calc(50% - 40px);
	width: 40px;
	height: 40px;
	background: url('@/assets/icons/icon_upload@2x.png') center center no-repeat;
	background-size: 20px;
}

.el-upload-list__item-actions:hover .upload-icon {
	display: inline-block;
}
.el-icon-zoom-in:before {
	content: '\E626';
}
.el-icon-delete:before {
	content: '\E612';
}
.el-upload-list__item-actions:hover {
	opacity: 1;
}
.upload-item {
	display: flex;
	align-items: center;
	.el-form-item__content {
		width: 500px !important;
	}
}
.upload-tips {
	font-size: 12px;
	color: #666666;
	display: inline-block;
	line-height: 17px;
	margin-left: 36px;
}
.el-upload-list__item-actions {
	position: absolute;
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;
	cursor: default;
	text-align: center;
	color: #fff;
	opacity: 0;
	font-size: 20px;
	background-color: rgba(0, 0, 0, 0.5);
	transition: opacity 0.3s;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}
.avatar-uploader .el-upload {
	border: 1px dashed #d9d9d9;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
}
.avatar-uploader {
	display: inline-block;
}

.avatar-uploader .el-upload:hover {
	border-color: #ffc200;
}
.el-upload-span {
	width: 100px;
	height: 30px;
	border: 1px solid #ffffff;
	border-radius: 4px;
	font-size: 14px;
	text-align: center;
	line-height: 30px;
}

.el-upload-span:first-child {
	margin-bottom: 20px;
}

.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 200px;
	height: 160px;
	line-height: 160px;
	text-align: center;
}

.avatar {
	width: 200px;
	height: 160px;
	display: block;
}
</style>
