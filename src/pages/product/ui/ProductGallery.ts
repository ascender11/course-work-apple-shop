import { cn, html } from '@/shared/lib'

export interface ProductGalleryProps {
  images: string[]
  title: string
}

export const ProductGallery = ({ images, title }: ProductGalleryProps): string => {
  const mainImage = images[0]

  const thumbnails = images
    .map(
      (src, i) => html`
        <button
          class="${cn(
            'rounded-xl border-2 overflow-hidden w-17 h-17 lg:w-24 lg:h-24 shrink-0 transition-all duration-150 cursor-pointer hover:border-secondary',
            i === 0 ? 'border-primary' : 'border-transparent'
          )}"
          data-gallery-thumb="${i}"
          aria-label="Фото ${i + 1}"
        >
          <img
            src="${src}"
            alt="${title} — фото ${i + 1}"
            class="w-full h-full object-contain p-1"
            loading="lazy"
          />
        </button>
      `
    )
    .join('')

  return html`
    <div class="flex flex-col gap-4">
      <div class="flex items-center justify-center rounded-2xl overflow-hidden h-64 sm:h-80 lg:h-100">
        <img
          id="product-gallery-main-img"
          src="${mainImage}"
          alt="${title}"
          class="w-full h-full object-contain transition-opacity duration-200"
          loading="eager"
        />
      </div>
      ${images.length > 1 ? html`<div class="flex gap-1.25 flex-wrap">${thumbnails}</div>` : ''}
    </div>
  `
}
