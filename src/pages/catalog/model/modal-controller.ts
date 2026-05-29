const MODAL_STATE_KEY = 'catalog-modal-open'

export const initModalController = () => {
  const mobileFilterBtn = document.getElementById('mobile-filter-btn')
  const filterModal = document.getElementById('filter-modal')
  const filterModalClose = document.getElementById('filter-modal-close')

  const wasOpen = sessionStorage.getItem(MODAL_STATE_KEY) === 'true'
  if (wasOpen && filterModal) {
    filterModal.classList.remove('hidden')
    document.body.style.overflow = 'hidden'
  }

  mobileFilterBtn?.addEventListener('click', () => {
    filterModal?.classList.remove('hidden')
    document.body.style.overflow = 'hidden'
    sessionStorage.setItem(MODAL_STATE_KEY, 'true')
  })

  const closeModal = () => {
    filterModal?.classList.add('hidden')
    document.body.style.overflow = ''
    sessionStorage.removeItem(MODAL_STATE_KEY)
  }

  filterModalClose?.addEventListener('click', closeModal)
}

export const clearModalState = () => {
  sessionStorage.removeItem(MODAL_STATE_KEY)
}
