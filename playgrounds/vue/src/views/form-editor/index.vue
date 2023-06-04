<script setup lang="ts">
import { EncForm, FormItemUnion } from '@cphayim-enc/vue-element-plus'
import {
  EncFormEditor,
  FormEditorOperation,
  // FormEditorPreset,
  type FormEditorConfig,
} from '@cphayim-enc/extension-vue-form-editor'

const formEditorConfig: FormEditorConfig = {
  encFormComponent: EncForm,
  operations: [
    FormEditorOperation.Confirm,
    FormEditorOperation.Preview,
    FormEditorOperation.PrintItems,
  ],
  // randomNameOnly: true,
  syncOptionsLabelAndValue: true,
  // presets: [FormEditorPreset.Input],
  bizFeatures: [
    {
      bizSingleton: true,
      bizClass: 'ItemPriceQuantity',
      bizLabel: '报价组合控件',
      bizDesc: '物品+单价+数量',
      bizTransformer: {
        toReal: (_, random) => {
          return [
            {
              type: 'input',
              label: '物品',
              name: `item_${random}`,
              col: 8,
              biz: {
                bizType: 'real',
                bizClass: 'ItemPriceQuantity',
                bizSymbol: random,
                bizName: 'item',
              },
            },
            {
              type: 'input',
              label: '单价',
              name: `price_${random}`,
              col: 8,
              biz: {
                bizType: 'real',
                bizClass: 'ItemPriceQuantity',
                bizSymbol: random,
                bizName: 'price',
              },
            },
            {
              type: 'input',
              label: '数量',
              name: `quantity_${random}`,
              col: 8,
              biz: {
                bizType: 'real',
                bizClass: 'ItemPriceQuantity',
                bizSymbol: random,
                bizName: 'quantity',
              },
            },
          ]
        },
        toShadow: (_, random) => {
          return {
            type: 'custom',
            name: `biz_${random}`,
            label: '报价组合控件',
            biz: {
              bizType: 'shadow',
              bizClass: 'ItemPriceQuantity',
              bizLabel: '物品+单价+数量',
            },
          }
        },
      },
    },
  ],
}

const initItems: FormItemUnion[] = [
  { name: 'name', label: '姓名', type: 'input', col: 12, rules: [{ required: true }] },
  { name: 'age', label: '年龄', type: 'input', col: 12 },
  {
    name: 'gender',
    label: '性别',
    type: 'select',
    col: 12,
    selectOptions: [
      {
        label: '男',
        value: 1,
      },
      {
        label: '女',
        value: 2,
      },
    ],
  },
  { name: 'occupation', label: '职业', type: 'select', col: 24 },
  { name: 'r', label: '单选框', type: 'radio', radioOptions: ['a', 'b', 'c'] },
]

const handleConfirm = (items: FormItemUnion[]) => {
  console.log(items)
}
</script>

<template>
  <div class="p-[20px] rounded-[10px] m-[50px] shadow-md bg-white">
    <EncFormEditor
      :config="formEditorConfig"
      :initItems="initItems"
      @confirm="handleConfirm"
    ></EncFormEditor>
  </div>
</template>

<style scoped></style>
