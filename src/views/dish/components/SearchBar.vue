<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
	modelValue: string;
	dishStatus: number | undefined;
	categoryId: number | undefined;
	categoryList: any[];
}>();

const emits = defineEmits([
	'update:modelValue',
	'update:dishStatus',
	'update:categoryId',
	'search',
	'clear'
]);

// 创建本地数据副本，以便监听变化
const localName = ref(props.modelValue);
const localDishStatus = ref<number | undefined>(props.dishStatus);
const localCategoryId = ref<number | undefined>(props.categoryId);

// 监听 props 变化，同步到本地变量
watch(
	() => [props.modelValue, props.dishStatus, props.categoryId],
	([newName, newDishStatus, newCategoryId]) => {
		localName.value = newName as string;
		localDishStatus.value = newDishStatus as number | undefined;
		localCategoryId.value = newCategoryId as number | undefined;
	}
);

// 方法定义
const onClear = () => {
	emits('update:modelValue', '');
	emits('update:dishStatus', undefined);
	emits('update:categoryId', undefined);
	emits('clear');
};

const onSearch = () => {
	emits('update:modelValue', localName.value);
	emits('update:dishStatus', localDishStatus.value);
	emits('update:categoryId', localCategoryId.value);
	emits('search');
};
</script>

<template>
	<div class="table-bar">
		<label style="margin-right: 10px">菜品名称：</label>
		<el-input
			v-model="localName"
			placeholder="请填写菜品名称"
			style="width: 14%"
			clearable
			@keyup.enter="onSearch"
		/>

		<label style="margin-right: 10px; margin-left: 20px">菜品分类：</label>
		<el-select
			v-model="localCategoryId"
			style="width: 14%"
			placeholder="请选择"
			clearable
			@clear="onClear"
		>
			<el-option
				v-for="item in props.categoryList"
				:key="item.value"
				:label="item.label"
				:value="item.value"
			/>
		</el-select>

		<label style="margin-right: 10px; margin-left: 20px">售卖状态：</label>
		<el-select
			v-model="localDishStatus"
			style="width: 14%"
			placeholder="请选择"
			clearable
			@clear="onClear"
		>
			<el-option label="停售" :value="0" />
			<el-option label="启售" :value="1" />
		</el-select>
		<el-button class="normal-btn continue" @click="onSearch"> 查询 </el-button>

		<!-- 放置按钮 -->
		<div style="float: right">
			<slot name="buttons" />
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
