import { userStore } from '@/entities/user'

import { cn, html } from '@/shared/lib'
import { Link } from '@/shared/ui/components'
import { BurgerMenu, Logo, Phone, User } from '@/shared/ui/icons'

import { initHeader } from '../model/header.init'

export interface HeaderProps {
  className?: string
}

export const Header = ({ className = '' }: HeaderProps = {}) => {
  const init = () => {
    const observer = new MutationObserver((_, obs) => {
      const element = document.getElementById('dropdown-menu-button')
      if (element) {
        obs.disconnect()
        initHeader()
      }
    })

    observer.observe(document.body, { childList: true, subtree: true })
  }

  if (typeof window !== 'undefined') {
    init()
  }

  const navLinks = [
    { href: '/', text: 'Главная' },
    { href: '/catalog', text: 'Каталог' },
    { href: '/favorites', text: 'Избранное' },
    { href: '/cart', text: 'Корзина' },
    { href: '/delivery', text: 'Доставка и оплата' },
    { href: '/contact', text: 'Контакты' },
  ]

  return html`
    <div class="relative">
      <header class="${cn('relative z-20 flex flex-row justify-between px-4 py-1 bg-background md:px-6 md:py-2 lg:px-25 lg:py-2.5', className)}">
        ${Logo()}

        <nav class="flex items-center">
          <ul class="hidden gap-7.5 flex-row lg:flex">
            ${navLinks
              .map(
                (link) => html`
                  <li>
                    ${Link({
                      text: link.text,
                      href: link.href,
                    })}
                  </li>
                `
              )
              .join('')}
          </ul>
        </nav>

        <div class="flex flex-row items-center gap-4">
          <div class="flex gap-1.25">
            ${Phone()}
            +7 812 561 96 62
          </div>
          ${userStore.isLoggedIn()
            ? html`<button
                id="header-profile-btn"
                aria-label="Профиль"
                class="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-150"
              >${User()}</button>`
            : ''}
          <button id="dropdown-menu-button" class="h-6 w-6 focus:outline-none lg:hidden">
            ${BurgerMenu()}
          </button>
        </div>
      </header>
      
      <div id="menu-overlay" class="fixed inset-0 transition-all duration-300 opacity-0 invisible z-15"></div>
      
      <nav 
        id="mobile-menu" 
        class="absolute left-0 w-full bg-background shadow-lg rounded-b-2xl transform transition-transform duration-300 -translate-y-full z-15"
      >
        <ul class="flex flex-col gap-1.5 p-6">
          ${navLinks
            .map(
              (link) => html`
                <li>
                  ${Link({
                    text: link.text,
                    href: link.href,
                  })}
                </li>
              `
            )
            .join('')}
        </ul>
      </nav>
    </div>
  `
}
