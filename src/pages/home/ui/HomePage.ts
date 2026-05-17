import { Header } from '@/widgets/header'

import { html } from '@/shared/lib'

import { HomeSlider } from '../sections/home-slider'

export const HomePage = (): string => {
  return html`
  ${Header()}
    <main>
      <section>
        ${HomeSlider()}
      </section>
    </main>
  `
}
