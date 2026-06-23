import { t } from '@/shared/i18n'
import { html } from '@/shared/lib'
import { Dropdown } from '@/shared/ui/components'

import { CATEGORY_OPTIONS, YEAR_OPTIONS } from '../model/constants'
import type { FiltersState } from '../model/types'
import { PriceSlider } from './PriceSlider'

const CategoryOptions = (state: FiltersState, prefix: string) =>
  CATEGORY_OPTIONS.map(
    (cat) => html`
      <label class="flex cursor-pointer items-center gap-2.5 py-1 px-6 text-text-secondary">
        <input
          type="checkbox"
          name="${prefix}-category"
          value="${cat}"
          ${state.categories.includes(cat) ? 'checked' : ''}
          class="checkbox"
        />
        ${cat}
      </label>
    `
  ).join('')

const YearOptions = (state: FiltersState, prefix: string) =>
  YEAR_OPTIONS.map(
    (opt) => html`
      <label class="flex cursor-pointer items-center gap-2.5 py-1 px-6 text-text-secondary">
        <input
          type="radio"
          name="${prefix}-year"
          value="${opt.value}"
          ${state.year === opt.value ? 'checked' : ''}
          class="radio"
        />
        ${t(opt.labelKey)}
      </label>
    `
  ).join('')

export const FilterPanel = (state: FiltersState, prefix: string) => html`
  <div id="${prefix}-filter-panel">
    ${PriceSlider(state, prefix)}
    <div class="flex flex-col gap-2">
      ${Dropdown({
        id: `${prefix}-category-list`,
        title: t('filter.category'),
        content: CategoryOptions(state, prefix),
        openByDefault: state.categories.length > 0,
        isActive: state.categories.length > 0,
      })}
      ${Dropdown({
        id: `${prefix}-year-list`,
        title: t('filter.year'),
        content: YearOptions(state, prefix),
        openByDefault: state.year !== '',
        isActive: state.year !== '',
      })}
    </div>
    <button data-reset-filters class="mt-4 w-full rounded-lg border border-border py-2 text-sm font-medium text-primary transition-colors hover:bg-background-tertiary cursor-pointer">${t('catalog.resetFilter')}</button>
  </div>
`
