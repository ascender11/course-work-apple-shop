import { cartStore } from '@/entities/cart'

export const updateSummary = () => {
  const total = cartStore.calculateTotal()
  const count = cartStore.getCount()

  const summaryTotal = document.getElementById('summary-total')
  const summarySubtotal = document.getElementById('summary-subtotal')
  const summaryCount = document.getElementById('summary-count')

  if (summaryTotal) summaryTotal.textContent = `${total.toLocaleString('ru-RU')} ₽`
  if (summarySubtotal) summarySubtotal.textContent = `${total.toLocaleString('ru-RU')} ₽`
  if (summaryCount) summaryCount.textContent = String(count)

  const h1 = document.querySelector<HTMLElement>('#cart-root h1')
  if (h1) {
    const countSpan = h1.querySelector('span')
    if (countSpan) {
      const word = count === 1 ? 'товар' : count < 5 ? 'товара' : 'товаров'
      countSpan.textContent = `${count} ${word}`
    }
  }
}

export const updateLineItem = (itemEl: HTMLElement, productId: string, color?: string, storage?: string) => {
  const qtyEl = itemEl.querySelector<HTMLElement>('.js-cart-qty')
  const lineTotals = itemEl.querySelectorAll<HTMLElement>('.js-cart-line-total')

  const items = cartStore.getItems()
  const item = items.find(
    (i) => i.product.id === productId && i.selectedColor === color && i.selectedStorage === storage
  )
  if (!item) return

  const lineTotal = 'price' in item.product ? item.product.price.current * item.quantity : 0
  if (qtyEl) qtyEl.textContent = String(item.quantity)
  lineTotals.forEach((el) => {
    el.textContent = `${lineTotal.toLocaleString('ru-RU')} ₽`
  })
  updateSummary()
}
