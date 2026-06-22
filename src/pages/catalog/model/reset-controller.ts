export const initResetController = () => {
  const panelBtns = document.querySelectorAll<HTMLElement>('[data-reset-filters]')

  panelBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      window.history.pushState(null, '', '/catalog')
      window.dispatchEvent(new PopStateEvent('popstate', { state: null }))
    })
  })
}
