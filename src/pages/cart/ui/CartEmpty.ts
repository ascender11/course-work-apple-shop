import { html } from '@/shared/lib'
import { CartEmpty as CartEmptyIcon } from '@/shared/ui/icons'

export const CartEmpty = () => html`
  <div class="flex flex-col items-center justify-center gap-5 py-24 text-center">
    ${CartEmptyIcon({ className: 'w-20 h-20' })}
    <div>
      <p class="text-xl font-semibold text-text-primary">Корзина пуста</p>
      <p class="text-sm text-text-quinary mt-1.5">Добавьте товары из каталога, чтобы оформить заказ</p>
    </div>
    <a href="/catalog" data-navigo class="button mt-2">
      Перейти в каталог
    </a>
  </div>
`
