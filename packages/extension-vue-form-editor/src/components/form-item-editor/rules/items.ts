import type { FormItemUnion } from '@cphayim-enc/base'

export const REQUIRED_RULE_ITEMS: FormItemUnion[] = [
  { name: 'required', label: '必填', type: 'checkbox', col: 6 },
  { name: 'message', label: '必填提示', type: 'input', placeholder: '例："必填项"', col: 18 },
]

export const PATTERN_RULE_ITEMS: FormItemUnion[] = [
  {
    name: 'pattern',
    label: '校验正则',
    type: 'input',
    placeholder: '正则表达式，例：^\\d+$',
  },
  { name: 'message', label: '校验提示', type: 'input', placeholder: '例："必须满足 XXX 规则"' },
]
