import { productService } from '@/entities/product'
import { initAddToCartButtons } from '@/features/cart-toggle'
import { initFavoriteButtons } from '@/features/favorite-toggle'
import type { FiltersState } from '@/features/filter-products'
import { initPaginationController, Pagination } from '@/features/pagination'
import { ProductList } from '@/widgets/product-list'

import { html } from '@/shared/lib'

export const loadProductsAndRender = async (state: FiltersState) => {
  const queryString = window.location.search.slice(1)
  const listEl = document.getElementById('catalog-product-list')
  const paginationContainer = document.getElementById('catalog-pagination')

  if (!listEl) return

  try {
    const { products, totalCount } = await productService.getFiltered(queryString)

    listEl.innerHTML = ProductList({ products })

    await initFavoriteButtons()
    await initAddToCartButtons()

    if (paginationContainer) {
      paginationContainer.innerHTML = Pagination({
        currentPage: state.page,
        totalCount,
        pageLimit: 12,
      })
      initPaginationController()
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Неизвестная ошибка'
    listEl.innerHTML = html`<p class="py-16 text-center text-error">Ошибка загрузки: ${msg}</p>`
  }
}
