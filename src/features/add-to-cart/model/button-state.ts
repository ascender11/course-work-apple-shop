import { AddedToCart, AddToCart } from '@/shared/ui/icons'

export const applyInCartState = (btn: HTMLButtonElement) => {
  console.log('applyInCartState called')
  btn.innerHTML = `${AddedToCart()}<span>В корзине</span>`
  btn.classList.remove('bg-primary', 'hover:bg-primary-hover')
  btn.classList.add('bg-success', 'hover:bg-success-hover')
  btn.dataset.inCart = '1'
}

export const applyDefaultState = (btn: HTMLButtonElement) => {
  console.log('applyDefaultState called')
  btn.innerHTML = `${AddToCart()}<span>В корзину</span>`
  btn.classList.remove('bg-success', 'hover:bg-success-hover')
  btn.classList.add('bg-primary', 'hover:bg-primary-hover')
  delete btn.dataset.inCart
}
