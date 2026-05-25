import { CartItemCard, cartStore } from '@/entities/cart'
import { userStore } from '@/entities/user'
import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'

import { html } from '@/shared/lib'
import { CartEmpty as CartEmptyIcon } from '@/shared/ui/icons'

import { initCartPage } from '../model/cart-controller'

const OrderSummary = (total: number, count: number) => html`
  <div class="bg-background rounded-2xl border border-border-light shadow-card p-6 flex flex-col gap-4 lg:sticky lg:top-6">

    <h2 class="text-lg font-semibold text-text-primary">Ваш заказ</h2>

    <div class="flex flex-col gap-2 text-sm text-text-secondary">
      <div class="flex justify-between">
        <span>Товары (<span id="summary-count">${count}</span>)</span>
        <span id="summary-subtotal">${total.toLocaleString('ru-RU')} ₽</span>
      </div>
      <div class="flex justify-between text-success">
        <span>Доставка</span>
        <span>Бесплатно</span>
      </div>
    </div>

    <div class="flex justify-between items-baseline pt-1 border-t border-border-light">
      <span class="text-base font-semibold text-text-primary">Итого</span>
      <span id="summary-total" class="text-2xl font-bold text-text-primary">${total.toLocaleString('ru-RU')} ₽</span>
    </div>

    <button
      id="cart-checkout-btn"
      class="button w-full flex items-center justify-center gap-2 mt-1"
    >
      <span id="cart-checkout-label">Оформить заказ</span>
    </button>

    <p class="text-xs text-text-quinary text-center">
      Нажимая «Оформить заказ», вы соглашаетесь с условиями оферты
    </p>
  </div>
`

const CartEmpty = () => html`
  <div class="flex flex-col items-center justify-center gap-5 py-24 text-center">
    ${CartEmptyIcon({ className: 'w-20 h-20' })}
    <div>
      <p class="text-xl font-semibold text-text-primary">Корзина пуста</p>
      <p class="text-sm text-text-quinary mt-1.5">Добавьте товары из каталога, чтобы оформить заказ</p>
    </div>
    <a
      href="/catalog"
      data-navigo
      class="button mt-2"
    >
      Перейти в каталог
    </a>
  </div>
`

export const CartPage = (): string => {
  const observer = new MutationObserver((_, obs) => {
    if (!document.getElementById('cart-root')) return
    obs.disconnect()
    initCartPage()
  })
  if (typeof window !== 'undefined') observer.observe(document.body, { childList: true, subtree: true })

  const user = userStore.getUser()
  if (user) cartStore.init(user.id)

  const items = cartStore.getItems()
  const total = cartStore.calculateTotal()
  const count = cartStore.getCount()
  const isEmpty = items.length === 0

  return html`
    ${Header()}

    <div id="cart-root" class="min-h-[calc(100vh-56px)] bg-background-secondary">

      <div class="px-4 py-6 md:px-6 lg:px-30">
        <h1 class="text-2xl font-bold text-text-primary mb-6">
          Корзина${!isEmpty ? html` <span class="ml-2 text-base font-normal text-text-quinary">${count} товар${count === 1 ? '' : count < 5 ? 'а' : 'ов'}</span>` : ''}
        </h1>

        ${
          isEmpty
            ? CartEmpty()
            : html`
          <div class="flex flex-col lg:flex-row lg:items-start gap-6">

            <div class="flex-1 min-w-0 bg-background rounded-2xl border border-border-light shadow-card-sm px-4 sm:px-6">
              <div id="cart-items-list">
                ${items.map((item) => CartItemCard(item)).join('')}
              </div>
              <div class="py-4 flex justify-end">
                <button
                  id="cart-clear-btn"
                  class="text-sm text-text-quinary hover:text-error transition-colors duration-150 cursor-pointer"
                >
                  Очистить корзину
                </button>
              </div>
            </div>

            <div class="w-full lg:w-80 xl:w-96 shrink-0">
              <div id="cart-summary">
                ${OrderSummary(total, count)}
              </div>
            </div>

          </div>
        `
        }
      </div>

    </div>

    <div id="cart-modal-container"></div>

    ${Footer()}
  `
}
