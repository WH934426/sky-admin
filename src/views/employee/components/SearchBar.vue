<script lang="ts" setup>
import { Search, Plus } from '@element-plus/icons-vue';

const props = defineProps<{
	modelValue: string;
}>();

const emit = defineEmits(['update:modelValue', 'search', 'clear']);

const localName = ref(props.modelValue); // 员工姓名，本地变量

// 监听props.modelValue的变化
watch(
	() => props.modelValue,
	(newValue) => {
		localName.value = newValue;
	}
);

// 监听localName的变化
watch(localName, (newValue) => {
	emit('update:modelValue', newValue);
});

// 处理搜索事件
const handleSearch = () => emit('search');

// 处理清空事件
const handleClear = () => {
	localName.value = '';
	emit('update:modelValue', '');
	emit('clear');
};

// 添加员工按钮
const $router = useRouter();
const handleAddEmpBtn = () => {
	$router.push('/employee/add');
};
</script>

<template>
	<div class="table-bar">
		<label style="margin-right: 5px">员工姓名：</label>
		<el-input
			v-model="localName"
			clearable
			placeholder="请输入员工姓名"
			style="width: 15%"
			@clear="handleClear"
		/>
		<el-button
			:icon="Search"
			style="margin-left: 10px"
			type="primary"
			@click="handleSearch"
		/>
		<el-button
			:icon="Plus"
			style="float: right"
			type="success"
			@click="handleAddEmpBtn"
		>
			添加员工
		</el-button>
	</div>
</template>

<style lang="scss" scoped></style>
