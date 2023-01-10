<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { useVModel } from '@vueuse/core'
import { Cascader as VanCascader } from 'vant'
import 'vant/es/cascader/style/index'

import {
  BaseFormItem,
  CascaderFormItem,
  CascaderFormItemOption,
  CascaderHelper,
} from '@cphayim-enc/base'

import { EncInputFormItem } from '../input'
import { EncPopupFormItem } from '../popup'

defineOptions({ name: 'EncCascaderFormItem' })

const props = defineProps<{
  modelValue: any
  item: CascaderFormItem
}>()

const DEFAULT_OPTIONS: Omit<CascaderFormItem, Exclude<keyof BaseFormItem, 'placeholder'>> = {
  placeholder: '请选择',
  cascaderMultiple: false,
  cascaderFilterable: false,
  cascaderOptions: [],
  cascaderCheckStrictly: false, // 暂不支持
  cascaderEmitPath: false,
}
const item = computed(() => ({ ...DEFAULT_OPTIONS, ...props.item }))

// const isMultiple = computed(() => item.value.cascaderMultiple)
const cascaderOptions = computed(() => item.value.cascaderOptions ?? [])

// type CascaderOptionLabel = CascaderFormItemOption['label']
type CascaderOptionValue = CascaderFormItemOption['value']
// type CascaderOptionsMap = Map<CascaderOptionValue, CascaderFormItemOption>

/**
 * value 根据 cascaderEmitPath 不同，可能为单个值（叶子 value）或者数组（链路 value）
 */
const _value = useVModel(props, 'modelValue')
// 叶子节点 value，传递给 van-cascader
const _lastValue = ref<CascaderOptionValue>()
watchEffect(() => {
  _lastValue.value = Array.isArray(_value.value)
    ? _value.value[_value.value.length - 1]
    : _value.value
})

const _selectedOptions = computed<CascaderFormItemOption[]>(() =>
  CascaderHelper.getOptionsPathByValue(cascaderOptions.value, _lastValue.value),
)
const _selectedLabels = computed(() => _selectedOptions.value.map((option) => option.label))
const _selectedValues = computed(() => _selectedOptions.value.map((option) => option.value))

const showPopup = ref(false)
const columnFieldNames = ref({
  text: 'label',
  value: 'value',
  children: 'children',
})

const handleFinish = () => {
  if (item.value.cascaderEmitPath) {
    // 完整链路 value: [1,2,3]
    _value.value = _selectedValues.value
  } else {
    // 叶子节点 value: 3
    _value.value = _lastValue.value
  }
}
</script>

<template>
  <EncInputFormItem
    :modelValue="_selectedLabels.join(' / ')"
    :item="(item as any)"
    @click="() => (showPopup = true)"
    _readonly
    _is-link
  >
  </EncInputFormItem>

  <EncPopupFormItem v-model:show="showPopup" :item="item">
    <template #default="{ showToolbar }">
      <van-cascader
        v-model="_lastValue"
        :title="item.label"
        :options="(cascaderOptions as any)"
        @close="() => (showPopup = false)"
        @finish="handleFinish"
        :show-header="showToolbar"
        :field-names="columnFieldNames"
      />
    </template>
  </EncPopupFormItem>
</template>

<style scoped></style>
