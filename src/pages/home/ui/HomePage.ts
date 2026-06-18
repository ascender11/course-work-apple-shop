import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'

import { html } from '@/shared/lib'

import { Advantages } from './Advantages'
import { Banner } from './Banner'
import { CtaBanner } from './CtaBanner'
import { HomeSlider } from './HomeSlider'
import { NewProducts } from './NewProducts'
import { PopularProducts } from './PopularProducts'

export const HomePage = (): string => {
  return html`
    <div id="home-root">
      ${Header()}
      <main>
        <section>
          ${HomeSlider()}
        </section>
        ${PopularProducts()}
        ${Banner()}
        ${NewProducts()}
        ${Advantages()}
        ${CtaBanner()}
        ${Footer()}
      </main>
    </div>
  `
}
