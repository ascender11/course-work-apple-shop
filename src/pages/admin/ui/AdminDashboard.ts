import { UserRole, userStore } from '@/entities/user'
import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'

import { html } from '@/shared/lib'
import { Chat, Package } from '@/shared/ui/icons'

const AdminLink = (href: string, title: string, description: string, icon: string) => html`
  <a
    href="${href}"
    data-navigo
    class="block p-6 rounded-2xl bg-background border border-border-light hover:border-primary/30 hover:shadow-md transition-all duration-200 group"
  >
    <div class="flex items-center gap-4">
      <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
        ${icon}
      </div>
      <div>
        <h3 class="text-base font-semibold text-text-primary">${title}</h3>
        <p class="text-sm text-text-quinary mt-0.5">${description}</p>
      </div>
    </div>
  </a>
`

export const AdminDashboard = (): string => {
  if (!userStore.hasRole(UserRole.ADMIN)) {
    return html`
      ${Header()}
      <main class="min-h-[calc(100vh-60px)] bg-background-secondary flex items-center justify-center px-4 py-8">
        <div class="text-center">
          <h1 class="text-2xl font-semibold text-text-primary mb-2">Доступ запрещён</h1>
          <p class="text-sm text-text-quinary">У вас нет прав администратора</p>
        </div>
      </main>
      ${Footer()}
    `
  }

  return html`
    ${Header()}
    <main class="min-h-[calc(100vh-60px)] bg-background-secondary px-4 py-8 sm:px-6 lg:px-25">
      <div class="max-w-3xl mx-auto">
        <div class="mb-8">
          <h1 class="text-2xl font-semibold text-text-primary">Панель администратора</h1>
          <p class="text-sm text-text-quinary mt-1">Управление товарами и отзывами</p>
        </div>

        <div class="flex flex-col gap-4">
          ${AdminLink(
            '/admin/products',
            'Управление товарами',
            'Добавление, редактирование и удаление товаров',
            Package({ className: 'w-6 h-6 text-primary' })
          )}
          ${AdminLink(
            '/admin/reviews',
            'Управление отзывами',
            'Просмотр и удаление отзывов по товарам и пользователям',
            Chat({ className: 'w-6 h-6 text-primary' })
          )}
        </div>

        <a
          href="/profile"
          data-navigo
          class="inline-flex items-center gap-2 mt-8 px-4 py-2 text-sm font-medium text-text-quinary hover:text-text-primary transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
          Назад в профиль
        </a>
      </div>
    </main>
    ${Footer()}
  `
}
