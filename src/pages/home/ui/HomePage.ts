import { Header } from '@/widgets/header'

import { html } from '@/shared/lib'

import { Banner } from '../sections/banner'
import { HomeSlider } from '../sections/home-slider'
import { PopularProducts } from '../sections/popular-products'

export const HomePage = (): string => {
  return html`
  ${Header()}
    <main>
      <section>
        ${HomeSlider()}
      </section>
      ${PopularProducts()}
      ${Banner()}
    </main>
  `
}
