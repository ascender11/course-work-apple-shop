import type { Product } from '@/entities/product'
import { ProductAvailability } from '@/entities/product'

import { cn, html } from '@/shared/lib'
import { Button, Link } from '@/shared/ui/components'
import { Heart, Rings, Star } from '@/shared/ui/icons'
import { AddToCart } from '@/shared/ui/icons/AddToCart'

export interface ProductCardProps {
  product: Product
  className?: string
}

export const ProductCard = ({ product, className = '' }: ProductCardProps) => {
  const isInStock = product.availability === ProductAvailability.IN_STOCK

  const renderRatingStars = () => {
    const score = Math.floor(product.rating.score)

    return Array.from({ length: 5 })
      .map(
        (_, i) => html`
        ${Star({ className: i < score ? 'text-amber-400' : '' })}
      `
      )
      .join('')
  }

  const renderAvailabilityStatus = () => {
    const statusText = isInStock ? 'Есть в наличии' : 'Ожидается поступление'
    const warranty = isInStock && product.warrantyPeriod ? html`<span>${product.warrantyPeriod}</span>` : ''

    return html`
      <div class="flex items-center gap-1.25 text-text-quinary w-full">
        <span class="${cn('w-4 h-4 rounded-full inline-block', isInStock ? 'bg-green-500' : 'bg-blue-500')}"></span>
        <span class="flex justify-between w-full">
          <span>${statusText}</span>
          ${warranty}
        </span>
      </div>
    `
  }

  const renderPriceOrNotification = () => {
    if (!isInStock) {
      return html`
        <p class="text-sm text-text-quinary">
          Мы можем сообщить вам, когда товар появится в наличии
        </p>
      `
    }

    const oldPrice = product.price.old
      ? html`<span class="text-xl text-text-quinary line-through">${product.price.old.toLocaleString()} ₽</span>`
      : ''

    return html`
      <div class="${cn('text-xl text-center', oldPrice && 'flex items-center gap-4')}">
        ${oldPrice}
        <span class="text-3xl font-medium text-text-primary">${product.price.current.toLocaleString()} ₽</span>
      </div>
    `
  }

  const renderActions = () => {
    if (!isInStock) {
      return html`
        <div class="w-full mt-1">
          ${Button({
            text: 'Сообщить о поступлении',
            variant: 'outline',
          })}
        </div>
      `
    }

    return html`
      <div class="flex flex-col gap-2.5 w-full mt-1">
        ${Button({
          icon: AddToCart(),
          text: 'В корзину',
        })}
        
        <div class="flex justify-between w-full px-0.5">
          ${Link({ text: 'Хочу дешевле', href: '#', className: 'text-primary' })}
          ${Link({ text: 'Купить в 1 клик', href: '#', className: 'text-text-quinary' })}
        </div>
      </div>
    `
  }

  return html`
    <div class="${cn('flex flex-col shadow-[0_4px_8px_0_rgba(0,0,0,0.05)] gap-3.75 items-center w-full max-w-70 px-1.75 py-3.5 bg-background rounded-2xl', className)}">
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center gap-1">
          <div class="flex gap-px text-amber-400">
             ${renderRatingStars()}
          </div>
          <span class="text-primary">(${product.rating.reviewsCount})</span>
        </div>

        <div class="flex items-center gap-1.25 text-gray-400">
          <button>
            ${Heart()}
          </button>
          <button>
            ${Rings()}
          </button>
        </div>
      </div>

      <h3 class="font-medium text-2xl text-text-primary text-center w-full">
        ${product.title}
      </h3>

      <div class="flex justify-center items-center h-50 mb-4">
        <img src="${product.imageUrl}" alt="${product.title}" class="max-h-full object-contain" loading="lazy" />
      </div>

      ${renderAvailabilityStatus()}
      ${renderPriceOrNotification()}
      ${renderActions()}
    </div>
  `
}
