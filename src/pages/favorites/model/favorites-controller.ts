import { type Product, productService } from '@/entities/product'
import { userStore } from '@/entities/user'
import { initAddToCartButtons } from '@/features/add-to-cart'
import { favoritesApi, favoritesStore, initFavoriteButtons } from '@/features/add-to-favorites'
import { ProductList } from '@/widgets/product-list'

import { html } from '@/shared/lib'
import { Pagination } from '@/shared/ui/components'

import type { FavoritesState } from './favorites-state'

const PAGE_SIZE = 12

const getSortedProducts = (products: Product[], sort: string): Product[] => {
  const arr = [...products]
  if (sort === 'price.current|asc')
    arr.sort((a, b) => {
      const ap = 'price' in a ? a.price.current : 0
      const bp = 'price' in b ? b.price.current : 0
      return ap - bp
    })
  else if (sort === 'price.current|desc')
    arr.sort((a, b) => {
      const ap = 'price' in a ? a.price.current : 0
      const bp = 'price' in b ? b.price.current : 0
      return bp - ap
    })
  else if (sort === 'rating.score|desc') arr.sort((a, b) => b.rating.score - a.rating.score)
  return arr
}

const renderEmptyState = (listEl: HTMLElement, countEl: HTMLElement | null) => {
  listEl.innerHTML = html`
    <div class="flex flex-col items-center gap-4 py-20 text-center">
      <svg viewBox="0 0 24 24" class="w-16 h-16 text-text-quinary" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M7.5 4A5.5 5.5 0 0 0 2 9.5C2 15 8.5 20 12 21.163 15.5 20 22 15 22 9.5a5.5 5.5 0 0 0-10-3.163A5.494 5.494 0 0 0 7.5 4Z" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <p class="text-lg font-medium text-text-secondary">Нет избранных товаров</p>
      <p class="text-sm text-text-quinary">Добавьте товары в избранное, чтобы не потерять их</p>
      <a href="/catalog" data-navigo class="mt-2 text-sm font-medium text-primary hover:text-secondary transition-colors">
        Перейти в каталог →
      </a>
    </div>
  `
  if (countEl) countEl.textContent = '0'
}

const renderProducts = (listEl: HTMLElement, paginationEl: HTMLElement, state: FavoritesState, totalCount: number) => {
  const sorted = getSortedProducts(state.products, state.currentSort)
  const start = (state.currentPage - 1) * PAGE_SIZE
  const page = sorted.slice(start, start + PAGE_SIZE)

  listEl.innerHTML =
    page.length > 0
      ? ProductList({ products: page })
      : html`<p class="py-16 text-center text-text-quinary">Нет товаров на этой странице.</p>`

  paginationEl.innerHTML = Pagination({
    currentPage: state.currentPage,
    totalCount,
    pageLimit: PAGE_SIZE,
  })
}

export const initFavoritesPage = async (
  updateState: (updater: (state: FavoritesState) => FavoritesState) => void,
  getState: () => FavoritesState
) => {
  const listEl = document.getElementById('favorites-product-list')
  const paginationEl = document.getElementById('favorites-pagination')
  const sortEl = document.querySelector<HTMLSelectElement>('.sort-select')
  const countEl = document.getElementById('favorites-count')

  if (!listEl || !paginationEl || !sortEl) return

  const user = userStore.user
  if (!user) return

  favoritesStore.init(user.id)

  updateState((state) => ({ ...state, isLoading: true }))

  try {
    const favs = await favoritesApi.getByUserId(user.id)
    favoritesStore.syncFromApi(favs)

    if (!favs.length) {
      renderEmptyState(listEl, countEl)
      updateState((state) => ({ ...state, products: [], isLoading: false }))
      return
    }

    const products = await productService.getByIds(favs.map((f) => f.productId))
    updateState((state) => ({ ...state, products, isLoading: false }))
    if (countEl) countEl.textContent = String(products.length)
  } catch (err) {
    listEl.innerHTML = html`<p class="py-16 text-center text-error">Ошибка загрузки: ${err instanceof Error ? err.message : 'Неизвестная ошибка'}</p>`
    updateState((state) => ({ ...state, isLoading: false }))
    return
  }

  const render = () => {
    const state = getState()
    renderProducts(listEl, paginationEl, state, state.products.length)

    initFavoriteButtons()
    initAddToCartButtons()
  }

  render()

  sortEl.addEventListener('change', () => {
    updateState((state) => ({
      ...state,
      currentSort: sortEl.value,
      currentPage: 1,
    }))
    render()
  })
}
