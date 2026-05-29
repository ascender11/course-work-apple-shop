import { productApi } from '@/entities/product'
import type { FiltersState } from '@/features/filter-products'
import { initPaginationController, Pagination } from '@/features/pagination'
import { ProductList } from '@/widgets/product-list'

import { html } from '@/shared/lib'

export const loadProductsAndRender = (state: FiltersState) => {
  const queryString = window.location.search.slice(1)
  const listEl = document.getElementById('catalog-product-list')
  const paginationContainer = document.getElementById('catalog-pagination')

  if (!listEl) return

  productApi
    .getFiltered(queryString)
    .then(({ products, totalCount }) => {
      listEl.innerHTML = ProductList({ products })

      if (paginationContainer) {
        paginationContainer.innerHTML = Pagination({
          currentPage: state.page,
          totalCount,
          pageLimit: 12,
        })
        initPaginationController()
      }
    })
    .catch((err: unknown) => {
      const msg = err instanceof Error ? err.message : 'Неизвестная ошибка'
      listEl.innerHTML = html`<p class="py-16 text-center text-error">Ошибка загрузки: ${msg}</p>`
    })
}
