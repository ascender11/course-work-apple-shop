import { t } from '@/shared/i18n'
import { cn, getFontSize, html } from '@/shared/lib'

export const FontSizeToggle = (): string => {
  const current = getFontSize()
  const base = 'px-3 py-1 rounded-md text-xs font-medium transition-all duration-200'
  const active = 'bg-background shadow-sm text-text-primary'
  const inactive = 'text-text-quinary hover:text-text-secondary'

  return html`
    <div class="flex gap-1 rounded-lg bg-background-tertiary p-1">
      <button
        data-font-size="normal"
        aria-label="${t('accessibility.fontSize.normal')}"
        class="${cn(base, current === 'normal' ? active : inactive)}"
      >${t('accessibility.fontSize.normal')}</button>
      <button
        data-font-size="large"
        aria-label="${t('accessibility.fontSize.large')}"
        class="${cn(base, current === 'large' ? active : inactive)}"
      >${t('accessibility.fontSize.large')}</button>
      <button
        data-font-size="xlarge"
        aria-label="${t('accessibility.fontSize.xlarge')}"
        class="${cn(base, current === 'xlarge' ? active : inactive)}"
      >${t('accessibility.fontSize.xlarge')}</button>
    </div>
  `
}
