import { Header } from '@/widgets/header'

import { t } from '@/shared/i18n'
import { html } from '@/shared/lib'
import { Button } from '@/shared/ui/components'

export const NotFoundPage = (): string => {
  return html`
    ${Header()}
    <main class="flex flex-col items-center text-center py-12.5 px-4">
      <div class="max-w-80 mx-auto md:max-w-none flex flex-col items-center gap-10">
        <h1 class="text-3xl font-bold">${t('notFound.title')}</h1>
        <p class="text-lg text-text-secondary">${t('notFound.message')}</p>
        ${Button({ text: t('notFound.back'), href: '/' })}
        <img src="/not-found/phone-404.png" alt="404" class="w-48 sm:w-auto" />
      </div>
    </main>
  `
}
