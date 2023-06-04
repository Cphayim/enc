import { ENC_VERSION, FormItemUnion } from '@cphayim-enc/base'
import { describe, expect, it } from 'vitest'

import { markItemsCreatedByEditor } from '..'

describe('utils', () => {
  it('should be add a mark to items', () => {
    const items: FormItemUnion[] = [
      { name: 'a', label: 'A', type: 'custom' },
      { name: 'b', label: 'B', type: 'custom' },
    ]
    const markedItems = markItemsCreatedByEditor(items)
    markedItems.forEach((item) => {
      expect(item).toMatchObject({ __CREATED_BY_ENC_FORM_EDITOR__: `v${ENC_VERSION}` })
    })
  })
})
