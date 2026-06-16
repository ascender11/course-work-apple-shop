import { html } from '@/shared/lib'

const ITEMS = [
  {
    img: '/catalog/delivery.svg',
    title: 'Доставка за 2 часа',
    desc: 'Быстро и бесплатно доставляем все заказы по Москве',
  },
  { img: '/catalog/money.svg', title: 'Оплата', desc: 'Все виды наличного и безналичного расчета' },
  { img: '/catalog/bank.svg', title: 'Кредит', desc: 'Выгодные кредитные предложения от самых популярных банков' },
  { img: '/catalog/shield.svg', title: 'Гарантия', desc: 'Предоставляем целый год сервисного обслуживания' },
] as const

export const Advantages = () => html`
  <div class="mt-6 flex flex-col gap-3">
    ${ITEMS.map(
      (item) => html`
        <div class="flex items-center gap-3 rounded-xl bg-background p-4">
          <img
            src="${item.img}"
            alt="${item.title}"
            width="64"
            height="64"
            class="h-16 w-16 shrink-0 object-contain"
          />
          <div>
            <p class="font-bold text-text-primary">${item.title}</p>
            <p class="text-sm text-text-tertiary">${item.desc}</p>
          </div>
        </div>
      `
    ).join('')}
  </div>
`
