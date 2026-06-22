import { t } from '@/shared/i18n'
import { cn, getColorScheme, html } from '@/shared/lib'

export const ColorSchemeToggle = (): string => {
  const current = getColorScheme()
  const base = 'px-3 py-1 rounded-md text-xs font-medium transition-all duration-200'
  const active = 'bg-background shadow-sm text-text-primary'
  const inactive = 'text-text-quinary hover:text-text-secondary'

  return html`
    <div class="flex flex-wrap gap-1 rounded-lg bg-background-tertiary p-1">
      <button
        data-color-scheme="default"
        aria-label="${t('accessibility.colorScheme.default')}"
        class="${cn(base, current === 'default' ? active : inactive)}"
      >${t('accessibility.colorScheme.default')}</button>
      <button
        data-color-scheme="black-white"
        aria-label="${t('accessibility.colorScheme.black-white')}"
        class="${cn(base, current === 'black-white' ? active : inactive)}"
      >${t('accessibility.colorScheme.black-white')}</button>
      <button
        data-color-scheme="black-green"
        aria-label="${t('accessibility.colorScheme.black-green')}"
        class="${cn(base, current === 'black-green' ? active : inactive)}"
      >${t('accessibility.colorScheme.black-green')}</button>
      <button
        data-color-scheme="white-black"
        aria-label="${t('accessibility.colorScheme.white-black')}"
        class="${cn(base, current === 'white-black' ? active : inactive)}"
      >${t('accessibility.colorScheme.white-black')}</button>
      <button
        data-color-scheme="beige-brown"
        aria-label="${t('accessibility.colorScheme.beige-brown')}"
        class="${cn(base, current === 'beige-brown' ? active : inactive)}"
      >${t('accessibility.colorScheme.beige-brown')}</button>
      <button
        data-color-scheme="blue-darkblue"
        aria-label="${t('accessibility.colorScheme.blue-darkblue')}"
        class="${cn(base, current === 'blue-darkblue' ? active : inactive)}"
      >${t('accessibility.colorScheme.blue-darkblue')}</button>
    </div>
  `
}
