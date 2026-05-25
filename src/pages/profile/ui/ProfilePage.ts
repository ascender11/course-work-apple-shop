import { userStore } from '@/entities/user'
import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'

import { html } from '@/shared/lib'
import { CartEmpty, ChevronRight, Heart, LogoutIcon } from '@/shared/ui/icons'

import { initProfile } from '../model/initProfile'

const SegmentedControl = (items: { value: string; label: string; active: boolean; attr: string }[]) => html`
  <div class="flex gap-1 rounded-lg bg-background-tertiary p-1">
    ${items
      .map(
        (item) => html`
      <button
        ${item.attr}="${item.value}"
        class="px-3 py-1 rounded-md text-xs font-medium transition-all duration-200 ${item.active ? 'bg-background shadow-sm text-text-primary' : 'text-text-quinary hover:text-text-secondary'}"
      >${item.label}</button>
    `
      )
      .join('')}
  </div>
`

const SettingsRow = (label: string, sublabel: string, control: string, border = true) => html`
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-5 py-4 ${border ? 'border-b border-border-light' : ''}">
    <div class="shrink-0">
      <span class="text-sm font-medium text-text-primary">${label}</span>
      ${sublabel ? html`<p class="text-xs text-text-quinary mt-0.5">${sublabel}</p>` : ''}
    </div>
    ${control}
  </div>
`

const NavRow = (href: string, icon: string, label: string, border = true) => html`
  <a
    href="${href}"
    data-navigo
    class="flex items-center justify-between px-5 py-4 hover:bg-background-secondary active:bg-background-tertiary transition-colors duration-150 cursor-pointer ${border ? 'border-b border-border-light' : ''}"
  >
    <div class="flex items-center gap-3">
      <div class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
        ${icon}
      </div>
      <span class="text-sm font-medium text-text-primary">${label}</span>
    </div>
    ${ChevronRight()}
  </a>
`

const SectionCard = (heading: string, content: string) => html`
  <div class="bg-background rounded-2xl border border-border-light shadow-card-sm overflow-hidden">
    <div class="px-5 py-3 border-b border-border-light">
      <h2 class="text-xs font-semibold text-text-quinary uppercase tracking-wider">${heading}</h2>
    </div>
    ${content}
  </div>
`

export const ProfilePage = (): string => {
  const observer = new MutationObserver((_, obs) => {
    if (!document.getElementById('profile-root')) return
    obs.disconnect()
    initProfile()
  })
  if (typeof window !== 'undefined') observer.observe(document.body, { childList: true, subtree: true })

  const user = userStore.getUser()
  if (!user) return html`${Header()}${Footer()}`

  const firstName = user.fullName.firstName || ''
  const lastName = user.fullName.lastName || ''
  const fullName = `${firstName} ${lastName}`.trim()
  const initials = (firstName[0] + lastName[0]).toUpperCase()

  return html`
    ${Header()}

    <main id="profile-root" class="min-h-[calc(100vh-56px)] bg-background-secondary py-8 px-4 sm:py-12">
      <div class="max-w-xl mx-auto flex flex-col gap-4">

        <div class="bg-background rounded-2xl border border-border-light shadow-card-sm p-8 flex flex-col items-center gap-3">
          <div class="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center select-none">
            <span class="text-2xl font-semibold text-primary">${initials}</span>
          </div>
          <div class="text-center">
            <h1 class="text-xl font-semibold text-text-primary">${fullName}</h1>
            <p class="text-sm text-text-quinary mt-0.5">${user.email}</p>
          </div>
        </div>

        ${SectionCard(
          'Навигация',
          NavRow('/favorites', Heart(), 'Избранное') + NavRow('/cart', CartEmpty(), 'Корзина', false)
        )}

        ${SectionCard(
          'Внешний вид',
          SettingsRow(
            'Тема',
            '',
            SegmentedControl([
              {
                value: 'light',
                label: 'Светлая',
                active: document.documentElement.classList.contains('dark') === false,
                attr: 'data-theme',
              },
              {
                value: 'dark',
                label: 'Тёмная',
                active: document.documentElement.classList.contains('dark') === true,
                attr: 'data-theme',
              },
            ])
          ) +
            SettingsRow(
              'Язык',
              'Скоро будет доступно',
              SegmentedControl([
                { value: 'ru', label: 'RU', active: true, attr: 'data-lang' },
                { value: 'en', label: 'EN', active: false, attr: 'data-lang' },
              ]),
              false
            )
        )}

        <button
          id="profile-logout-btn"
          class="w-full bg-background rounded-2xl border border-border-light shadow-card-sm px-5 py-4 flex items-center justify-center gap-2 text-error hover:bg-error/10 active:bg-error/20 transition-colors duration-200 cursor-pointer"
        >
          ${LogoutIcon()}
          <span class="text-sm font-medium">Выйти из аккаунта</span>
        </button>

      </div>
    </main>

    ${Footer()}
  `
}
