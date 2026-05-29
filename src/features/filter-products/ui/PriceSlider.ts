import { html } from '@/shared/lib'

import { PRICE_ABS_MAX, PRICE_ABS_MIN } from '../model/constants'
import type { FiltersState } from '../model/types'

export const PriceSlider = (state: FiltersState, prefix: string) => html`
  <div class="py-4">
    <p class="mb-4 text-sm font-semibold text-text-primary">Цена</p>

    <div class="relative mb-5 h-6">
      <div class="pointer-events-none absolute left-0 right-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-background-tertiaty">
        <div id="${prefix}-slider-track" class="absolute h-full rounded-full bg-primary"></div>
      </div>
      <input
        type="range"
        id="${prefix}-range-min"
        class="range-slider-input"
        min="${PRICE_ABS_MIN}"
        max="${PRICE_ABS_MAX}"
        value="${state.priceMin}"
        step="1"
      />
      <input
        type="range"
        id="${prefix}-range-max"
        class="range-slider-input"
        min="${PRICE_ABS_MIN}"
        max="${PRICE_ABS_MAX}"
        value="${state.priceMax}"
        step="1"
      />
    </div>

    <div class="flex gap-2">
      <div class="flex flex-1 items-center gap-1 rounded-lg border border-border px-3 py-2">
        <span class="shrink-0 text-xs text-text-quinary">от</span>
        <input
          type="number"
          id="${prefix}-price-min-input"
          value="${state.priceMin}"
          class="w-full text-sm text-text-primary outline-none bg-transparent [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <span class="shrink-0 text-xs text-text-quinary">₽</span>
      </div>
      <div class="flex flex-1 items-center gap-1 rounded-lg border border-border px-3 py-2">
        <span class="shrink-0 text-xs text-text-quinary">до</span>
        <input
          type="number"
          id="${prefix}-price-max-input"
          value="${state.priceMax}"
          class="w-full text-sm text-text-primary outline-none bg-transparent [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <span class="shrink-0 text-xs text-text-quinary">₽</span>
      </div>
    </div>
  </div>
`
