import { getHideImages, html } from '@/shared/lib'

export const ImagesToggle = (): string => {
  const isActive = getHideImages()

  return html`
    <button
      data-images-toggle
      data-active="${String(isActive)}"
      aria-pressed="${String(isActive)}"
      class="relative inline-flex h-6 w-11 shrink-0 items-center rounded-full bg-background-tertiary transition-colors duration-300 focus:outline-none data-[active=true]:bg-primary"
    >
      <span data-active="${String(isActive)}" class="inline-block h-4 w-4 rounded-full bg-background shadow-sm transition-transform duration-300 data-[active=true]:translate-x-6 translate-x-1"></span>
    </button>
  `
}
