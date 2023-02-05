import { describe, expect, it, vi } from 'vitest'
import { isRef, nextTick, reactive } from 'vue'

const useSearchSpy = vi.fn().mockImplementation(() => reactive({ test: 1 }))

vi.mock('@vueuse/core', () => {
  return {
    useUrlSearchParams: useSearchSpy,
  }
})

import { usePagination } from '../use-pagination'

describe('usePagination', () => {
  it('should return a ref pagination', () => {
    const { pagination } = usePagination()
    expect(pagination).toBeDefined()
    expect(isRef(pagination)).toBe(true)
  })

  it('should be able to change or reset value', () => {
    const { pagination, resetPagination } = usePagination({
      initPageNum: 10,
      initPageSize: 20,
    })
    expect(pagination.value).toContain({
      pageNum: 10,
      pageSize: 20,
      total: 0,
    })

    // reset to default value
    resetPagination()
    expect(pagination.value).toContain({
      pageNum: 1,
      pageSize: 10,
      total: 0,
    })

    // reset to init value
    resetPagination(true)
    expect(pagination.value).toContain({
      pageNum: 10,
      pageSize: 20,
      total: 0,
    })
  })

  it('should be able to enable searchParams', async () => {
    useSearchSpy.mockImplementationOnce(() => reactive({ pageNum: 10, pageSize: 20 }))
    const { pagination, _search } = usePagination({ searchParams: true })
    expect(useSearchSpy).toBeCalled()
    expect(pagination.value).toContain({
      pageNum: 10,
      pageSize: 20,
      total: 0,
    })

    // change pagination
    pagination.value.pageNum = 11
    await nextTick()
    expect(_search).toContain({
      pageNum: '11',
    })
  })

  it('should be able to enable searchParams, by default value', async () => {
    useSearchSpy.mockImplementationOnce(() => reactive({}))
    const { pagination, _search } = usePagination({ searchParams: true })
    expect(useSearchSpy).toBeCalled()
    expect(pagination.value).toContain({
      pageNum: 1,
      pageSize: 10,
      total: 0,
    })

    // change pagination
    pagination.value.pageNum = 11
    await nextTick()
    expect(_search).toContain({
      pageNum: '11',
    })
  })
})
