import { html } from '@/shared/lib'
import { Button } from '@/shared/ui/components'

export const OutOfStockCard = () => html`
  <div class="flex flex-col gap-4 rounded-2xl border border-border p-6 shadow-card">
    <p class="text-base font-medium text-text-secondary">Ожидается поступление</p>
    <p class="text-sm text-text-quinary">Мы можем сообщить вам, когда товар появится в наличии</p>
    ${Button({ text: 'Сообщить о поступлении', variant: 'outline' })}
  </div>
`
