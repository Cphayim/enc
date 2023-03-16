<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useVModel } from '@vueuse/core'

import type { FormItemRule, BaseFormItem } from '@cphayim-enc/base'
import type { FormEditorConfig } from '@cphayim-enc/extension-form-editor'

import { useEditorItems } from '../../../hooks'
import { EncEditorFieldset } from '../../editor-fieldset'
import { COMMON_ENC_FORM_PROPS } from '../common'
import { REQUIRED_RULE_ITEMS, PATTERN_RULE_ITEMS } from './items'
import { isNone } from '@cphayim-enc/shared'

defineOptions({ name: 'EncBaseFormItemEditor' })

const props = defineProps<{
  config: FormEditorConfig
  modelValue: BaseFormItem
}>()

const modelValue = useVModel(props, 'modelValue')

const {
  EncForm,
  formRef: requiredRuleFormRef,
  formItems: requiredRuleFormItems,
} = useEditorItems(REQUIRED_RULE_ITEMS, props.config)

const { formRef: patternRuleFormRef, formItems: patternRuleFormItems } = useEditorItems(
  PATTERN_RULE_ITEMS,
  props.config,
)

const DEFAULT_REQUIRED_RULE = { required: false, message: '必填项' }

const requiredRule = ref<FormItemRule>({ ...DEFAULT_REQUIRED_RULE })
const patternRule = ref<FormItemRule>({})

onMounted(() => {
  const { rules } = modelValue.value
  if (!rules) return

  requiredRule.value = { ...DEFAULT_REQUIRED_RULE, ...rules.find((rule) => !isNone(rule.required)) }

  const patternRuleIndex = rules.findIndex((rule) => !isNone(rule.pattern))
  if (patternRuleIndex !== -1) {
    patternRule.value = rules[patternRuleIndex]
  }
})

watch(
  [requiredRule, patternRule],
  ([requiredRule, patternRule]) => {
    const rules = [requiredRule]
    if (patternRule.pattern) rules.push(patternRule)
    modelValue.value.rules = rules
  },
  { deep: true },
)
</script>

<template>
  <EncEditorFieldset title="验证配置">
    <EncForm
      v-bind="COMMON_ENC_FORM_PROPS"
      v-model:data="requiredRule"
      :items="requiredRuleFormItems"
      ref="requiredRuleFormRef"
    />
    <EncForm
      v-bind="COMMON_ENC_FORM_PROPS"
      v-model:data="patternRule"
      :items="patternRuleFormItems"
      ref="patternRuleFormRef"
    />
  </EncEditorFieldset>
</template>

<style></style>
