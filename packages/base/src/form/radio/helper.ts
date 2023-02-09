import { log } from '@cphayim-enc/shared'

import type { RadioFormItem } from './RadioFormItem'

export class RadioHelper {
  static verifyRadioFormItem(item: RadioFormItem) {
    if (!item.radioOptions || !item.radioOptions.length) {
      log.warn(`RadioFormItem.radioOptions is empty`)
    }
  }
}
