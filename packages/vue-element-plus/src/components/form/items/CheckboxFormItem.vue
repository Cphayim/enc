<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { computed, watchEffect } from 'vue'

import {
  BaseFormItem,
  CheckboxFormItem,
  CheckboxLabelWithOptions,
  verifyCheckboxFormItem,
} from '@cphayim-enc/base'

defineOptions({ name: 'EncCheckboxFormItem' })

const props = defineProps<{
  modelValue: any
  item: CheckboxFormItem
}>()

const DEFAULT_OPTIONS: Omit<CheckboxFormItem, Exclude<keyof BaseFormItem, 'placeholder'>> = {
  placeholder: '请输入',
  checkboxSingleLabel: '',
  checkboxGroupLabels: [],
  checkboxGroupMax: 0,
}

const item = computed(() => ({ ...DEFAULT_OPTIONS, ...props.item }))

watchEffect(() => {
  verifyCheckboxFormItem(item.value)
})

const _value = useVModel(props, 'modelValue')

const max = computed(() =>
  item.value.checkboxGroupMax === 0 ? undefined : item.value.checkboxGroupMax,
)
</script>

<template>
  <!-- 多选框组 -->
  <template v-if="item.checkboxType === 'group'">
    <el-checkbox-group
      v-model="_value"
      :readonly="item.readonly"
      :disabled="item.disabled"
      :max="max"
    >
      <template v-for="(labelOrOption, _) in item.checkboxGroupLabels" :key="_">
        <el-checkbox
          :label="(labelOrOption as CheckboxLabelWithOptions).label ?? labelOrOption"
          :disabled="(labelOrOption as CheckboxLabelWithOptions).disabled"
        />
      </template>
    </el-checkbox-group>
  </template>

  <!-- 多选框 -->
  <template v-else>
    <el-checkbox
      v-model="_value"
      :true-label="item.checkboxSingleTrueValue"
      :false-label="item.checkboxSingleFalseValue"
      :readonly="item.readonly"
      :disabled="item.disabled"
    />
  </template>
</template>

<style></style>
