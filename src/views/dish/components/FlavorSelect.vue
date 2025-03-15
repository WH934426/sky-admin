<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue';

interface FlavorGroup {
	key: symbol;
	name: string;
	value: string[];
}

interface Props {
	modelValue: FlavorGroup[];
	presets: FlavorGroup[];
}

const props = defineProps<Props>();
const emit = defineEmits([
	'update:modelValue',
	'validation',
	'tag-remove',
	'flavor-remove'
]);

// 计算可用预设
const availablePresets = computed(() =>
	props.presets.filter(
		(preset) => !props.modelValue.some((f) => f.name === preset.name)
	)
);

// 是否可以添加更多
const canAddMore = computed(
	() => props.modelValue.length < props.presets.length
);

// 添加新口味组
function addFlavorGroup() {
	const newFlavors = [...props.modelValue];
	newFlavors.push({
		key: Symbol('new-flavor'),
		name: '',
		value: []
	});
	emitUpdate(newFlavors);
}

// 处理口味类型变化
function handleFlavorChange(index: number, newName: string) {
	const selectedPreset = props.presets.find((p) => p.name === newName);
	if (!selectedPreset) return;

	const updatedFlavors = [...props.modelValue];
	updatedFlavors[index] = {
		...selectedPreset,
		key: Symbol(newName)
	};
	emitUpdate(updatedFlavors);
}

// 触发标签删除
function emitTagRemove(groupIndex: number, tagIndex: number) {
	emit('tag-remove', groupIndex, tagIndex);

	const updatedFlavors = [...props.modelValue];
	updatedFlavors[groupIndex].value.splice(tagIndex, 1);
	emitUpdate(updatedFlavors);
}

// 触发口味组删除
function emitFlavorRemove(index: number) {
	emit('flavor-remove', index);

	const updatedFlavors = [...props.modelValue];
	updatedFlavors.splice(index, 1);
	emitUpdate(updatedFlavors);
}

// 统一触发更新
function emitUpdate(value: FlavorGroup[]) {
	emit('update:modelValue', value);
	validateFlavors(value);
}

// 验证逻辑
function validateFlavors(value: FlavorGroup[]) {
	const isValid = value.every((f) => f.name && f.value.length > 0);
	emit('validation', isValid);
}
</script>

<template>
	<div class="flavor-configurator">
		<div v-if="!modelValue.length" class="flavor-empty">
			<el-button type="primary" @click="addFlavorGroup" :icon="Plus">
				添加口味配置
			</el-button>
		</div>

		<template v-else>
			<div
				v-for="(flavor, index) in modelValue"
				:key="flavor.key.toString()"
				class="flavor-group"
			>
				<div class="flavor-selector">
					<el-select
						v-model="flavor.name"
						placeholder="选择口味类型"
						filterable
						@change="handleFlavorChange(index, $event)"
					>
						<el-option
							v-for="preset in availablePresets"
							:key="preset.name"
							:label="preset.name"
							:value="preset.name"
						/>
					</el-select>
				</div>

				<div class="flavor-tags">
					<el-tag
						v-for="(tag, tagIndex) in flavor.value"
						:key="tagIndex"
						closable
						@close="emitTagRemove(index, tagIndex)"
					>
						{{ tag }}
					</el-tag>
				</div>

				<div class="flavor-actions">
					<el-button type="danger" @click="emitFlavorRemove(index)">
						删除
					</el-button>
				</div>
			</div>

			<el-button v-if="canAddMore" type="primary" @click="addFlavorGroup">
				+ 添加更多口味
			</el-button>
		</template>
	</div>
</template>

<style lang="scss" scoped>
.flavor-configurator {
	width: 777px;
	background: #f8f9fa;
	padding: 12px;
	border-radius: 4px;

	/* 口味组容器 */
	.flavor-group {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 6px;
		border-radius: 4px;

		/* 下拉选择框 */
		.flavor-selector {
			width: 200px;
			height: 40px;

			:deep(.el-input__wrapper) {
				height: 40px;
				background: #f8f9fa;
				border-radius: 4px;
				box-shadow: none;

				.el-input__inner {
					color: #333;
					&::placeholder {
						color: #999;
					}
				}
			}
		}

		/* 标签容器 */
		.flavor-tags {
			flex: 1;
			min-height: 38px;
			display: flex;
			align-items: center;
			gap: 8px;
			padding: 6px;
			border: 1px solid #dcdfe6;
			border-radius: 4px;
			background: white;

			.el-tag {
				height: 28px;
				line-height: 28px;
				background: #f5f7fa;
				border: 1px solid #e4e7ed;
				color: #606266;
				border-radius: 14px;
				padding: 0 12px;

				/* 关闭按钮 */
				:deep(.el-tag__close) {
					color: #909399;
					margin-left: 6px;
					&:hover {
						background: #909399;
						color: white;
					}
				}
			}
		}

		/* 删除按钮 */
		.flavor-actions {
			.el-button {
				height: 40px;
				padding: 0 16px;
				border-color: #ff4444;
			}
		}
	}

	/* 添加更多按钮 */
	.el-button[type='primary'] {
		display: inline-block;
		padding: 0px 20px;
		line-height: 40px;
		cursor: pointer;
		border-radius: 4px;
		color: #333333;
		font-weight: 500;
	}
}
</style>
