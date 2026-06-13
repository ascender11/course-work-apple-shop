import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'

import { html } from '@/shared/lib'
import { Clock, Walk } from '@/shared/ui/icons'

import { initDeliveryMap } from '../model/initDeliveryMap'
import { PayCard } from './PayCard'

const getAssetPath = (name: string) => `/assets/delivery/${name}`

export const DeliveryPage = (): string => {
  if (typeof window !== 'undefined') {
    const observer = new MutationObserver((_, obs) => {
      const mapEl = document.getElementById('delivery-map')
      if (!mapEl) return
      obs.disconnect()
      void initDeliveryMap()
    })
    observer.observe(document.body, { childList: true, subtree: true })
  }

  return html`
  ${Header()}

  <main class="bg-background">
    <div class="px-4 py-20 md:px-6 lg:px-30 max-w-360 mx-auto flex flex-col gap-4">

      <section class="grid grid-cols-1 xl:grid-cols-2 gap-4">
        
        <div class="relative rounded-2xl bg-linear-to-r from-secondary to-primary">
          <div class="flex flex-col-reverse sm:flex-row sm:items-center p-3.75 sm:p-0 gap-3 sm:h-53">
            <div class="flex flex-col gap-2 sm:w-full sm:pl-56 sm:pr-6 sm:py-6">
              <h2 class="text-base sm:text-3xl font-bold text-text-button leading-tight">
                Бесплатная доставка за 3 часа
              </h2>
              <p class="text-xs sm:text-base font-medium text-text-button/90 leading-snug">
                в пределах МКАД при заказе от 30 000 ₽.<br />
                За МКАД или меньшей сумме — 350 ₽
              </p>
            </div>
            <img 
              src="${getAssetPath('scooter.png')}" 
              alt="Курьер на скутере" 
              class="w-32 h-auto mx-auto -mt-8 sm:mt-0 sm:mx-0 sm:absolute sm:left-5 sm:-bottom-2 sm:h-67.5 sm:w-52.5 object-contain pointer-events-none drop-shadow-lg" 
            />
          </div>
        </div>

        <div class="relative rounded-2xl bg-linear-to-r from-secondary to-primary">
          <div class="flex flex-col-reverse sm:flex-row sm:items-center p-3.75 sm:p-0 gap-3 sm:h-53">
            <div class="flex flex-col gap-2 sm:w-full sm:pl-48 sm:pr-6 sm:py-6">
              <h2 class="text-base sm:text-3xl font-bold text-text-button leading-tight">
                Доставка по России
              </h2>
              <p class="text-sm sm:text-base font-medium text-text-button/90 leading-snug">
                3–5 дней через СДЭК или Почту России. Точная стоимость известна при оформлении заказа
              </p>
            </div>
            <img 
              src="${getAssetPath('drone.png')}" 
              alt="Дрон с посылкой" 
              class="w-32 h-auto mx-auto -mt-8 sm:mt-0 sm:mx-0 sm:absolute sm:-top-3 sm:-left-4 sm:h-53 sm:w-50 object-contain pointer-events-none" 
            />
          </div>
        </div>

      </section>

      <section class="bg-background-quaternary rounded-2xl p-6 sm:p-10 lg:p-12">
        <h2 class="text-2xl sm:text-3xl font-bold text-text-primary mb-6">Пункты самовывоза</h2>

          <div class="bg-background rounded-2xl px-4 py-4 sm:px-6 sm:py-5 flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-2 gap-2 mb-3">
            <span class="text-base font-medium text-text-primary">ул Барклая 8</span>
            <div class="flex items-center gap-1 bg-background-secondary rounded-full px-3 py-1 text-sm text-text-secondary w-fit">
              ${Walk({ className: 'w-4 h-4 text-text-secondary' })}
              <span>5 минут от</span>
              <img src="${getAssetPath('metro.svg')}" alt="" class="w-4 h-4" />
              <span class="text-text-tertiary">Багратионовская</span>
            </div>
            <div class="flex items-center gap-1.5 sm:ml-auto text-sm text-text-quinary w-fit">
              ${Clock({ className: 'w-5 h-5 opacity-60 text-text-quinary' })}
              <span>ежедневно 10:00 — 22:00</span>
            </div>
          </div>

        <div id="delivery-map" class="mt-4 rounded-2xl overflow-hidden w-full h-75 sm:h-100 bg-background-secondary"></div>
      </section>

      <section class="relative bg-background-quaternary rounded-2xl overflow-hidden px-6 py-8 sm:px-10 sm:py-10 lg:px-12 min-h-64">

        <div class="hidden sm:block absolute left-10 top-5.75 w-114.25 h-111 pointer-events-none select-none">
          <img src="${getAssetPath('delivery-man.png')}" alt="Курьер" class="relative w-full object-contain" />
        </div>

        <div class="sm:pl-80 flex flex-col gap-3">
          <div class="flex items-center justify-between gap-3 flex-wrap">
            <h2 class="text-2xl sm:text-4xl font-bold text-primary leading-tight">
              Доставка, которая радует
            </h2>
            <span class="bg-background text-primary text-sm font-medium px-4 py-2 rounded-2xl whitespace-nowrap shrink-0">
              Актуально в Москве
            </span>
          </div>
          <ul class="flex flex-col gap-2 mt-1">
            <li class="flex items-center gap-2 text-sm sm:text-base font-bold text-primary">
              • согласуем с вами удобное время
            </li>
            <li class="flex items-center gap-2 text-sm sm:text-base font-bold text-primary">
              • курьер позвонит за час до доставки
            </li>
            <li class="flex items-center gap-2 text-sm sm:text-base font-bold text-primary">
              • любые ваши проверки техники перед оплатой
            </li>
          </ul>
        </div>

      </section>

      <section class="bg-background-secondary rounded-2xl p-6 sm:p-10 lg:p-12">
        <h2 class="text-2xl sm:text-4xl font-bold text-text-primary mb-6">Оплачивайте как удобно</h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          ${PayCard(
            'cash.png',
            'Оплата наличными',
            'Оплатить товар наличными вы можете как в магазине, так и при доставке на дом — у наших курьеров всегда есть сдача. Перед тем как расплатиться, у вас есть возможность удостовериться в качестве устройства.'
          )}
          ${PayCard(
            'card.png',
            'Банковской картой в магазине / курьеру',
            'Неважно, забираете ли вы товар сами из магазина или заказали доставку — в любом случае вы можете расплатиться таким способом, ведь у наших курьеров всегда есть терминалы.'
          )}
          ${PayCard(
            'online.png',
            'Онлайн оплата +8% комиссия',
            'Оплата через платёжную систему на сайте при помощи банковской карты, Яндекс Деньги, WebMoney и др. Обратите внимание, комиссия зависит от способа оплаты.'
          )}
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          ${PayCard(
            'checkmark.png',
            'Безналичный расчёт',
            'Мы всегда действуем в интересах покупателей, поэтому предоставляем возможность оплатить товар безналичным расчётом. Обратитесь к нашим менеджерам по телефону +7 (812) 704-86-97, чтобы получить всю необходимую информацию.'
          )}
          ${PayCard(
            'bank.png',
            'Кредит',
            'Иногда желание стать владельцем гаджета не совсем совпадает с возможностью сразу оплатить всю сумму. Мы сотрудничаем со многими банками — оформление кредита происходит очень быстро. Звоните: +7 (812) 704-86-97.'
          )}
        </div>
      </section>

      <section class="relative bg-background-secondary rounded-2xl overflow-hidden px-6 py-8 sm:px-10 lg:px-12 sm:py-10 min-h-56 sm:min-h-80 flex items-center">

        <div class="hidden md:block absolute -right-5.5 top-11.5 h-full lg:w-111.5 lg:h-114 pointer-events-none select-none">
          <img src="${getAssetPath('phone-cta.png')}" alt="" class="h-full object-contain object-bottom" />
        </div>

        <div class="flex flex-col gap-5 md:max-w-[55%]">
          <h2 class="text-2xl sm:text-4xl font-bold text-text-primary leading-tight">
            Выбирайте технику, а мы позаботимся о доставке
          </h2>
          <a href="/catalog" data-navigo
            class="button inline-flex items-center justify-center max-w-70 px-6 py-3.5 text-base font-medium"
          >
            Пойти выбирать
          </a>
        </div>

      </section>

    </div>
  </main>

  ${Footer()}
`
}
