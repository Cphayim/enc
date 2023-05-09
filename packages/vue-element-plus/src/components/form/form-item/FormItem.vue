<script setup lang="ts">
import { computed } from 'vue'
import { useVModel } from '@vueuse/core'

import { ElFormItem } from 'element-plus'
import 'element-plus/es/components/form-item/style/css'

import type { FormItemUnion } from '@cphayim-enc/base'

import { EncInputFormItem } from '../input'
import { EncSelectFormItem } from '../select'
import { EncDateFormItem } from '../date'
import { EncCascaderFormItem } from '../cascader'
import { EncTimeFormItem } from '../time'
import { EncUploadFormItem } from '../upload'
import { EncSwitchFormItem } from '../switch'
import { EncCheckboxFormItem } from '../checkbox'
import { EncRadioFormItem } from '../radio'

defineOptions({ name: 'EncFormItem', inheritAttrs: false })

const props = defineProps<{
  modelValue?: any
  item: FormItemUnion // 取联合类型，之后收敛为单个类型
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
}>()

const CompMap: Record<FormItemUnion['type'], any> = {
  input: EncInputFormItem,
  select: EncSelectFormItem,
  cascader: EncCascaderFormItem,
  date: EncDateFormItem,
  time: EncTimeFormItem,
  upload: EncUploadFormItem,
  switch: EncSwitchFormItem,
  radio: EncRadioFormItem,
  checkbox: EncCheckboxFormItem,
  rate: null,
  custom: null,
}

const comp = computed(() => CompMap[props.item.type])

const _value = useVModel(props, 'modelValue', emit)
</script>

<template>
  <div class="enc-form-item[ep]">
    <el-form-item :label="props.item.label" :prop="props.item.name" :rules="props.item.rules">
      <!-- 当传递该插槽时，替换默认的控件 -->
      <slot v-bind="{ item: props.item, value: props.modelValue }">
        <component :is="comp" v-model="_value" :item="props.item" />
      </slot>
    </el-form-item>
  </div>
</template>

<style>
:root {
  --el-select-font-size: 14px;
}
.enc-form-item\[ep\] {
  @apply enc-relative;
  .el-form-item {
    /* @apply enc-pr-8; */
  }
  .el-select,
  .el-select-v2,
  .el-cascader {
    @apply enc-w-full;
  }
  .el-date-editor.el-input {
    @apply enc-w-full;
    .el-input__wrapper {
      @apply enc-w-full enc-box-border;
    }
  }
}
</style>
