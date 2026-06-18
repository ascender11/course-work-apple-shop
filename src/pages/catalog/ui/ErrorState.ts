import { html } from '@/shared/lib'

export const ErrorState = (message: string) => html`
  <p class="py-16 text-center text-error">Ошибка загрузки: ${message}</p>
`
