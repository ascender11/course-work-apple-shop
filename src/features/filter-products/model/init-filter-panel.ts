import { getQueryString, navigate } from '@/shared/lib'

import { initAccordions } from '../lib/init-accordions'
import { initRangeSlider } from '../lib/init-range-slider'
import { PRICE_ABS_MAX, PRICE_ABS_MIN } from './constants'
import type { FiltersState } from './types'
import { buildQueryString } from './utils'

const collectState = (prefix: string): FiltersState => {
  const minEl = document.getElementById(`${prefix}-range-min`) as HTMLInputElement | null
  const maxEl = document.getElementById(`${prefix}-range-max`) as HTMLInputElement | null
  const categories = Array.from(
    document.querySelectorAll<HTMLInputElement>(`input[name="${prefix}-category"]:checked`)
  ).map((el) => el.value)
  const yearEl = document.querySelector<HTMLInputElement>(`input[name="${prefix}-year"]:checked`)

  return {
    priceMin: Number(minEl?.value) || PRICE_ABS_MIN,
    priceMax: Number(maxEl?.value) || PRICE_ABS_MAX,
    categories,
    year: yearEl?.value ?? '',
    page: 1,
  }
}

const applyFilters = (prefix: string) => {
  const state = collectState(prefix)
  const baseUrl = window.location.pathname

  const params = new URLSearchParams(getQueryString())

  params.delete('price.current_gte')
  params.delete('price.current_lte')
  params.delete('category')
  params.delete('year')
  params.delete('page')

  const filterQs = buildQueryString(state)
  const filterParams = new URLSearchParams(filterQs)
  filterParams.forEach((value, key) => {
    if (key === 'category') {
      params.append(key, value)
    } else {
      params.set(key, value)
    }
  })

  const qs = params.toString()
  navigate(`${baseUrl}${qs ? `?${qs}` : ''}`)
}

const initFilterPanel = (prefix: string) => {
  initRangeSlider(prefix, () => applyFilters(prefix))

  document.querySelectorAll<HTMLInputElement>(`input[name="${prefix}-category"]`).forEach((cb) => {
    cb.addEventListener('change', () => applyFilters(prefix))
  })

  document.querySelectorAll<HTMLInputElement>(`input[name="${prefix}-year"]`).forEach((rb) => {
    rb.addEventListener('change', () => applyFilters(prefix))
  })
}

export const initFiltersPanel = () => {
  initAccordions()
  initFilterPanel('desktop')
  initFilterPanel('modal')
}
