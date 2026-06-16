import { cn, html } from '@/shared/lib'

import { AdvantageCard, type AdvantageCardProps } from './AdvantageCard'

export interface AdvantagesProps {
  className?: string
}

export const Advantages = ({ className = '' }: AdvantagesProps = {}) => {
  const advantages: AdvantageCardProps[] = [
    {
      icon: '/home/discount-emoji.png',
      title: 'Акции и подарки',
      description: 'Постоянные акции, бонусы и скидки. Покупайте технику Apple по самым выгодным ценам',
      gradient: 'linear-gradient(180deg, #FE94A6 0%, #F2F2F2 100%)',
    },
    {
      icon: '/home/wallet-emoji.png',
      title: 'Удобные способы оплаты',
      description: 'Наличными или картой при получении, оплата на сайте или в кредит',
      gradient: 'linear-gradient(180deg, #7DE9FF 0%, #F2F2F2 100%)',
    },
    {
      icon: '/home/delivery-emoji.png',
      title: 'Доставим за 3 часа',
      description:
        'Быстрая и бесплатная доставка по Москве. Доставим за 3 часа в день заказа. Также доступна быстрая доставка по всей России или самовывоз',
      gradient: 'linear-gradient(180deg, #E685FF 0%, #F2F2F2 100%)',
    },
    {
      icon: '/home/bank-emoji.png',
      title: 'Покупка в кредит',
      description: 'Получите самое выгодное кредитное предложение от более чем 30 ведущих банков страны',
      gradient: 'linear-gradient(180deg, #FFE685 0%, #F2F2F2 100%)',
    },
    {
      icon: '/home/approval-emoji.png',
      title: 'Гарантия',
      description: 'Все товары, представленные в нашем сайте, имеют гарантию от нашего магазина или компании Apple',
      gradient: 'linear-gradient(180deg, #52D116 0%, #F2F2F2 100%)',
    },
  ]

  return html`
    <section class="${cn('flex flex-col py-6 px-4 gap-5', className)}">
      <h1 class="w-full text-2xl md:text-3xl lg:text-6xl lg:text-center">Наши преимущества</h1>
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-5 items-stretch">
        ${advantages.map((advantage) => AdvantageCard(advantage)).join('')}
      </div>
    </section>
  `
}
