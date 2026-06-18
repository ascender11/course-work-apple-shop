import { t } from '@/shared/i18n'
import { html } from '@/shared/lib'
import { ArrowDown } from '@/shared/ui/icons'

import { SORT_OPTIONS } from '../model/constants'

export const SortSelect = (sort: string) => html`
  <div class="flex items-center gap-2">
    <span class="hidden text-sm text-text-quinary md:inline">${t('sort.label')}</span>
    <div class="relative">
      <select
        class="sort-select relative appearance-none cursor-pointer rounded-lg border border-border bg-background pl-3 pr-7 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        ${SORT_OPTIONS.map(
          (opt) =>
            html`<option value="${opt.value}" ${opt.value === sort ? 'selected' : ''}>${t(opt.labelKey)}</option>`
        ).join('')}
      </select>
      ${ArrowDown({ className: 'pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-primary' })}
    </div>
  </div>
`
