<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { computed } from 'vue'

import type { BaseFormItem, RadioFormItem, RadioOptions } from '@cphayim-enc/base'

defineOptions({ name: 'EncRadioFormItem' })

const props = defineProps<{
  modelValue: any
  item: RadioFormItem
}>()

const DEFAULT_OPTIONS: Omit<RadioFormItem, Exclude<keyof BaseFormItem, 'placeholder'>> = {
  placeholder: '请输入',
  radioOptions: [],
}

const item = computed(() => ({ ...DEFAULT_OPTIONS, ...props.item }))

const _value = useVModel(props, 'modelValue')
</script>

<template>
  <el-radio-group v-model="_value" :readonly="item.readonly" :disabled="item.disabled">
    <template v-for="(labelOrOption, _) in item.radioOptions" :key="_">
      <el-radio
        :label="
            (labelOrOption as RadioOptions).value ??
            (labelOrOption as RadioOptions).label ??
            labelOrOption
          "
        :disabled="(labelOrOption as RadioOptions).disabled"
      >
        {{ (labelOrOption as RadioOptions).label ?? labelOrOption }}
      </el-radio>
    </template>
  </el-radio-group>
</template>

<style></style>
