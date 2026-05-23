import { Header } from '@/widgets/header'

import { html } from '@/shared/lib'
import { Button } from '@/shared/ui/components'

export const NotFoundPage = (): string => {
  return html`
    ${Header()}
    <main class="flex flex-col items-center text-center py-12.5">
      <div class="max-w-80 mx-auto md:max-w-none flex flex-col items-center gap-10">
        <h1 class="text-3xl font-bold">Ошибка 404</h1>
        <p class="text-lg text-text-secondary">Кажется, такой страницы больше не существует.</p>
        ${Button({ text: 'Вернуться на главную', href: '/' })}
        <img src="/assets/phone-404.png" alt="404" />
      </div>
    </main>
  `
}
