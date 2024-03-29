<script setup lang="ts">
import { type CSSProperties, computed, ref } from 'vue'

import { ElConfigProvider, ElForm, ElRow, ElCol } from 'element-plus'
import 'element-plus/es/components/config-provider/style/css'
import 'element-plus/es/components/form/style/css'
import 'element-plus/es/components/row/style/css'
import 'element-plus/es/components/col/style/css'
import en from 'element-plus/es/locale/lang/en'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import type { FormItemUnion } from '@cphayim-enc/base'
import { delayWrapper } from '@cphayim-enc/shared'

import { EncFormItem } from '../form-item'

defineOptions({ name: 'EncForm', inheritAttrs: false })

type Props = {
  /**
   * 表单数据
   */
  data?: Record<string, any>
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
   * 左侧标题宽度
   * @default '100px'
   */
  labelWidth?: number | string
  /**
   * 标签的位置
   * @default 'right'
   */
  labelPosition?: 'left' | 'right' | 'top'
  /**
   * 国际化
   */
  locale?: 'zh-cn' | 'en'
  /**
   * 是否禁用表单项的内边距
   */
  disablePadding?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'default',
  rowGutter: 8,
  colGutter: 10,
  labelWidth: '100px',
  locale: 'zh-cn',
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
    formRef.value!.validate((isValid: boolean, invalidFields: Record<string, any>) => {
      if (isValid) resolve(undefined)
      else reject(invalidFields)
    })
  })
}

const clearValidate = async (names?: string | string[]) => {
  if (!formRef.value) return
  // @enhance: 当没有传递 names 时，清除所有验证结果
  if (!names) {
    names = props.items.map((item) => item.name)
  }
  return delayWrapper(() => {
    formRef.value!.clearValidate(typeof names === 'string' ? [names] : names)
  }, 0)
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

const locale = computed(() => (props.locale === 'en' ? en : zhCn))
</script>

<template>
  <el-config-provider :locale="locale">
    <div class="enc-form[ep]" :class="{ 'enc-disable-padding': props.disablePadding }">
      <el-form
        ref="formRef"
        :model="props.data"
        :label-width="props.labelWidth"
        :label-position="props.labelPosition"
        :size="props.size"
        @submit.prevent
      >
        <el-row :gutter="props.colGutter * 2">
          <template v-for="item in props.items" :key="item.name">
            <el-col v-if="!item.hidden" :span="item.col || 24" :style="rowGutterStyle">
              <div :style="{ width: `${(item.scale ?? 1) * 100}%` }">
                <EncFormItem
                  :modelValue="props.data?.[item.name]"
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
.enc-form\[ep\] {
  @apply enc-relative enc-p-[10px];
  &.enc-disable-padding {
    @apply enc-p-0;
  }
}
</style>
