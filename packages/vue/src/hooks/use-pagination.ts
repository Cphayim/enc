import { ref, watch } from 'vue'
import { useUrlSearchParams } from '@vueuse/core'

export type Pagination = {
  pageNum: number
  pageSize: number
  total: number
}

type ToSearchParams<T> = {
  [P in keyof T]: string
}

export type PaginationSearchParams = ToSearchParams<Omit<Pagination, 'total'>>

export type UsePaginationOptions = {
  /**
   * 初始化页码
   * @default 1
   */
  initPageNum?: number
  /**
   * 初始化每页条数
   * @default 10
   */
  initPageSize?: number
  /**
   * 是否开启 searchParams
   *
   * 开启后，会将分页参数同步到 url 的 searchParams 中
   * @default false
   */
  searchParams?: boolean
  /**
   * searchParams 使用的路由模式
   * @default 'history'
   */
  searchMode?: 'history' | 'hash'
}

const DEFAULT_PAGE_NUM = 1
const DEFAULT_PAGE_SIZE = 10
const DEFAULT_SEARCH_MODE = 'history'

export function usePagination(options?: UsePaginationOptions) {
  const {
    initPageNum = DEFAULT_PAGE_NUM,
    initPageSize = DEFAULT_PAGE_SIZE,
    searchParams = false,
    searchMode = DEFAULT_SEARCH_MODE,
  } = options || {}

  const getInitPagination = (init = false) => ({
    pageNum: init ? initPageNum : DEFAULT_PAGE_NUM,
    pageSize: init ? initPageSize : DEFAULT_PAGE_SIZE,
    total: 0,
  })

  const pagination = ref<Pagination>(getInitPagination(true))

  /**
   * 重置 pagination
   * @param init 是否使用初始化值来重置
   */
  const resetPagination = (init?: boolean) => {
    pagination.value = getInitPagination(init)
  }

  /**
   * 重置 pagination，保留 pageSize
   * @param init 是否使用初始化值来重置
   */
  const resetPaginationKeepPageSize = (init?: boolean) => {
    pagination.value = {
      ...getInitPagination(init),
      pageSize: pagination.value.pageSize,
    }
  }

  const search = useUrlSearchParams<PaginationSearchParams>(searchMode)
  // 使用 search 下值初始化
  if (searchParams) {
    pagination.value.pageNum = search.pageNum ? parseInt(search.pageNum) : initPageNum
    pagination.value.pageSize = search.pageSize ? parseInt(search.pageSize) : initPageSize
  }
  // 当 pagination 更新时反向更新 search
  watch(
    pagination,
    (value) => {
      if (searchParams) {
        search.pageNum = value.pageNum.toString()
        search.pageSize = value.pageSize.toString()
      }
    },
    { deep: true },
  )

  return {
    pagination,
    resetPagination,
    resetPaginationKeepPageSize,
    _search: search,
  }
}
