import { t } from '@/shared/i18n'
import { cn, html } from '@/shared/lib'

import { AdvantageCard, type AdvantageCardProps } from './AdvantageCard'

export interface AdvantagesProps {
  className?: string
}

export const Advantages = ({ className = '' }: AdvantagesProps = {}) => {
  const advantages: AdvantageCardProps[] = [
    {
      icon: '/home/discount-emoji.png',
      title: t('home.adv.promo'),
      description: t('home.adv.promoDesc'),
      gradient: 'linear-gradient(180deg, #FE94A6 0%, #F2F2F2 100%)',
    },
    {
      icon: '/home/wallet-emoji.png',
      title: t('home.adv.payment'),
      description: t('home.adv.paymentDesc'),
      gradient: 'linear-gradient(180deg, #7DE9FF 0%, #F2F2F2 100%)',
    },
    {
      icon: '/home/delivery-emoji.png',
      title: t('home.adv.delivery'),
      description: t('home.adv.deliveryDesc'),
      gradient: 'linear-gradient(180deg, #E685FF 0%, #F2F2F2 100%)',
    },
    {
      icon: '/home/bank-emoji.png',
      title: t('home.adv.credit'),
      description: t('home.adv.creditDesc'),
      gradient: 'linear-gradient(180deg, #FFE685 0%, #F2F2F2 100%)',
    },
    {
      icon: '/home/approval-emoji.png',
      title: t('home.adv.warranty'),
      description: t('home.adv.warrantyDesc'),
      gradient: 'linear-gradient(180deg, #52D116 0%, #F2F2F2 100%)',
    },
  ]

  return html`
    <section class="${cn('flex flex-col py-6 px-4 gap-5', className)}">
      <h1 class="w-full text-2xl md:text-3xl lg:text-6xl lg:text-center">${t('home.advantages.title')}</h1>
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-5 items-stretch">
        ${advantages.map((advantage) => AdvantageCard(advantage)).join('')}
      </div>
    </section>
  `
}
