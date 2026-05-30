import { html } from '@/shared/lib'
import { EyeOpen } from '@/shared/ui/icons'

const INPUT_BASE =
  'w-full rounded-lg border border-border px-4 py-3 text-sm text-text-primary bg-background outline-none transition-all duration-200 hover:border-border focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-text-quinary'

export const LoginForm = () => html`
  <form id="login-form" novalidate class="flex flex-col gap-4">

    <div class="flex flex-col gap-1">
      <label for="login-email" class="text-sm font-medium text-text-secondary">
        Email<span class="text-error ml-0.5">*</span>
      </label>
      <input
        id="login-email"
        name="email"
        type="email"
        placeholder="your@email.ru"
        autocomplete="email"
        class="${INPUT_BASE}"
      />
      <span data-error="login-email" class="text-xs text-error min-h-4 block"></span>
    </div>

    <div class="flex flex-col gap-1">
      <label for="login-password" class="text-sm font-medium text-text-secondary">
        Пароль<span class="text-error ml-0.5">*</span>
      </label>
      <div class="relative">
        <input
          id="login-password"
          name="password"
          type="password"
          placeholder="Введите пароль"
          autocomplete="current-password"
          class="${INPUT_BASE} pr-11"
        />
        <button
          id="toggle-login-pass"
          type="button"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-text-quinary hover:text-text-secondary transition-colors duration-150 cursor-pointer"
          aria-label="Показать пароль"
        >
          ${EyeOpen()}
        </button>
      </div>
      <span data-error="login-password" class="text-xs text-error min-h-4 block"></span>
    </div>

    <p id="login-server-error" class="text-sm text-error text-center min-h-5"></p>

    <button
      id="login-submit"
      type="submit"
      disabled
      class="button flex items-center justify-center w-full mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Войти
    </button>

  </form>
`
