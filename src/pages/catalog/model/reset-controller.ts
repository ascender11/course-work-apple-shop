import { type FiltersState, isFiltersActive } from '@/features/filter-products'

export const initResetController = (state: FiltersState) => {
  const resetBtn = document.getElementById('reset-filters-btn')

  if (resetBtn) {
    resetBtn.classList.toggle('hidden', !isFiltersActive(state))
    resetBtn.addEventListener('click', () => {
      window.history.pushState(null, '', '/catalog')
      window.dispatchEvent(new PopStateEvent('popstate', { state: null }))
    })
  }
}
