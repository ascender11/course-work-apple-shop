import { Header } from '@/widgets/header'

import { html } from '@/shared/lib'

import { Advantages } from '../sections/advantages'
import { Banner } from '../sections/banner'
import { HomeSlider } from '../sections/home-slider'
import { NewProducts } from '../sections/new-products'
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
      ${NewProducts()}
      ${Advantages()}
    </main>
  `
}
