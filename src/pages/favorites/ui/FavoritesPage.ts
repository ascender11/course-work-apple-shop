import { SortSelect } from '@/features/sort-products'
import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'

import { t } from '@/shared/i18n'
import { html } from '@/shared/lib'
import { Spinner } from '@/shared/ui/components'

import { getCurrentSort, initFavoritesPage } from '../model/init'

export const FavoritesPage = (): string => {
  const observer = new MutationObserver((_, obs) => {
    if (!document.getElementById('favorites-product-list')) return
    obs.disconnect()
    initFavoritesPage()
  })
  if (typeof window !== 'undefined') observer.observe(document.body, { childList: true, subtree: true })

  return html`
    ${Header()}

    <div class="min-h-[calc(100vh-56px)]">

      <div class="flex items-center justify-between px-4 py-4 md:px-6 lg:px-30">
        <div class="flex items-center gap-3">
          <h1 class="text-2xl font-bold text-text-primary">${t('fav.title')}</h1>
          <span id="favorites-count" class="flex items-center justify-center min-w-6 h-6 rounded-full bg-primary px-1.5 text-xs font-medium text-text-button">
            …
          </span>
        </div>

        ${SortSelect(getCurrentSort())}
      </div>

      <div class="px-4 pb-6 md:px-6 lg:px-30">
        <div id="favorites-product-list">
          <div class="py-16 flex justify-center items-center text-text-quinary">${Spinner()}</div>
        </div>
      </div>

      <div id="favorites-pagination" class="px-4 md:px-6 lg:px-30"></div>

    </div>

    ${Footer()}
  `
}
