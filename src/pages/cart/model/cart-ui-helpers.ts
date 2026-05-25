export const removeCardFromDOM = (itemEl: HTMLElement, onComplete?: () => void) => {
  itemEl.style.opacity = '0'
  itemEl.style.transition = 'opacity 0.25s, max-height 0.3s 0.1s, padding 0.3s 0.1s, margin 0.3s 0.1s'
  itemEl.style.overflow = 'hidden'
  const h = itemEl.offsetHeight
  itemEl.style.maxHeight = `${h}px`
  requestAnimationFrame(() => {
    itemEl.style.maxHeight = '0'
    itemEl.style.paddingTop = '0'
    itemEl.style.paddingBottom = '0'
  })
  setTimeout(() => {
    itemEl.remove()
    const remaining = document.querySelectorAll('.js-cart-item')
    if (!remaining.length) location.reload()
    onComplete?.()
  }, 380)
}
