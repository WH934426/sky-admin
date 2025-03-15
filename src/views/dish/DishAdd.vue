<script lang="ts" setup>
import { categoryGetListByTypeAPI } from '@/apis/category';
import type { CategoryEntity } from '@/apis/types/category';
import FlavorSelect from './components/FlavorSelect.vue';
import { dishAddAPI, dishGetByIdAPI, dishUpdateAPI } from '@/apis/dish';
import { ElMessage } from 'element-plus';
import { DishDTO } from '@/apis/types/dish';

// 表单数据
const formRef = ref();
const form = ref<DishDTO>({
	id: 0, // 菜品id
	name: '', // 菜品名称
	categoryId: 0, // 菜品分类id
	price: 0, // 菜品价格
	flavors: [], // 菜品口味
	image: '', // 菜品图片
	description: '', // 菜品描述,
	status: 1 // 菜品状态, 1: 起售 0: 停售
});

// 自定义图片校验规则
const validateImage = (_: any, value: any, callback: any) => {
	// 检查图片是否存在
	if (!value) {
		return callback(new Error('请上传菜品图片'));
	}

	// 判断图片格式
	const isValidFormat = /\.(jpg|jpeg|png)$/.test(value);
	if (!isValidFormat) {
		return callback(new Error('图片格式不正确'));
	}

	// 判断图片大小
	const isValidSize = value.size < 1024 * 1024 * 2;
	if (!isValidSize) {
		return callback(new Error('图片大小不能超过2MB'));
	}

	callback();
};

const formRule = ref({
	name: [
		{ required: true, message: '菜品名称输入不符', trigger: 'blur' },
		{ min: 2, max: 20, message: '菜品名称输入不符', trigger: 'blur' },
		{
			pattern: /^[\u4e00-\u9fa5a-zA-Z0-9]+$/,
			message: '菜品名称输入不符',
			trigger: 'blur'
		}
	],
	categoryId: [
		{ required: true, message: '请选择菜品分类', trigger: 'change' }
	],
	price: [
		{
			required: true,
			message: '请输入菜品价格',
			trigger: 'blur'
		},
		{
			pattern: /^(?!0\d)(\d+(\.\d{1,2})?|\.\d{1,2})$/,
			message: '菜品价格格式有误，请输入大于零且最多保留两位小数的金额',
			trigger: 'blur'
		}
	],
	flavors: [{ max: 4, message: '最多不超过4个口味', trigger: 'change' }],
	image: [
		{ required: true, message: '请上传菜品图片', trigger: 'change' },
		{ validator: validateImage, trigger: 'change' }
	],
	description: [
		{
			max: 200,
			message: '菜品描述输入不符，请输入少于200个字',
			trigger: 'blur'
		}
	]
});

// 菜品分类数据
const dishCateList = ref<CategoryEntity[]>([]);
const getDishCateList = async () => {
	const res = await categoryGetListByTypeAPI(1);
	dishCateList.value = res.data;
};

// 口味配置
interface FlavorGroup {
	key: symbol;
	name: string;
	value: string[];
}

const activeFlavors = ref<FlavorGroup[]>([]);

// 预设口味
const flavorPresets = ref<FlavorGroup[]>([
	{
		key: Symbol('甜味'),
		name: '甜味',
		value: ['无糖', '少糖', '半糖', '多糖', '全糖']
	},
	{
		key: Symbol('忌口'),
		name: '忌口',
		value: ['不要葱', '不要蒜', '不要香菜', '不要辣']
	},
	{
		key: Symbol('辣度'),
		name: '辣度',
		value: ['不辣', '微辣', '中辣', '重辣']
	},
	{
		key: Symbol('温度'),
		name: '温度',
		value: ['热饮', '常温', '去冰', '少冰', '多冰']
	}
]);

// 图片逻辑
const imageUrl = ref('');
const imageChange = (url: string) => {
	form.value.image = url;
};

// 按钮
const btnType = ref<'add' | 'edit'>('add'); // 按钮类别
const router = useRouter();
const goBack = () => {
	router.push('/dish');
};

// 提交表单
const submitForm = (isContinue: boolean) => {
	formRef.value.validate(async (valid: boolean) => {
		let message;
		if (valid) {
			// 菜品图片不能为空
			if (!form.value.image) {
				ElMessage.error('请上传菜品图片');
				return;
			}
			// 新增或编辑
			if (btnType.value === 'add') {
				// 新增
				const params = {
					...form.value
				};
				// 新增菜品时没有id
				delete params.id;

				// 处理口味配置
				params.flavors = form.value.flavors?.map((obj) => ({
					...obj,
					value: JSON.stringify(obj.value)
				}));

				// 调用接口
				await dishAddAPI(params);
				message = '新增菜品成功';
				// 是否继续添加
				if (isContinue) {
					// 继续添加
					formRef.value.resetFields();
				} else {
					// 返回
					goBack();
				}
			} else {
				// 编辑
				await dishUpdateAPI(form.value);
				message = '修改菜品成功';
				goBack();
			}
			ElMessage.success(message);
		}
	});
};

const route = useRoute();

// 根据id获取菜品信息
const getDishById = async () => {
	if (btnType.value === 'edit') {
		const res = await dishGetByIdAPI(Number(route.query.id));
		form.value = res.data;
	}
};

onMounted(async () => {
	// 判断是否是编辑模式
	btnType.value = route.query.id ? 'edit' : 'add';
	await getDishCateList();
	getDishById();
});
</script>

<template>
	<div class="add-container">
		<div class="container">
			<!-- TODO:  是否需要使用的inline属性？ -->
			<el-form
				ref="formRef"
				:model="form"
				:rules="formRule"
				label-width="180px"
				class="demo-ruleForm"
			>
				<!-- 菜品名称，分类，价格部分 -->
				<el-form-item label="菜品名称" prop="name">
					<el-input
						v-model="form.name"
						placeholder="请填写菜品名称"
						maxlength="20"
					/>
				</el-form-item>
				<el-form-item label="菜品分类" prop="categoryId">
					<el-select v-model="form.categoryId" placeholder="请选择菜品分类">
						<el-option
							v-for="item in dishCateList"
							:key="item.id"
							:label="item.name"
							:value="item.id"
						/>
					</el-select>
				</el-form-item>
				<el-form-item label="菜品价格:" prop="price">
					<el-input v-model="form.price" placeholder="请设置菜品价格" />
				</el-form-item>

				<!-- 口味做法配置 -->
				<el-form-item label="口味做法配置:">
					<el-form-item>
						<FlavorSelect v-model="activeFlavors" :presets="flavorPresets" />
					</el-form-item>
				</el-form-item>

				<!-- 菜品图片 -->
				<el-form-item label="菜品图片:" prop="image">
					<Upload :image-url="imageUrl" @image-change="imageChange">
						图片大小不超过2M
						<br />
						仅能上传 PNG JPEG JPG类型图片
						<br />
						建议上传200*200或300*300尺寸的图片
					</Upload>
				</el-form-item>
				<!-- 菜品描述 -->
				<el-form-item label="菜品描述:" prop="description">
					<el-input
						v-model="form.description"
						type="textarea"
						placeholder="请填写菜品描述"
						:rows="3"
						maxlength="200"
					/>
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
					<el-button type="info" @click="goBack()">返回</el-button>
				</div>
			</el-form>
		</div>
	</div>
</template>

<style lang="scss" scoped>
// 处理el-select内联样式异常
.el-form--inline {
	.el-form-item {
		.el-input,
		.el-cascader,
		.el-select,
		.el-autocomplete {
			width: 360px;
		}
	}
}

.add-container {
	margin: 30px;

	.container {
		position: relative;
		z-index: 1;
		background: #fff;
		padding: 30px;
		border: 4px;
		min-height: 500px;

		.sub-box {
			padding-top: 30px;
			text-align: center;
			border-top: solid 1px #f3f4f7;
		}
	}
}
</style>
