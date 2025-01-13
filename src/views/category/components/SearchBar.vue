<script setup lang="ts">
import { Search } from '@element-plus/icons-vue';

const props = defineProps<{
	modelValue: string;
	categoryType: number | undefined;
}>();

const emit = defineEmits([
	'update:modelValue',
	'update:categoryType',
	'search',
	'clear',
	'add'
]);

const localName = ref(props.modelValue); // 分类姓名，本地变量
const localType = ref(props.categoryType); // 分类类型，本地变量

// 监听props变量
watch(
	() => [props.modelValue, props.categoryType],
	([newName, newType]) => {
		localName.value = newName as string;
		localType.value = newType as number;
	}
);

// 监听本地变量，同步更新props
watch(
	() => [localName.value, localType.value],
	([newName, newType]) => {
		emit('update:modelValue', newName);
		emit('update:categoryType', newType);
	}
);

// 处理搜索事件
const handleSearch = () => emit('search');

// 分类类型,1,2
const categoryTypes = ref([
	{ value: 1, label: '菜品分类' },
	{ value: 2, label: '套餐分类' }
]);

/**
 * 新增分类
 * @param type 分类类型，'dish' | 'setmeal'
 */
const addClassBtn = (type: 'dish' | 'setmeal') => {
	if (type === 'dish') {
		localType.value = 1;
	} else {
		localType.value = 2;
	}
	emit('add', type);
};
</script>

<template>
	<div class="table-bar">
		<label style="margin-right: 5px">分类名称：</label>
		<el-input
			v-model="localName"
			placeholder="请输入分类名称"
			style="width: 15%"
		/>
		<label style="margin-right: 5px; margin-left: 20px">分类类型：</label>
		<el-select
			v-model="localType"
			placeholder="请选择分类类型"
			style="width: 15%"
		>
			<el-option
				v-for="item in categoryTypes"
				:key="item.value"
				:label="item.label"
				:value="item.value"
			/>
		</el-select>
		<el-button
			:icon="Search"
			class="normal-btn continue"
			style="margin-left: 20px"
			type="primary"
			@click="handleSearch"
		/>
		<div style="float: right">
			<el-button class="continue" type="primary" @click="addClassBtn('dish')"
				>新增菜品分类</el-button
			>
			<el-button
				style="margin-left: 20px"
				type="primary"
				@click="addClassBtn('setmeal')"
			>
				新增套餐分类
			</el-button>
		</div>
	</div>
</template>

<style scoped lang="scss"></style>
