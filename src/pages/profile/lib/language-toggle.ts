export const initLanguageToggle = () => {
  const langButtons = document.querySelectorAll<HTMLButtonElement>('[data-lang]')
  langButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      langButtons.forEach((b) => {
        b.classList.remove('bg-background', 'shadow-sm', 'text-text-primary')
        b.classList.add('text-text-quinary')
      })
      btn.classList.remove('text-text-quinary')
      btn.classList.add('bg-background', 'shadow-sm', 'text-text-primary')
    })
  })
}
