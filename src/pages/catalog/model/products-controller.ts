import { productService } from '@/entities/product'
import { initAddToCartButtons } from '@/features/cart-toggle'
import { initFavoriteButtons } from '@/features/favorite-toggle'
import type { FiltersState } from '@/features/filter-products'
import { initPaginationController, Pagination } from '@/features/pagination'
import { PAGE_SIZE, ProductList } from '@/widgets/product-list'

import { t } from '@/shared/i18n'

import { ErrorState } from '../ui/ErrorState'

export const loadProductsAndRender = async (state: FiltersState) => {
  const queryString = window.location.search.slice(1)
  const listEl = document.getElementById('catalog-product-list')
  const paginationContainer = document.getElementById('catalog-pagination')

  if (!listEl) return

  try {
    const { products, totalCount } = await productService.getFiltered(queryString)

    listEl.innerHTML = ProductList({ products })

    initFavoriteButtons()
    initAddToCartButtons()

    if (paginationContainer) {
      paginationContainer.innerHTML = Pagination({
        currentPage: state.page,
        totalCount,
        pageLimit: PAGE_SIZE,
      })
      initPaginationController()
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : t('catalog.loadError', { error: 'Unknown' })
    listEl.innerHTML = ErrorState(msg)
  }
}
