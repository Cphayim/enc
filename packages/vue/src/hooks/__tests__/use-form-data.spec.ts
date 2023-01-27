import { describe, expect, it } from 'vitest'
import { isRef } from 'vue'

import { useFormData } from '../use-form-data'

describe('useFormData', () => {
  it('should return a ref formData', () => {
    const { formData } = useFormData({ name: 'enc', age: 18 })
    expect(isRef(formData)).toBe(true)
    expect(formData.value).toEqual({ name: 'enc', age: 18 })
  })

  it('should reset formData', () => {
    const { formData, resetData } = useFormData({ name: 'enc', age: 18 })
    formData.value.name = 'test'
    formData.value.age = 20
    expect(formData.value).toEqual({ name: 'test', age: 20 })
    resetData()
    expect(formData.value).toEqual({ name: 'enc', age: 18 })
  })
})
