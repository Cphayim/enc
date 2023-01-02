<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { computed, ref } from 'vue'
import { Picker as VanPicker, Checkbox as VanCheckbox, Tag as VanTag } from 'vant'
import 'vant/es/picker/style/index'
import 'vant/es/checkbox/style/index'
import 'vant/es/tag/style/index'

import type { BaseFormItem, SelectFormItem, SelectFormItemOption } from '@cphayim-enc/base'
import { isNone } from '@cphayim-enc/shared'
import { useEventLock } from '@cphayim-enc/vue'

import { EncInputFormItem } from '../input'
import { EncPopupFormItem } from '../popup'

defineOptions({ name: 'EncSelectFormItem' })

const props = defineProps<{
  modelValue: any
  item: SelectFormItem
}>()

const DEFAULT_OPTIONS: Omit<SelectFormItem, Exclude<keyof BaseFormItem, 'placeholder'>> = {
  placeholder: '请选择',
  selectMultiple: false,
  selectFilterable: false,
  selectOptions: [],
}
const item = computed(() => ({ ...DEFAULT_OPTIONS, ...props.item }))

const isMultiple = computed(() => item.value.selectMultiple)
const selectOptions = computed(() => item.value.selectOptions ?? [])

type SelectOptionLabel = SelectFormItemOption['label']
type SelectOptionValue = SelectFormItemOption['value']
type SelectOptionsMap = Map<SelectOptionValue, SelectFormItemOption>

const selectOptionsMap = computed<SelectOptionsMap>(() => {
  const map = new Map()
  selectOptions.value.forEach((option: SelectFormItemOption) => {
    map.set(option.value, option)
  })
  return map
})

/**
 * 单选时为 value，多选时为 value 数组
 *
 * 后续的转换逻辑全部以多选处理
 */
const _value = useVModel(props, 'modelValue')
// 所有选中项的 value 数组
const _selectedValues = computed<SelectOptionValue[]>(() => {
  if (isNone(_value.value)) return []
  return Array.isArray(_value.value) ? _value.value : [_value.value]
})
// 所有选中项的 label 数组
const _selectedLabels = computed<SelectOptionLabel[]>(() =>
  getLabelsByValues(selectOptionsMap.value, _selectedValues.value),
)

function getLabelsByValues(
  map: SelectOptionsMap,
  values: SelectOptionValue[],
): SelectOptionLabel[] {
  return values.map((value) => map.get(value)?.label ?? '未知')
}

const showPopup = ref(false)
const columnFieldNames = ref({
  text: 'label',
  values: 'values',
  children: 'children',
})

const handleConfirm = useEventLock(({ selectedOptions }: any) => {
  if (!isMultiple.value) {
    const selectedOption: SelectFormItemOption = selectedOptions[0]
    _value.value = selectedOption.value
  }
  // 多选在 handleChangeSelected 中处理

  showPopup.value = false
})

const handleChangeSelected = useEventLock((option: SelectFormItemOption) => {
  if (option.disabled) return
  const index = _selectedValues.value.indexOf(option.value)
  const newValue = [..._selectedValues.value]
  if (index === -1) {
    newValue.push(option.value)
  } else {
    newValue.splice(index, 1)
  }
  _value.value = newValue
})
</script>

<template>
  <EncInputFormItem
    :modelValue="_selectedLabels.join(',')"
    :item="(item as any)"
    @click="() => (showPopup = true)"
    _readonly
    _is-link
  >
    <template v-if="_selectedLabels.length" #input>
      <div v-if="isMultiple">
        <van-tag
          v-for="label in _selectedLabels"
          :key="label"
          size="medium"
          color="#777"
          plain
          class="enc-mx-[4px]"
        >
          {{ label }}
        </van-tag>
      </div>
      <div v-else>
        {{ _selectedLabels.join(',') }}
      </div>
    </template>
  </EncInputFormItem>

  <EncPopupFormItem v-model:show="showPopup" :item="item">
    <template #default="{ showToolbar }">
      <van-picker
        :title="`${item.label}（${isMultiple ? '多选' : '单选'}）`"
        :columns="(item.selectOptions as any)"
        @confirm="handleConfirm"
        @cancel="() => (showPopup = false)"
        :show-toolbar="showToolbar"
        :columns-field-names="columnFieldNames"
      >
        <!-- enhance: vant 不支持多选，使用自定义 option 插槽内容支持 -->
        <template v-if="isMultiple" #option="option">
          <div class="enc-w-full enc-flex enc-px-[40px]">
            <div class="enc-flex-1 enc-truncate enc-text-center">{{ option.label }}</div>
            <van-checkbox
              :modelValue="_selectedValues.includes(option.value)"
              :disabled="option.disabled"
              shape="square"
              @click="handleChangeSelected(option)"
              class="enc-flex-shrink-0"
            />
          </div>
        </template>
      </van-picker>
    </template>
  </EncPopupFormItem>
</template>

<style scoped></style>
