import { setColorScheme, setFontSize, setHideImages } from '@/shared/lib'

import { toggleActiveButton } from '../lib/toggle-active-button'

export const initAccessibility = (): void => {
  const fontSizeButtons = document.querySelectorAll<HTMLButtonElement>('button[data-font-size]')

  fontSizeButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation()
      toggleActiveButton(fontSizeButtons, btn)
      setFontSize(btn.getAttribute('data-font-size') as 'normal' | 'large' | 'xlarge')
    })
  })

  const colorSchemeButtons = document.querySelectorAll<HTMLButtonElement>('button[data-color-scheme]')

  colorSchemeButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation()
      toggleActiveButton(colorSchemeButtons, btn)
      setColorScheme(
        btn.getAttribute('data-color-scheme') as
          | 'default'
          | 'black-white'
          | 'black-green'
          | 'white-black'
          | 'beige-brown'
          | 'blue-darkblue'
      )
    })
  })

  const imagesToggle = document.querySelector<HTMLButtonElement>('[data-images-toggle]')
  if (imagesToggle) {
    imagesToggle.addEventListener('click', (e) => {
      e.stopPropagation()
      const isActive = imagesToggle.getAttribute('data-active') === 'true'
      const next = !isActive
      imagesToggle.setAttribute('data-active', String(next))
      imagesToggle.setAttribute('aria-pressed', String(next))
      const knob = imagesToggle.querySelector<HTMLSpanElement>('[data-active]')
      if (knob) knob.setAttribute('data-active', String(next))
      setHideImages(next)
    })
  }
}
