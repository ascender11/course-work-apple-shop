import type { ProductSpecificationGroup } from '@/entities/product'

import { html } from '@/shared/lib'

export interface ShortPropertiesProps {
  specifications?: ProductSpecificationGroup[]
}

export const ShortProperties = ({ specifications }: ShortPropertiesProps): string => {
  if (!specifications || specifications.length === 0) return ''

  const firstGroup = specifications[0]
  const visibleSpecs = firstGroup.specs.slice(0, 7)

  const rows = visibleSpecs
    .map(
      (spec) => html`
        <li class="flex flex-col py-1.5 border-b border-border-light last:border-0 lg:flex-row lg:justify-between lg:items-baseline">
          <span class="text-sm text-text-quinary">${spec.name}</span>
          <span class="text-sm font-medium text-text-primary">${spec.value}</span>
        </li>
      `
    )
    .join('')

  return html`
    <div class="flex flex-col gap-3 w-full">
      <p class="text-sm font-medium text-text-secondary">Характеристики</p>
      <ul class="flex flex-col divide-y-0">${rows}</ul>
      <a href="#specifications" class="text-sm text-primary hover:text-secondary transition-colors duration-150 self-start">
        Смотреть все характеристики
      </a>
    </div>
  `
}
