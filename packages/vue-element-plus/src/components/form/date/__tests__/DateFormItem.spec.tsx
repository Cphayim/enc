import { afterEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, ref, watch } from 'vue'
import dayjs from 'dayjs'
import { ElDatePicker } from 'element-plus'

import type { DateFormItem } from '@cphayim-enc/base'
import { EncDateFormItem } from '..'

afterEach(() => {
  document.documentElement.innerHTML = ''
})

describe('DateFormItem.vue', () => {
  describe('date', () => {
    const DEFAULT_ITEM: DateFormItem = {
      type: 'date',
      label: 'Birthday',
      name: 'birthday',
    }

    it('should be show placeholder', async () => {
      const item = ref<DateFormItem>({ ...DEFAULT_ITEM })

      const wrapper = mount(() => <EncDateFormItem item={item.value} />)

      expect(wrapper.find('input').exists()).toBe(true)
      expect(wrapper.find('input').attributes('placeholder')).toBe('请选择')

      item.value.placeholder = 'Please select birthday'
      await nextTick()
      expect(wrapper.find('input').attributes('placeholder')).toBe('Please select birthday')
    })

    it('should be able to sync value with date', async () => {
      const modelValue = ref('2021-01-01')
      const item = ref<DateFormItem>({ ...DEFAULT_ITEM })
      const wrapper = mount(() => <EncDateFormItem v-model={modelValue.value} item={item.value} />)

      const input = wrapper.find('input')
      const vm = wrapper.findComponent(ElDatePicker).vm as any
      expect(vm.modelValue).toBe('2021-01-01')

      modelValue.value = '2021-01-02'
      await nextTick()
      expect(vm.modelValue).toBe('2021-01-02')

      const handleChange = vi.fn(() => void 0)
      watch(modelValue, handleChange)

      await input.trigger('focus')
      // el-date-picker 弹层使用了 teleport，无法在 wrapper 中找到
      ;(document.querySelector('td.available') as HTMLElement).click()
      await nextTick()
      expect(handleChange).toBeCalledTimes(1)
      expect(modelValue.value).toBe(vm.modelValue)
    })

    it('should be between minDate and maxDate', async () => {
      const modelValue = ref()
      const item = ref<DateFormItem>({ ...DEFAULT_ITEM })
      const wrapper = mount(() => <EncDateFormItem v-model={modelValue.value} item={item.value} />)

      // 默认值是当前日期的十年前至十年后
      const encDateFormItemRef = wrapper.findComponent(EncDateFormItem)
      expect(encDateFormItemRef.vm.item.dateMinDate).toBeDefined()
      expect(
        dayjs().subtract(10, 'year').isSame(encDateFormItemRef.vm.item.dateMinDate, 'date'),
      ).toBe(true)
      expect(encDateFormItemRef.vm.item.dateMaxDate).toBeDefined()
      expect(dayjs().add(10, 'year').isSame(encDateFormItemRef.vm.item.dateMaxDate, 'date')).toBe(
        true,
      )

      // 设置 minDate 和 maxDate 为指定 Date
      item.value.dateMinDate = dayjs('2023-01-01').toDate()
      item.value.dateMaxDate = dayjs('2023-01-05').toDate()
      await nextTick()
      expect(encDateFormItemRef.vm.item.dateMinDate).toBeDefined()
      expect(dayjs('2023-01-01').isSame(encDateFormItemRef.vm.item.dateMinDate, 'date')).toBe(true)
      expect(encDateFormItemRef.vm.item.dateMaxDate).toBeDefined()
      expect(dayjs('2023-01-05').isSame(encDateFormItemRef.vm.item.dateMaxDate, 'date')).toBe(true)

      // 也可以设置为字符串
      item.value.dateMinDate = '2023-02-05'
      item.value.dateMaxDate = '2023-02-10'
      await nextTick()
      expect(encDateFormItemRef.vm.item.dateMinDate).toBeDefined()
      expect(dayjs('2023-02-05').isSame(encDateFormItemRef.vm.item.dateMinDate, 'date')).toBe(true)
      expect(encDateFormItemRef.vm.item.dateMaxDate).toBeDefined()
      expect(dayjs('2023-02-10').isSame(encDateFormItemRef.vm.item.dateMaxDate, 'date')).toBe(true)

      const vm = wrapper.findComponent(ElDatePicker).vm as any
      modelValue.value = '2023-02-10'
      await nextTick()
      expect(vm.modelValue).toBe('2023-02-10')

      const handleChange = vi.fn(() => void 0)
      watch(modelValue, handleChange)

      await wrapper.find('input').trigger('focus')
      // 第一个可选日期应该是 2023-02-05
      ;(document.querySelector('td.available') as HTMLElement).click()
      await nextTick()
      expect(handleChange).toBeCalledTimes(1)
      expect(modelValue.value).toBe('2023-02-05')

      // 点击一个禁用的日期，不会改变 modelValue
      ;(document.querySelector('td.disabled') as HTMLElement).click()
      await nextTick()
      expect(handleChange).toBeCalledTimes(1)
      expect(modelValue.value).toBe('2023-02-05')
    })

    it('should be able to set date format', async () => {
      const modelValue = ref('2021::01::07')
      const item = ref<DateFormItem>({
        ...DEFAULT_ITEM,
        dateFormat: 'YYYY::MM::DD',
        dateMinDate: '2021::01::05',
        dateMaxDate: '2021::01::10',
      })

      const wrapper = mount(() => <EncDateFormItem v-model={modelValue.value} item={item.value} />)

      const handleChange = vi.fn(() => void 0)
      watch(modelValue, handleChange)

      await wrapper.find('input').trigger('focus')
      ;(document.querySelector('td.available') as HTMLElement).click()
      await nextTick()
      expect(handleChange).toBeCalledTimes(1)
      expect(modelValue.value).toBe('2021::01::05')
    })
  })

  describe('date range', () => {
    const DEFAULT_ITEM: DateFormItem = {
      type: 'date',
      label: '有效期',
      name: 'period',
      dateType: 'daterange',
    }

    it('should be show placeholder', async () => {
      const item = ref<DateFormItem>({
        ...DEFAULT_ITEM,
        dateRangeSeparator: '⭐️',
        dateRangeStartPlaceholder: '开始日期',
        dateRangeEndPlaceholder: '结束日期',
      })

      const wrapper = mount(() => <EncDateFormItem item={item.value} />)

      expect(wrapper.html()).contain('⭐️')
      expect(wrapper.html()).contain('开始日期')
      expect(wrapper.html()).contain('结束日期')
    })

    it('should be able to sync value with date range', async () => {
      const modelValue = ref()
      const item = ref<DateFormItem>({
        ...DEFAULT_ITEM,
        dateMinDate: '2021-01-01',
        dateMaxDate: '2021-01-10',
      })

      const wrapper = mount(() => <EncDateFormItem v-model={modelValue.value} item={item.value} />)
      const vm = wrapper.findComponent(ElDatePicker).vm as any

      modelValue.value = ['2021-01-05', '2021-01-07']
      await nextTick()
      expect(vm.modelValue).toEqual(['2021-01-05', '2021-01-07'])

      const handleChange = vi.fn(() => void 0)
      watch(modelValue, handleChange)

      await wrapper.find('input').trigger('focus')
      const availableElements: HTMLElement[] = Array.from(document.querySelectorAll('td.available'))

      availableElements[0].click()
      await nextTick()
      expect(handleChange).not.toBeCalled()

      availableElements[2].click()
      await nextTick()
      expect(handleChange).toBeCalledTimes(1)
      expect(modelValue.value).toEqual(['2021-01-01', '2021-01-03'])
    })
  })
})
