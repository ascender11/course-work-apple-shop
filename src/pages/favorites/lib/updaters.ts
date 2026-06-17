import { favoritesStore } from '@/features/favorite-toggle'

import { html } from '@/shared/lib'

export const updateFavoritesCount = () => {
  const el = document.getElementById('favorites-count')
  if (el) el.textContent = String(favoritesStore.count)
}

export const renderEmptyState = () => {
  const listEl = document.getElementById('favorites-product-list')
  const paginationEl = document.getElementById('favorites-pagination')
  const countEl = document.getElementById('favorites-count')

  if (listEl) {
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
  }
  if (paginationEl) paginationEl.innerHTML = ''
  if (countEl) countEl.textContent = '0'
}
