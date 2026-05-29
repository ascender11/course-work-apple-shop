import { getQueryString, navigate } from '@/shared/lib'

import { buildSortQueryString } from './utils'

export const initSortController = () => {
  const baseUrl = window.location.pathname

  document.querySelectorAll<HTMLSelectElement>('.sort-select').forEach((select) => {
    select.addEventListener('change', () => {
      const params = new URLSearchParams(getQueryString())

      params.delete('_sort')
      params.delete('_order')

      const sortValue = select.value
      if (sortValue) {
        const sortQs = buildSortQueryString(sortValue)
        const sortParams = new URLSearchParams(sortQs)
        sortParams.forEach((value, key) => {
          params.set(key, value)
        })
      }

      params.delete('page')
      const qs = params.toString()
      navigate(`${baseUrl}${qs ? `?${qs}` : ''}`)
    })
  })
}
