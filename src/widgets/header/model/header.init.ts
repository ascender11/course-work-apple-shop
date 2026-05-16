export const initHeader = () => {
  let isOpen = false

  const menu = document.getElementById('mobile-menu')
  const overlay = document.getElementById('menu-overlay')
  const burgerBtn = document.getElementById('dropdown-menu-button')

  if (!burgerBtn) {
    console.error('Header: #dropdown-menu-button not found')
    return
  }

  if (!menu) {
    console.error('Header: #mobile-menu not found')
    return
  }

  if (!overlay) {
    console.error('Header: #menu-overlay not found')
    return
  }

  const burgerSvg = burgerBtn.querySelector('svg')
  if (!burgerSvg) {
    console.error('Header: SVG not found inside burger button')
    return
  }

  const openMenu = () => {
    isOpen = true
    menu.classList.remove('-translate-y-full')
    menu.classList.add('translate-y-0')
    overlay.classList.add('opacity-100', 'visible')
    overlay.classList.remove('opacity-0', 'invisible')
    burgerSvg.classList.add('open')
  }

  const closeMenu = () => {
    isOpen = false
    menu.classList.remove('translate-y-0')
    menu.classList.add('-translate-y-full')
    overlay.classList.remove('opacity-100', 'visible')
    overlay.classList.add('opacity-0', 'invisible')
    burgerSvg.classList.remove('open')
  }

  const toggleMenu = () => {
    isOpen ? closeMenu() : openMenu()
  }

  burgerBtn.addEventListener('click', toggleMenu)
  overlay.addEventListener('click', closeMenu)

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      closeMenu()
    }
  })
}
