import { t } from '@/shared/i18n'
import { html } from '@/shared/lib'

const ITEMS_KEYS = [
  { img: '/catalog/delivery.svg', titleKey: 'catalog.adv.delivery', descKey: 'catalog.adv.deliveryDesc' },
  { img: '/catalog/money.svg', titleKey: 'catalog.adv.payment', descKey: 'catalog.adv.paymentDesc' },
  { img: '/catalog/bank.svg', titleKey: 'catalog.adv.credit', descKey: 'catalog.adv.creditDesc' },
  { img: '/catalog/shield.svg', titleKey: 'catalog.adv.warranty', descKey: 'catalog.adv.warrantyDesc' },
] as const

export const Advantages = () => html`
  <div class="mt-6 flex flex-col gap-3">
    ${ITEMS_KEYS.map(
      (item) => html`
        <div class="flex items-center gap-3 rounded-xl bg-background p-4">
          <img
            src="${item.img}"
            alt="${t(item.titleKey)}"
            width="64"
            height="64"
            class="h-16 w-16 shrink-0 object-contain"
          />
          <div>
            <p class="font-bold text-text-primary">${t(item.titleKey)}</p>
            <p class="text-sm text-text-tertiary">${t(item.descKey)}</p>
          </div>
        </div>
      `
    ).join('')}
  </div>
`
