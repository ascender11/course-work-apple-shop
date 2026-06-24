export const animateRemoval = (element: HTMLElement, onComplete?: () => void) => {
  element.style.maxHeight = `${element.offsetHeight}px`
  element.style.overflow = 'hidden'

  requestAnimationFrame(() => {
    element.classList.add('animate-removal')
  })

  const cleanup = () => {
    element.remove()
    onComplete?.()
  }

  element.addEventListener('transitionend', cleanup, { once: true })
  setTimeout(cleanup, 400)
}
