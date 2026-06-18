import { getLanguage } from '@/shared/i18n'
import { cn, html } from '@/shared/lib'

export const LanguageToggle = (): string => {
  const currentLang = getLanguage()
  const base = 'px-3 py-1 rounded-md text-xs font-medium transition-all duration-200'

  return html`
    <div class="flex gap-1 rounded-lg bg-background-tertiary p-1">
      <button
        data-lang="ru"
        aria-label="Русский язык"
        class="${cn(base, currentLang === 'ru' ? 'bg-background shadow-sm text-text-primary' : 'text-text-quinary hover:text-text-secondary')}"
      >RU</button>
      <button
        data-lang="en"
        aria-label="English language"
        class="${cn(base, currentLang === 'en' ? 'bg-background shadow-sm text-text-primary' : 'text-text-quinary hover:text-text-secondary')}"
      >EN</button>
    </div>
  `
}
