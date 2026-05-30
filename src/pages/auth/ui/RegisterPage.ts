import { initRegisterForm, RegisterForm } from '@/features/auth'
import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'

import { html } from '@/shared/lib'

export const RegisterPage = (): string => {
  const observer = new MutationObserver((_, obs) => {
    if (!document.getElementById('register-form')) return
    obs.disconnect()
    initRegisterForm()
  })
  if (typeof window !== 'undefined') observer.observe(document.body, { childList: true, subtree: true })

  return html`
    ${Header()}
    <main class="min-h-[calc(100vh-60px)] bg-background-secondary flex items-center justify-center px-4 py-8">
      <div class="w-full max-w-3xl">
        <div class="bg-background rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] px-6 py-7 sm:px-8 sm:py-8">

          <div class="mb-6">
            <h1 class="text-2xl font-semibold text-text-primary">Создать аккаунт</h1>
            <p class="text-sm text-text-quinary mt-1">Заполните все обязательные поля для регистрации</p>
          </div>

          ${RegisterForm()}

          <p class="text-sm text-text-quinary text-center mt-6">
            Уже есть аккаунт?
            <a href="/login" data-navigo class="text-primary hover:text-secondary transition-colors duration-150 ml-1">
              Войти
            </a>
          </p>

        </div>
      </div>
    </main>
    ${Footer()}
  `
}
