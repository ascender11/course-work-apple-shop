import { AddedToCart, AddToCart } from '@/shared/ui/icons'

export const updateBtn = (btn: HTMLButtonElement, inCart: boolean) => {
  btn.dataset.inCart = inCart ? '1' : ''
  btn.setAttribute('aria-label', inCart ? 'Убрать из корзины' : 'Добавить в корзину')
  btn.innerHTML = `${inCart ? AddedToCart() : AddToCart()}<span>${inCart ? 'В корзине' : 'В корзину'}</span>`
  btn.classList.toggle('bg-success', inCart)
  btn.classList.toggle('hover:bg-success-hover', inCart)
  btn.classList.toggle('bg-primary', !inCart)
  btn.classList.toggle('hover:bg-primary-hover', !inCart)
}
