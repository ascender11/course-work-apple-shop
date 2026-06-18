import { t } from '@/shared/i18n'
import { html } from '@/shared/lib'
import { EyeOpen } from '@/shared/ui/icons'

const INPUT_BASE =
  'w-full rounded-lg border border-border px-4 py-3 text-sm text-text-primary bg-background outline-none transition-all duration-200 hover:border-border focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-text-quinary'

const REQUIRED_MARK = '<span class="text-error ml-0.5">*</span>'

export const RegisterForm = () => html`
  <form id="register-form" novalidate class="flex flex-col gap-5">

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div class="flex flex-col gap-0.5">
        <label class="text-sm font-medium text-text-secondary">
          ${t('auth.register.lastName')}${REQUIRED_MARK}
        </label>
        <input
          id="reg-lastname"
          name="lastName"
          type="text"
          placeholder="Иванов"
          autocomplete="family-name"
          class="${INPUT_BASE}"
        />
        <span data-error="reg-lastname" class="text-xs text-error min-h-3.5 block"></span>
      </div>

      <div class="flex flex-col gap-0.5">
        <label class="text-sm font-medium text-text-secondary">
          ${t('auth.register.firstName')}${REQUIRED_MARK}
        </label>
        <input
          id="reg-firstname"
          name="firstName"
          type="text"
          placeholder="Иван"
          autocomplete="given-name"
          class="${INPUT_BASE}"
        />
        <span data-error="reg-firstname" class="text-xs text-error min-h-3.5 block"></span>
      </div>

      <div class="flex flex-col gap-0.5">
        <label class="text-sm font-medium text-text-secondary">${t('auth.register.patronymic')}</label>
        <input
          id="reg-patronymic"
          name="patronymic"
          type="text"
          placeholder="Иванович"
          autocomplete="additional-name"
          class="${INPUT_BASE}"
        />
        <span data-error="reg-patronymic" class="text-xs text-error min-h-3.5 block"></span>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div class="flex flex-col gap-0.5">
        <label class="text-sm font-medium text-text-secondary">
          ${t('auth.register.phone')}${REQUIRED_MARK}
        </label>
        <input
          id="reg-phone"
          name="phone"
          type="tel"
          placeholder="+375 29 123 45 67"
          autocomplete="tel"
          class="${INPUT_BASE}"
        />
        <span data-error="reg-phone" class="text-xs text-error min-h-3.5 block"></span>
        <p class="text-xs text-text-quinary mt-0.5">${t('auth.register.phoneHint')}</p>
      </div>

      <div class="flex flex-col gap-0.5">
        <label class="text-sm font-medium text-text-secondary">
          ${t('auth.register.email')}${REQUIRED_MARK}
        </label>
        <input
          id="reg-email"
          name="email"
          type="email"
          placeholder="your@email.ru"
          autocomplete="email"
          class="${INPUT_BASE}"
        />
        <span data-error="reg-email" class="text-xs text-error min-h-3.5 block"></span>
      </div>
    </div>

    <div class="flex flex-col gap-0.5">
      <label class="text-sm font-medium text-text-secondary">
        ${t('auth.register.birthDate')}${REQUIRED_MARK}
      </label>
      <input
        id="reg-birthdate"
        name="birthDate"
        type="date"
        class="${INPUT_BASE}"
      />
      <span data-error="reg-birthdate" class="text-xs text-error min-h-3.5 block"></span>
      <p class="text-xs text-text-quinary mt-0.5">${t('auth.register.birthDateHint')}</p>
    </div>

    <div class="flex flex-col gap-0.5">
      <label class="text-sm font-medium text-text-secondary">
        ${t('auth.register.nickname')}${REQUIRED_MARK}
      </label>
      <div class="flex gap-2">
        <input
          id="reg-nickname"
          name="nickname"
          type="text"
          placeholder="nickname"
          autocomplete="username"
          class="${INPUT_BASE} flex-1"
          readonly
        />
        <button
          id="generate-nickname"
          type="button"
          class="px-4 py-3 text-sm font-medium text-primary border border-border rounded-lg hover:bg-background-secondary transition-colors shrink-0 whitespace-nowrap"
        >
          ${t('auth.register.generate')}
        </button>
      </div>
      <span data-error="reg-nickname" class="text-xs text-error min-h-3.5 block"></span>
      <p id="nickname-hint" class="text-xs text-text-quinary mt-0.5 hidden">
        ${t('auth.register.nicknameLimit')}
      </p>
    </div>

    <div class="flex flex-col gap-0.5">
      <label class="text-sm font-medium text-text-secondary">
        ${t('auth.register.password')}${REQUIRED_MARK}
      </label>

      <div class="flex gap-4 mb-2">
        <label class="flex items-center gap-2 cursor-pointer">
          <input type="radio" name="password-mode" value="manual" checked class="radio" />
          <span class="text-sm text-text-secondary">${t('auth.register.passwordManual')}</span>
        </label>
        <label class="flex items-center gap-2 cursor-pointer">
          <input type="radio" name="password-mode" value="auto" class="radio" />
          <span class="text-sm text-text-secondary">${t('auth.register.passwordAuto')}</span>
        </label>
      </div>

      <div id="manual-password-fields">
        <div class="relative">
          <input
            id="reg-password"
            name="password"
            type="password"
            placeholder="${t('auth.register.passwordPlaceholder')}"
            autocomplete="new-password"
            class="${INPUT_BASE} pr-11"
          />
          <button
            id="toggle-reg-pass"
            type="button"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-text-quinary hover:text-text-secondary"
            aria-label="${t('auth.login.showPassword')}"
          >
            ${EyeOpen()}
          </button>
        </div>
        <div class="flex items-center gap-3 mt-2">
          <div class="flex-1 h-1.5 bg-background-tertiary rounded-full overflow-hidden">
            <div id="strength-bar" class="h-full rounded-full transition-all duration-300 w-0 bg-background-tertiary"></div>
          </div>
          <span id="strength-label" class="text-xs font-medium w-14 text-right text-text-quinary"></span>
        </div>
        <span data-error="reg-password" class="text-xs text-error min-h-3.5 block"></span>

        <div class="relative mt-3">
          <input
            id="reg-confirm"
            name="confirmPassword"
            type="password"
            placeholder="${t('auth.register.confirmPassword')}"
            autocomplete="new-password"
            class="${INPUT_BASE} pr-11"
          />
          <button
            id="toggle-reg-confirm"
            type="button"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-text-quinary hover:text-text-secondary"
            aria-label="${t('auth.login.showPassword')}"
          >
            ${EyeOpen()}
          </button>
        </div>
        <span data-error="reg-confirm" class="text-xs text-error min-h-3.5 block"></span>
      </div>

      <div id="auto-password-fields" class="hidden">
        <div class="relative">
          <input
            id="reg-auto-password"
            name="autoPassword"
            type="text"
            readonly
            class="${INPUT_BASE} bg-background-secondary"
          />
          <button
            id="regenerate-password"
            type="button"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:text-secondary text-sm"
          >
            ${t('auth.register.generateNew')}
          </button>
        </div>
        <span data-error="reg-auto-password" class="text-xs text-error min-h-3.5 block"></span>
      </div>

      <p class="text-xs text-text-quinary mt-1">
        ${t('auth.register.passwordHint')}
      </p>
    </div>

    <label class="flex items-center gap-2 cursor-pointer">
      <input
        id="reg-agreement"
        type="checkbox"
        class="checkbox shrink-0"
      />
      <span class="text-sm text-text-secondary">
        ${t('auth.register.agreement')}
        <a href="/agreement" data-navigo class="text-primary hover:text-secondary transition-colors">
          ${t('auth.register.agreementLink')}
        </a>
        ${REQUIRED_MARK}
      </span>
    </label>
    <span data-error="reg-agreement" class="text-xs text-error -mt-2 block"></span>

    <p id="reg-server-error" class="text-sm text-error text-center min-h-4"></p>

    <button
      id="reg-submit"
      type="submit"
      disabled
      class="button flex items-center justify-center w-full disabled:opacity-50 disabled:cursor-not-allowed"
    >
      ${t('auth.register.submit')}
    </button>

  </form>
`
