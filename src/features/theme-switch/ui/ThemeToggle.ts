import { t } from '@/shared/i18n'
import { cn, getTheme, html } from '@/shared/lib'

export const ThemeToggle = (): string => {
  const currentTheme = getTheme()
  const base = 'px-3 py-1 rounded-md text-xs font-medium transition-all duration-200'

  return html`
    <div class="flex gap-1 rounded-lg bg-background-tertiary p-1">
      <button
        data-theme="light"
        aria-label="${t('theme.lightAria')}"
        class="${cn(base, currentTheme === 'light' ? 'bg-background shadow-sm text-text-primary' : 'text-text-quinary hover:text-text-secondary')}"
      >${t('theme.light')}</button>
      <button
        data-theme="dark"
        aria-label="${t('theme.darkAria')}"
        class="${cn(base, currentTheme === 'dark' ? 'bg-background shadow-sm text-text-primary' : 'text-text-quinary hover:text-text-secondary')}"
      >${t('theme.dark')}</button>
    </div>
  `
}
