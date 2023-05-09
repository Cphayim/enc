<script setup lang="ts">
import { provide, ref } from 'vue'
import { Form as VanForm } from 'vant'
import 'vant/es/form/style/index'

import type { FormItemUnion } from '@cphayim-enc/base'
import { delayWrapper } from '@cphayim-enc/shared'

import { EncFormItem } from '../form-item'
import { FormInternalConfig, FORM_INTERNAL_CONFIG_KEY } from './provide'

defineOptions({ name: 'EncForm', inheritAttrs: false })

type Props = {
  /**
   * 表单数据
   */
  data: Record<string, any>
  /**
   * 表单项
   */
  items: FormItemUnion[]
  /**
   * 左侧标题宽度
   * @default '6.2em'
   */
  labelWidth?: number | string
  /**
   * 标签的位置
   * @default 'right'
   */
  labelPosition?: 'left' | 'right' | 'top'
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<{
  (e: 'update:data', values: any): void
}>()

// 提供给 form-item 组件使用
provide<FormInternalConfig>(FORM_INTERNAL_CONFIG_KEY, {
  labelWidth: props.labelWidth,
  labelPosition: props.labelPosition,
})

const formRef = ref<any>()

const handleValueChange = (fieldName: string, value: any) => {
  emit('update:data', {
    ...props.data,
    [fieldName]: value,
  })
}

const validate = async () => {
  if (!formRef.value) return
  return formRef.value.validate()
}

const clearValidate = async (names?: string | string[]) => {
  if (!formRef.value) return
  return delayWrapper(() => formRef.value!.resetValidation(names), 0)
}

const getValues = () => props.data

defineExpose({
  validate,
  clearValidate,
  getValues,
})
</script>

<template>
  <div class="enc-form[vant]">
    <van-form ref="formRef" input-align="right" error-message-align="right" scroll-to-error>
      <template v-for="item in items" :key="item.name">
        <EncFormItem
          v-if="!item.hidden"
          :modelValue="data[item.name]"
          @update:modelValue="(value: any) => handleValueChange(item.name, value)"
          :item="item"
        >
          <!-- 将 FieldItem 的插槽作用域再传出去 -->
          <template #default="itemSlotScope">
            <slot :name="item.name" v-bind="itemSlotScope" />
          </template>
        </EncFormItem>
      </template>
    </van-form>
  </div>
</template>

<style>
.enc-form\[vant\] {
  @apply enc-relative enc-select-none;
}
</style>
