import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { EncForm } from '../../components'
import { useForm } from '../use-form'

describe('useForm', () => {
  it('should be exists extra properties', () => {
    const { formRef, setFormRef } = useForm({}, [])
    expect(formRef).toBeDefined()
    expect(setFormRef).toBeDefined()
  })

  it('should be set formRef', () => {
    const { formData, formItems, formRef, setFormRef } = useForm({}, [])
    expect(formRef.value).toBeUndefined()

    mount(() => <EncForm data={formData.value} items={formItems.value} ref={setFormRef as any} />)
    expect(formRef.value).toBeDefined()

    setFormRef(undefined)
    expect(formRef.value).toBeUndefined()
  })
})
