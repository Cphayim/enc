import { log } from '@cphayim-enc/shared'

import type { CheckboxFormItem } from './CheckboxFormItem'

export class CheckboxHelper {
  static verifyCheckboxFormItem(item: CheckboxFormItem) {
    if (item.checkboxType === 'group') {
      if (!item.checkboxGroupOptions || !item.checkboxGroupOptions.length) {
        log.warn(
          `CheckboxFormItem.checkboxType -> 'group', but CheckboxFormItem.checkboxGroupLabels is empty`,
        )
      }
    }
  }
}
