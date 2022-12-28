<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { computed } from 'vue'

import type { BaseFormItem, CheckboxFormItem, CheckboxOptions } from '@cphayim-enc/base'
// import { isNone } from '@cphayim-enc/shared'
// import { useEventLock } from '@cphayim-enc/vue'

import EncInputFormItem from './InputFormItem.vue'

defineOptions({ name: 'EncCheckboxFormItem' })

const props = defineProps<{
  modelValue: any
  item: CheckboxFormItem
}>()

const DEFAULT_OPTIONS: Omit<CheckboxFormItem, Exclude<keyof BaseFormItem, 'placeholder'>> = {
  placeholder: '请选择',
  checkboxType: 'single',
  checkboxSingleLabel: '',
  checkboxGroupOptions: [],
  checkboxGroupMax: 0,
}
const item = computed(() => ({ ...DEFAULT_OPTIONS, ...props.item }))

const _value = useVModel(props, 'modelValue')
</script>

<template>
  <EncInputFormItem :modelValue="_value?.toString()" :item="(item as any)" _readonly>
    <template #input>
      <!-- 多选框组 -->
      <template v-if="item.checkboxType === 'group'">
        <van-checkbox-group
          v-model="_value"
          :disabled="item.disabled || item.readonly"
          direction="horizontal"
        >
          <van-checkbox
            v-for="(labelOrOption, _) in item.checkboxGroupOptions"
            :key="_"
            :name="
              (labelOrOption as CheckboxOptions).value ??
              (labelOrOption as CheckboxOptions).label ??
              labelOrOption
            "
            :disabled="(labelOrOption as CheckboxOptions).disabled"
            shape="square"
            class="enc-checkbox"
          >
            {{ (labelOrOption as CheckboxOptions).label ?? labelOrOption }}
          </van-checkbox>
        </van-checkbox-group>
      </template>

      <!-- 多选框 -->
      <template v-else>
        <van-checkbox
          v-model="_value"
          :disabled="item.disabled || item.readonly"
          shape="square"
          class="enc-checkbox"
        >
          {{ item.checkboxSingleLabel }}
        </van-checkbox>
      </template>
    </template>
  </EncInputFormItem>
</template>

<style>
.enc-checkbox {
  --van-checkbox-size: 16px;
}
</style>
