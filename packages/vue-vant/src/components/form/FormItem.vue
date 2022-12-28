<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { computed } from 'vue'

import type { FormItemUnion } from '@cphayim-enc/base'

import EncInputFormItem from './items/InputFormItem.vue'
import EncSelectFormItem from './items/SelectFormItem.vue'
import EncCascaderFormItem from './items/CascaderFormItem.vue'
import EncDateFormItem from './items/DateFormItem.vue'
import EncTimeFormItem from './items/TimeFormItem.vue'
// import EncUploadFormItem from './items/UploadFormItem.vue'
import EncSwitchFormItem from './items/SwitchFormItem.vue'
import EncCheckboxFormItem from './items/CheckboxFormItem.vue'
import EncRadioFormItem from './items/RadioFormItem.vue'

defineOptions({ name: 'EncFormItem', inheritAttrs: false })

const props = defineProps<{
  modelValue: any
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
  upload: EncInputFormItem,
  switch: EncSwitchFormItem,
  radio: EncRadioFormItem,
  checkbox: EncCheckboxFormItem,
  custom: null,
  // 'biz-placeholder': null,
}

const comp = computed(() => CompMap[props.item.type])

const _value = useVModel(props, 'modelValue', emit)
</script>

<template>
  <van-cell-group class="enc-form-item[vant]">
    <!-- 当传递该插槽时，替换默认的控件 -->
    <slot v-bind="{ item: props.item, value: props.modelValue }">
      <component :is="comp" v-model="_value" :item="props.item" />
    </slot>
  </van-cell-group>
</template>

<style>
.enc-form-item\[vant\] {
}
</style>
