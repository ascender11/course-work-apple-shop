import { DEFAULT_PRICE_GTE, DEFAULT_PRICE_LTE } from './constants'
import type { FiltersState } from './types'

export const parseFiltersFromQuery = (qs: string): FiltersState => {
  const p = new URLSearchParams(qs)
  return {
    priceMin: Number(p.get('price.current_gte')) || DEFAULT_PRICE_GTE,
    priceMax: Number(p.get('price.current_lte')) || DEFAULT_PRICE_LTE,
    categories: p.getAll('category'),
    year: p.get('year') ?? '',
    page: Math.max(1, parseInt(p.get('page') ?? '1', 10)),
  }
}

export const buildQueryString = (state: FiltersState): string => {
  const p = new URLSearchParams()

  if (state.priceMin !== DEFAULT_PRICE_GTE || state.priceMax !== DEFAULT_PRICE_LTE) {
    p.set('price.current_gte', String(state.priceMin))
    p.set('price.current_lte', String(state.priceMax))
  }

  for (const cat of state.categories) p.append('category', cat)
  if (state.year) p.set('year', state.year)

  if (state.page > 1) p.set('page', String(state.page))

  return p.toString()
}

export const isFiltersActive = (state: FiltersState): boolean =>
  state.priceMin !== DEFAULT_PRICE_GTE ||
  state.priceMax !== DEFAULT_PRICE_LTE ||
  state.categories.length > 0 ||
  state.year !== ''
