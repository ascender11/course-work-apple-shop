import { t } from '@/shared/i18n'
import { html } from '@/shared/lib'

export const SearchInput = (value = ''): string => html`
  <div class="relative w-full max-w-sm">
    <svg class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-quinary pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
    <input
      id="catalog-search"
      type="search"
      value="${value}"
      placeholder="${t('catalog.searchPlaceholder')}"
      class="w-full rounded-lg border border-border bg-background py-2 pl-10 pr-24 text-sm text-text-primary placeholder-text-quinary outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30"
    />
    <button
      id="catalog-search-btn"
      class="absolute right-1 top-1/2 -translate-y-1/2 rounded-md bg-primary px-3 py-1 text-xs font-medium text-text-button transition-colors hover:bg-secondary cursor-pointer"
    >${t('catalog.searchBtn')}</button>
  </div>
`
