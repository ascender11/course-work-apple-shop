import type { ProductSpecificationGroup } from '@/entities/product'

import { html } from '@/shared/lib'

export interface SpecificationsSectionProps {
  specifications: ProductSpecificationGroup[]
}

export const SpecificationsSection = ({ specifications }: SpecificationsSectionProps): string => {
  if (!specifications || specifications.length === 0) return ''

  const groups = specifications
    .map(
      (group) => html`
        <div class="flex flex-col gap-3">
          <h3 class="text-base font-semibold text-text-primary pb-2 border-b border-border">
            ${group.groupName}
          </h3>
          <dl class="flex flex-col">
            ${group.specs
              .map(
                (spec) => html`
                  <div class="flex flex-col py-2 border-b border-border-light last:border-0">
                    <dt class="text-xs text-text-quinary">${spec.name}</dt>
                    <dd class="text-sm font-medium text-text-primary mt-0.5">${spec.value}</dd>
                  </div>
                `
              )
              .join('')}
          </dl>
        </div>
      `
    )
    .join('')

  return html`
    <section id="specifications" class="py-10 mt-8">
      <div>
        <h2 class="text-2xl font-semibold text-text-primary mb-8 lg:text-3xl">Характеристики</h2>
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          ${groups}
        </div>
      </div>
    </section>
  `
}
