<!-- 右侧详情面板 -->
<script setup lang="ts">
import { computed } from 'vue'
import { useVModel } from '@vueuse/core'

import { BizFormHelper } from '@cphayim-enc/base'
import { formEditorTips, type FormEditorConfig } from '@cphayim-enc/extension-form-editor'

import { EncFormEditorTip } from '../../form-editor-tip'
import {
  EncBaseFormItemEditor,
  EncRulesFormItemEditor,
  typeFormItemEditorComponentMap,
} from '../../form-item-editor'
import type { FormEditorSelectedItem } from '..'

defineOptions({ name: 'EncRightPanel' })

const props = defineProps<{
  config: FormEditorConfig
  selectedItem?: FormEditorSelectedItem
}>()

const selectedItem = useVModel(props, 'selectedItem')

const isBizItem = computed(() => {
  if (!selectedItem.value) return false
  return BizFormHelper.isBizFormItem(selectedItem.value?.item)
})
</script>

<template>
  <div class="enc-edit-panel-right-panel">
    <EncFormEditorTip :content="formEditorTips.right" />
    <template v-if="selectedItem && selectedItem.type === 'select'">
      <!-- 不能编辑业务组合型控件配置 -->
      <div v-if="isBizItem" class="enc-text-[14px] enc-text-gray-500">
        <span>无法编辑业务组合型控件的配置</span>
      </div>

      <div v-else :key="selectedItem.index">
        <!-- base -->
        <EncBaseFormItemEditor v-model="selectedItem.item" :config="props.config" />
        <!-- rule -->
        <EncRulesFormItemEditor v-model="selectedItem.item" :config="props.config" />
        <!-- type self -->
        <component
          :is="typeFormItemEditorComponentMap[selectedItem.item.type]"
          v-model="selectedItem.item"
          :config="props.config"
        />
      </div>
    </template>
  </div>
</template>

<style>
.enc-edit-panel-right-panel {
  @apply enc-w-[400px] enc-p-[20px] enc-border-0 enc-border-l enc-border-solid enc-border-gray-300;
}
</style>
