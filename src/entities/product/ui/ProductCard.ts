import type { Product } from '@/entities/product'
import { ProductAvailability } from '@/entities/product'
import { AddToCartButton } from '@/features/add-to-cart'

import { cn, html } from '@/shared/lib'
import { Button, Link } from '@/shared/ui/components'
import { Heart, Rings, Star } from '@/shared/ui/icons'

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
        <span class="${cn('w-4 h-4 rounded-full inline-block', isInStock ? 'bg-success' : 'bg-primary')}"></span>
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
        ${AddToCartButton({ productId: product.id })}
        
        <div class="flex justify-between w-full px-0.5">
          ${Link({ text: 'Хочу дешевле', href: '#', className: 'text-primary' })}
          ${Link({ text: 'Купить в 1 клик', href: '#', className: 'text-text-quinary' })}
        </div>
      </div>
    `
  }

  return html`
    <div data-product-card class="${cn('flex flex-col shadow-card gap-3.75 items-center w-full max-w-70 px-1.75 py-3.5 bg-background rounded-2xl dark:bg-background-secondary', className)}">
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center gap-1">
          <div class="flex gap-px">
             ${renderRatingStars()}
          </div>
          <span class="text-primary">(${product.rating.reviewsCount})</span>
        </div>

        <div class="flex items-center gap-1.25">
          <button
            class="js-fav-btn flex items-center justify-center w-8 h-8 rounded-full transition-transform duration-150 hover:scale-110 active:scale-95"
            data-product-id="${product.id}"
            data-favorite-id=""
            aria-label="Добавить в избранное"
            type="button"
          >
            ${Heart()}
          </button>
          <button class="flex items-center justify-center w-8 h-8 text-text-quinary hover:text-primary transition-colors">
            ${Rings()}
          </button>
        </div>
      </div>

      <a href="/product/${product.id}" data-navigo class="font-medium text-2xl text-text-primary text-center w-full hover:text-primary transition-colors">
        ${product.title}
      </a>

      <a href="/product/${product.id}" data-navigo class="flex justify-center items-center h-50 mb-4">
        <img src="${product.images[0]}" alt="${product.title}" class="max-h-full object-contain" loading="lazy" />
      </a>

      ${renderAvailabilityStatus()}
      ${renderPriceOrNotification()}
      ${renderActions()}
    </div>
  `
}
