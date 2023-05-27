import { describe, expect, it } from 'vitest'
import type { FormItemUnion } from '../../form'
import { createFormAnalyzer, FormAnalyzer } from '../FormAnalyzer'

describe('FormAnalyzer', () => {
  it('should be defined', () => {
    expect(FormAnalyzer).toBeDefined()
    expect(createFormAnalyzer).toBeDefined()
    expect(createFormAnalyzer([])).toBeInstanceOf(FormAnalyzer)
  })

  const items: FormItemUnion[] = [
    { name: 'name1', label: 'Label1', type: 'input' },
    { name: 'name2', label: 'Label2', type: 'select' },
    { name: 'name3', label: 'Label2', type: 'input', inputType: 'textarea' },
  ]

  it('should be able to getItem', () => {
    const formAnalyzer = createFormAnalyzer(items)

    expect(formAnalyzer.getItems()).toBe(items)
    expect(formAnalyzer.getItem('name1')).toBe(items[0])
    expect(formAnalyzer.getItem('name2')).toBe(items[1])
    expect(formAnalyzer.getItem('name3')).toBe(items[2])
  })

  it('should be able to matching items', () => {
    const formAnalyzer = createFormAnalyzer(items)

    expect(formAnalyzer.findItems()).toEqual(items)
    expect(formAnalyzer.findItems({})).toEqual(items)
    expect(formAnalyzer.findItems({ type: 'input' })).toEqual([items[0], items[2]])
    expect(formAnalyzer.findItems({ type: 'select' })).toEqual([items[1]])
    expect(formAnalyzer.findItems({ type: 'input', inputType: 'textarea' })).toEqual([items[2]])
    expect(formAnalyzer.findItems({ inputType: 'textarea' })).toEqual([items[2]])
    expect(formAnalyzer.findItems({ selectMultiple: true })).toEqual([])
  })
})
