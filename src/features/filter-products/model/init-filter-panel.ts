import { getQueryString, navigate } from '@/shared/lib'

import { PRICE_ABS_MAX, PRICE_ABS_MIN } from './constants'
import type { FiltersState } from './types'
import { buildQueryString } from './utils'

const collectState = (prefix: string): FiltersState => {
  const minEl = document.getElementById(`${prefix}-range-min`) as HTMLInputElement | null
  const maxEl = document.getElementById(`${prefix}-range-max`) as HTMLInputElement | null
  const categories = Array.from(
    document.querySelectorAll<HTMLInputElement>(`input[name="${prefix}-category"]:checked`)
  ).map((el) => el.value)
  const yearEl = document.querySelector<HTMLInputElement>(`input[name="${prefix}-year"]:checked`)

  return {
    priceMin: Number(minEl?.value) || PRICE_ABS_MIN,
    priceMax: Number(maxEl?.value) || PRICE_ABS_MAX,
    categories,
    year: yearEl?.value ?? '',
    page: 1,
  }
}

const applyFilters = (prefix: string) => {
  const state = collectState(prefix)
  const baseUrl = window.location.pathname

  const params = new URLSearchParams(getQueryString())

  params.delete('price.current_gte')
  params.delete('price.current_lte')
  params.delete('category')
  params.delete('year')
  params.delete('page')

  const filterQs = buildQueryString(state)
  const filterParams = new URLSearchParams(filterQs)
  filterParams.forEach((value, key) => {
    if (key === 'category') {
      params.append(key, value)
    } else {
      params.set(key, value)
    }
  })

  const qs = params.toString()
  navigate(`${baseUrl}${qs ? `?${qs}` : ''}`)
}

const initRangeSlider = (prefix: string, onApply: () => void) => {
  const rangeMin = document.getElementById(`${prefix}-range-min`) as HTMLInputElement | null
  const rangeMax = document.getElementById(`${prefix}-range-max`) as HTMLInputElement | null
  const inputMin = document.getElementById(`${prefix}-price-min-input`) as HTMLInputElement | null
  const inputMax = document.getElementById(`${prefix}-price-max-input`) as HTMLInputElement | null
  const track = document.getElementById(`${prefix}-slider-track`)

  if (!rangeMin || !rangeMax || !inputMin || !inputMax) return

  const updateTrack = () => {
    const min = Number(rangeMin.value)
    const max = Number(rangeMax.value)
    const range = PRICE_ABS_MAX - PRICE_ABS_MIN
    const leftPct = ((min - PRICE_ABS_MIN) / range) * 100
    const rightPct = ((max - PRICE_ABS_MIN) / range) * 100
    if (track) {
      track.style.left = `${leftPct}%`
      track.style.width = `${rightPct - leftPct}%`
    }
    inputMin.value = String(min)
    inputMax.value = String(max)
  }

  rangeMin.addEventListener('input', () => {
    if (Number(rangeMin.value) > Number(rangeMax.value)) rangeMin.value = rangeMax.value
    updateTrack()
  })
  rangeMax.addEventListener('input', () => {
    if (Number(rangeMax.value) < Number(rangeMin.value)) rangeMax.value = rangeMin.value
    updateTrack()
  })

  rangeMin.addEventListener('change', onApply)
  rangeMax.addEventListener('change', onApply)

  const bindTextInput = (input: HTMLInputElement, rangeInput: HTMLInputElement) => {
    const commit = () => {
      const val = Math.max(PRICE_ABS_MIN, Math.min(PRICE_ABS_MAX, Number(input.value) || 0))
      input.value = String(val)
      rangeInput.value = String(val)
      updateTrack()
      onApply()
    }
    input.addEventListener('blur', commit)
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') commit()
    })
  }

  bindTextInput(inputMin, rangeMin)
  bindTextInput(inputMax, rangeMax)

  updateTrack()
}

const initAccordions = () => {
  document.querySelectorAll<HTMLElement>('[data-accordion-target]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.accordionTarget
      if (!targetId) return
      document.getElementById(targetId)?.classList.toggle('hidden')
      btn.querySelector<HTMLElement>('.accordion-arrow')?.classList.toggle('rotate-180')
    })
  })
}

const initFilterPanel = (prefix: string) => {
  initRangeSlider(prefix, () => applyFilters(prefix))

  document.querySelectorAll<HTMLInputElement>(`input[name="${prefix}-category"]`).forEach((cb) => {
    cb.addEventListener('change', () => applyFilters(prefix))
  })

  document.querySelectorAll<HTMLInputElement>(`input[name="${prefix}-year"]`).forEach((rb) => {
    rb.addEventListener('change', () => applyFilters(prefix))
  })
}

export const initFiltersPanel = () => {
  initAccordions()
  initFilterPanel('desktop')
  initFilterPanel('modal')
}
