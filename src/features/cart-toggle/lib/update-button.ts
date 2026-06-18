import { t } from '@/shared/i18n'
import { AddedToCart, AddToCart } from '@/shared/ui/icons'

export const updateBtn = (btn: HTMLButtonElement, inCart: boolean) => {
  btn.dataset.inCart = inCart ? '1' : ''
  btn.setAttribute('aria-label', inCart ? t('cart.remove') : t('cart.addToCart'))
  btn.innerHTML = `${inCart ? AddedToCart() : AddToCart()}<span>${inCart ? t('cart.inCart') : t('cart.addToCart')}</span>`
  btn.classList.toggle('bg-success', inCart)
  btn.classList.toggle('hover:bg-success-hover', inCart)
  btn.classList.toggle('bg-primary', !inCart)
  btn.classList.toggle('hover:bg-primary-hover', !inCart)
}
