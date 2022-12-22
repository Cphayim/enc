<script setup lang="ts">
import { type CSSProperties, computed, ref } from 'vue'

import type { FormItemUnion } from '@cphayim-enc/base'

import { LOCALES } from '../../locales'
import EncFormItem from './FormItem.vue'

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
   * 表单项组件大小
   */
  size?: 'small' | 'default' | 'large'
  /**
   * 列间距 px，默认 8
   */
  rowGutter?: number
  /**
   * 行间隔 px，默认 10
   */
  colGutter?: number
  /**
   * 左侧标题宽度 px，默认 100
   */
  labelWidth?: number
  /**
   * 国际化
   */
  locale?: keyof typeof LOCALES
}

const props = withDefaults(defineProps<Props>(), {
  size: 'default',
  rowGutter: 8,
  colGutter: 10,
  labelWidth: 100,
})

const emit = defineEmits<{
  (e: 'update:data', values: any): void
}>()

const formRef = ref<any>()

const handleValueChange = (fieldName: string, value: any) => {
  emit('update:data', {
    ...props.data,
    [fieldName]: value,
  })
}

const validate = async () => {
  if (!formRef.value) return
  // 保持和 vant 一致
  return new Promise((resolve, reject) => {
    formRef.value!.validate((valid: boolean, fields: any[]) => {
      if (valid) resolve(undefined)
      else reject(fields)
    })
  })
}

const clearValidate = (names?: string | string[]) => {
  if (!formRef.value) return
  // @enhance: 当没有传递 names 时，清除所有验证结果
  if (!names) {
    names = props.items.map((item) => item.name)
  }
  formRef.value!.clearValidate(names)
}
const getValues = () => props.data

const rowGutterStyle = computed<CSSProperties>(() => ({
  marginTop: `${props.rowGutter / 2}px`,
  marginBottom: `${props.rowGutter / 2}px`,
}))

defineExpose({
  validate,
  clearValidate,
  getValues,
})
</script>

<template>
  <el-config-provider :locale="LOCALES[props.locale ?? 'zh-cn']">
    <div class="enc-form">
      <el-form
        ref="formRef"
        :model="props.data"
        :label-width="props.labelWidth"
        @submit.prevent
        :size="props.size"
      >
        <el-row :gutter="props.colGutter * 2">
          <template v-for="item in props.items" :key="item.name">
            <el-col v-if="!item.hidden" :span="item.col || 24" :style="rowGutterStyle">
              <div :style="{ width: `${(item.scale ?? 1) * 100}%` }">
                <EncFormItem
                  :modelValue="data[item.name]"
                  @update:modelValue="(value: any) => handleValueChange(item.name, value)"
                  :item="item"
                >
                  <!--
                将传递给 EncForm 的命名插槽（以字段名 ${name} 命名），传递给 FormItem#default 插槽，
                并传递 FormItem#default 的插槽作用域给外部
              -->
                  <template #default="itemSlotScope">
                    <slot :name="item.name" v-bind="itemSlotScope" />
                  </template>
                </EncFormItem>
              </div>
            </el-col>
          </template>
        </el-row>
      </el-form>
    </div>
  </el-config-provider>
</template>

<style>
.enc-form {
  @apply enc-relative enc-p-[10px];
}
</style>
