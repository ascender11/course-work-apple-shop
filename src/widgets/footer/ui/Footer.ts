import { t } from '@/shared/i18n'
import { cn, html } from '@/shared/lib'
import { Link } from '@/shared/ui/components'

export interface FooterProps {
  className?: string
}

export const Footer = ({ className = '' }: FooterProps = {}) => {
  const navLinks = [
    { href: '/', text: t('nav.home') },
    { href: '/catalog', text: t('nav.catalog') },
    { href: '/favorites', text: t('nav.favorites') },
    { href: '/cart', text: t('nav.cart') },
    { href: '/delivery', text: t('nav.delivery') },
  ]

  return html`
    <footer class="${cn('p-4 flex flex-col gap-5 lg:flex-row', className)}">
      <div class="w-full flex flex-col gap-2.5">
        <div class="flex gap-5">
          <img src="/logo.svg" alt="Logo" />
          <div class="flex flex-col gap-1 text-sm text-text-quinary">
            <p>${t('footer.copyright')}</p>
            <p>${t('footer.slogan')}</p>
          </div>
        </div>

        <p class="text-xs text-text-quinary">${t('footer.disclaimer')}</p>
      </div>

      <nav class="w-full">
        <ul class="flex flex-col gap-3.75">
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

      <div class="w-full flex flex-col gap-2.5 sm:gap-5 sm:max-lg:flex-row sm:max-lg:items-center">
        <p class="font-medium text-2xl">+7 812 704 86 97</p>
        <div class="flex flex-col text-text-quinary text-xs">
          <p>${t('footer.consultation')}</p>
          <p>${t('footer.hours')}</p>
        </div>
        <div class="flex gap-2.5">
          <img src="/footer/telegram-logo.svg" alt="Telegram" class="w-8"/>
          <img src="/footer/vk-logo.svg" alt="VK" class="w-8" />
          <img src="/footer/watsapp-logo.svg" alt="WhatsApp" class="w-8" />
        </div>
      </div>
    </footer>
  `
}
