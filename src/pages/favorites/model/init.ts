import type { Product } from '@/entities/product'
import { userStore } from '@/entities/user'
import { initCartButtons } from '@/features/cart-toggle'
import { favoritesStore, initFavoriteButtons } from '@/features/favorite-toggle'
import { PAGE_SIZE, ProductList } from '@/widgets/product-list'

import { html } from '@/shared/lib'
import { animateRemoval } from '@/shared/lib/animate'
import { Pagination } from '@/shared/ui/components'

import { renderEmptyState, updateFavoritesCount } from '../lib/updaters'

let currentPage = 1
let currentSort = ''
let unsubscribeStore: (() => void) | null = null

export const getCurrentSort = () => currentSort

const getSortedProducts = (): Product[] => {
  const arr = favoritesStore.items.map((f) => f.product)
  if (currentSort === 'price.current|asc') arr.sort((a, b) => a.price.current - b.price.current)
  else if (currentSort === 'price.current|desc') arr.sort((a, b) => b.price.current - a.price.current)
  else if (currentSort === 'rating.score|desc') arr.sort((a, b) => b.rating.score - a.rating.score)
  return arr
}

const renderProducts = (listEl: HTMLElement, paginationEl: HTMLElement) => {
  const sorted = getSortedProducts()
  const start = (currentPage - 1) * PAGE_SIZE
  const page = sorted.slice(start, start + PAGE_SIZE)

  listEl.innerHTML =
    page.length > 0
      ? ProductList({ products: page })
      : html`<p class="py-16 text-center text-text-quinary">Нет товаров на этой странице.</p>`

  paginationEl.innerHTML = Pagination({
    currentPage,
    totalCount: favoritesStore.count,
    pageLimit: PAGE_SIZE,
  })
}

const onStoreChange = (listEl: HTMLElement) => {
  const domIds = new Set(
    Array.from(listEl.querySelectorAll<HTMLElement>('[data-product-card] [data-product-id]')).map(
      (el) => el.dataset.productId ?? ''
    )
  )
  const storeIds = new Set(favoritesStore.items.map((f) => f.productId))
  const removedId = [...domIds].find((id) => !storeIds.has(id))

  if (removedId) {
    const card = listEl
      .querySelector<HTMLElement>(`[data-product-id="${removedId}"]`)
      ?.closest<HTMLElement>('[data-product-card]')

    if (card) {
      animateRemoval(card, () => {
        const maxPage = Math.max(1, Math.ceil(favoritesStore.count / PAGE_SIZE))
        currentPage = Math.min(currentPage, maxPage)
        updateFavoritesCount()
        if (favoritesStore.count === 0) renderEmptyState()
      })
      return
    }
  }

  const maxPage = Math.max(1, Math.ceil(favoritesStore.count / PAGE_SIZE))
  currentPage = Math.min(currentPage, maxPage)
  updateFavoritesCount()
  if (favoritesStore.count === 0) renderEmptyState()
}

export const initFavoritesPage = async () => {
  const listEl = document.getElementById('favorites-product-list')
  const paginationEl = document.getElementById('favorites-pagination')
  const sortEl = document.querySelector<HTMLSelectElement>('.sort-select')

  if (!listEl || !paginationEl || !sortEl) return

  unsubscribeStore?.()
  unsubscribeStore = null

  const user = userStore.user
  if (!user) return

  await favoritesStore.init(user.id)

  if (favoritesStore.count === 0) {
    renderEmptyState()
    return
  }

  updateFavoritesCount()

  const render = () => {
    renderProducts(listEl, paginationEl)
    initFavoriteButtons()
    initCartButtons()
  }

  render()

  unsubscribeStore = favoritesStore.subscribe(() => {
    onStoreChange(listEl)
  })

  sortEl.addEventListener('change', () => {
    currentSort = sortEl.value
    currentPage = 1
    render()
  })
}
