import { FilterPanel, initFiltersPanel, parseFiltersFromQuery } from '@/features/filter-products'
import { initSearch, SearchInput } from '@/features/search'
import { initSortController, parseSortFromQuery, SortSelect } from '@/features/sort-products'
import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'

import { t } from '@/shared/i18n'
import { getQueryString, html } from '@/shared/lib'
import { Spinner } from '@/shared/ui/components'

import { initModalController } from '../model/modal-controller'
import { loadProductsAndRender } from '../model/products-controller'
import { initResetController } from '../model/reset-controller'
import { Advantages } from './Advantages'

export const CatalogPage = () => {
  const queryString = getQueryString()
  const state = parseFiltersFromQuery(queryString)
  const currentSort = parseSortFromQuery(queryString)
  const searchQuery = new URLSearchParams(queryString).get('q') ?? ''

  return {
    html: html`
      ${Header()}

      <div class="flex flex-col sm:flex-row md:hidden items-center justify-between gap-3 px-4 py-3">
        <div class="flex items-center gap-3">
          <button
            id="mobile-filter-btn"
            class="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-text-secondary transition-colors hover:bg-background-tertiary hover:border-border-hover"
          >
            <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none">
              <path d="M3 6h18M7 12h10M11 18h2" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
            ${t('catalog.filter')}
          </button>
          <button id="reset-filters-btn" class="text-sm text-primary transition-colors hover:opacity-70">
            ${t('catalog.resetFilter')}
          </button>
        </div>
        ${SortSelect(currentSort)}
      </div>

      <div id="filter-modal" class="fixed inset-0 z-50 hidden flex-col bg-background">
        <div class="flex items-center justify-between border-b border-border px-4 py-3">
          <h2 class="text-base font-semibold text-text-primary">${t('catalog.filters')}</h2>
          <button
            id="filter-modal-close"
            class="flex h-8 w-8 items-center justify-center rounded-full text-lg leading-none text-text-quinary transition-colors hover:bg-background-secondary"
          >
            ✕
          </button>
        </div>
        <div class="flex-1 overflow-y-auto px-4 py-2">
          ${FilterPanel(state, 'modal')}
        </div>
      </div>

      <div class="hidden md:flex items-center justify-between px-6 py-4 lg:px-30">
        <h1 class="text-2xl font-bold text-text-primary">${t('catalog.title')}</h1>
        <div class="flex items-center gap-4">
          ${SearchInput(searchQuery)}
          ${SortSelect(currentSort)}
        </div>
      </div>

      <div id="catalog-root" class="flex min-h-[calc(100vh-56px)]">
        <aside class="hidden md:block shrink-0 bg-background-secondary pl-6 pr-6 py-6 rounded-r-xl lg:pl-30 max-w-105">
          ${FilterPanel(state, 'desktop')}
          ${Advantages()}
        </aside>

        <div class="flex-1 px-4 py-6 sm:px-6 lg:pr-30">
          <div id="catalog-product-list">
            <div class="py-16 flex justify-center items-center text-text-tertiary">${Spinner()}</div>
          </div>
        </div>
      </div>
      <div id="catalog-pagination"></div>

      ${Footer()}
    `,
    init: () => {
      initFiltersPanel()
      initSortController()
      initModalController()
      initResetController()
      initSearch((qs) => loadProductsAndRender(parseFiltersFromQuery(qs)))
      loadProductsAndRender(state)
    },
  }
}
