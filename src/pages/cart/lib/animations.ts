export const animateRemoval = (element: HTMLElement, onComplete?: () => void) => {
  element.style.opacity = '0'
  element.style.transition = 'opacity 0.25s, max-height 0.3s 0.1s, padding 0.3s 0.1s, margin 0.3s 0.1s'
  element.style.overflow = 'hidden'
  const height = element.offsetHeight
  element.style.maxHeight = `${height}px`

  requestAnimationFrame(() => {
    element.style.maxHeight = '0'
    element.style.paddingTop = '0'
    element.style.paddingBottom = '0'
  })

  setTimeout(() => {
    element.remove()
    onComplete?.()
  }, 380)
}
