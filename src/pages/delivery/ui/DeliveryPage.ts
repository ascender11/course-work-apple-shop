import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'

import { t } from '@/shared/i18n'
import { html } from '@/shared/lib'
import { Clock, Walk } from '@/shared/ui/icons'

import { initDeliveryPage } from '../model/init'
import { PayCard } from './PayCard'

const getAssetPath = (name: string) => `/delivery/${name}`

export const DeliveryPage = (): string => {
  if (typeof window !== 'undefined') initDeliveryPage()

  return html`
  ${Header()}

  <main class="bg-background">
    <div class="px-4 py-20 md:px-6 lg:px-30 max-w-360 mx-auto flex flex-col gap-4">

      <section class="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div class="relative rounded-2xl bg-linear-to-r from-secondary to-primary overflow-hidden">
          <div class="flex flex-col-reverse sm:flex-row sm:items-center p-3.75 sm:p-0 gap-3 sm:h-53">
            <div class="flex flex-col gap-2 sm:w-full sm:pl-44 sm:pr-6 sm:py-6">
              <h2 class="text-base sm:text-3xl font-bold text-text-button leading-tight">
                ${t('delivery.freeTitle')}
              </h2>
              <p class="text-xs sm:text-sm font-medium text-text-button/90 leading-snug">
                ${t('delivery.freeDesc')}
              </p>
            </div>
            <img
              src="${getAssetPath('scooter.png')}"
              alt=""
              class="w-32 h-auto mx-auto -mt-8 sm:mt-0 sm:mx-0 sm:absolute sm:left-5 sm:-bottom-2 sm:h-55 sm:w-44 object-contain pointer-events-none drop-shadow-lg"
            />
          </div>
        </div>

        <div class="relative rounded-2xl bg-linear-to-r from-secondary to-primary overflow-hidden">
          <div class="flex flex-col-reverse sm:flex-row sm:items-center p-3.75 sm:p-0 gap-3 sm:h-53">
            <div class="flex flex-col gap-2 sm:w-full sm:pl-40 sm:pr-6 sm:py-6">
              <h2 class="text-base sm:text-3xl font-bold text-text-button leading-tight">
                ${t('delivery.russiaTitle')}
              </h2>
              <p class="text-sm sm:text-sm font-medium text-text-button/90 leading-snug">
                ${t('delivery.russiaDesc')}
              </p>
            </div>
            <img
              src="${getAssetPath('drone.png')}"
              alt=""
              class="w-32 h-auto mx-auto -mt-8 sm:mt-0 sm:mx-0 sm:absolute sm:-top-3 sm:-left-4 sm:h-45 sm:w-42 object-contain pointer-events-none"
            />
          </div>
        </div>
      </section>

      <section class="bg-background-quaternary rounded-2xl p-6 sm:p-10 lg:p-12">
        <h2 class="text-2xl sm:text-3xl font-bold text-text-primary mb-6">${t('delivery.pickupTitle')}</h2>

        <div class="bg-background rounded-2xl px-4 py-4 sm:px-6 sm:py-5 flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-2 gap-2 mb-3">
          <span class="text-base font-medium text-text-primary">${t('delivery.pickupAddress')}</span>
          <div class="flex items-center gap-1 bg-background-secondary rounded-full px-3 py-1 text-sm text-text-secondary w-fit">
            ${Walk({ className: 'w-4 h-4 text-text-secondary' })}
            <span>${t('delivery.pickupWalk')}</span>
            <img src="${getAssetPath('metro.svg')}" alt="" class="w-4 h-4" />
            <span class="text-text-tertiary">Багратионовская</span>
          </div>
          <div class="flex items-center gap-1.5 sm:ml-auto text-sm text-text-quinary w-fit">
            ${Clock({ className: 'w-5 h-5 opacity-60 text-text-quinary' })}
            <span>${t('delivery.pickupHours')}</span>
          </div>
        </div>

        <div id="delivery-map" class="mt-4 rounded-2xl overflow-hidden w-full h-75 sm:h-100 bg-background-secondary"></div>
      </section>

      <section class="relative bg-background-quaternary rounded-2xl overflow-hidden px-6 py-8 sm:px-10 sm:py-10 lg:px-12 min-h-64">
        <div class="hidden sm:block absolute left-4 top-5.75 w-90 h-90 pointer-events-none select-none">
          <img src="${getAssetPath('delivery-man.png')}" alt="" class="relative w-full object-contain" />
        </div>

        <div class="sm:pl-72 flex flex-col gap-3">
          <div class="flex items-center justify-between gap-3 flex-wrap">
            <h2 class="text-2xl sm:text-4xl font-bold text-primary leading-tight">
              ${t('delivery.happyTitle')}
            </h2>
            <span class="bg-background text-primary text-sm font-medium px-4 py-2 rounded-2xl whitespace-nowrap shrink-0">
              ${t('delivery.happyBadge')}
            </span>
          </div>
          <ul class="flex flex-col gap-2 mt-1">
            <li class="flex items-center gap-2 text-sm sm:text-sm font-bold text-primary">
              • ${t('delivery.happyPoint1')}
            </li>
            <li class="flex items-center gap-2 text-sm sm:text-sm font-bold text-primary">
              • ${t('delivery.happyPoint2')}
            </li>
            <li class="flex items-center gap-2 text-sm sm:text-sm font-bold text-primary">
              • ${t('delivery.happyPoint3')}
            </li>
          </ul>
        </div>
      </section>

      <section class="bg-background-secondary rounded-2xl p-6 sm:p-10 lg:p-12">
        <h2 class="text-2xl sm:text-4xl font-bold text-text-primary mb-6">${t('delivery.payTitle')}</h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          ${PayCard('cash.png', t('delivery.payCash'), t('delivery.payCashDesc'))}
          ${PayCard('card.png', t('delivery.payCard'), t('delivery.payCardDesc'))}
          ${PayCard('online.png', t('delivery.payOnline'), t('delivery.payOnlineDesc'))}
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          ${PayCard('checkmark.png', t('delivery.payBankless'), t('delivery.payBanklessDesc'))}
          ${PayCard('bank.png', t('delivery.payCredit'), t('delivery.payCreditDesc'))}
        </div>
      </section>

      <section class="relative bg-background-secondary rounded-2xl overflow-hidden px-6 py-8 sm:px-10 lg:px-12 sm:py-10 min-h-56 sm:min-h-80 flex items-center">
        <div class="hidden md:block absolute -right-20 top-11.5 h-full lg:w-111.5 lg:h-114 pointer-events-none select-none">
          <img src="${getAssetPath('phone-cta.png')}" alt="" class="h-full object-contain object-bottom" />
        </div>

        <div class="flex flex-col gap-5 md:max-w-[55%]">
          <h2 class="text-2xl sm:text-4xl font-bold text-text-primary leading-tight">
            ${t('delivery.ctaTitle')}
          </h2>
          <a href="/catalog" data-navigo
            class="button inline-flex items-center justify-center max-w-70 px-6 py-3.5 text-base font-medium"
          >
            ${t('delivery.ctaButton')}
          </a>
        </div>
      </section>

    </div>
  </main>

  ${Footer()}
`
}
