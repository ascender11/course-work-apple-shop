import { initLoginForm, LoginForm } from '@/features/auth'
import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'

import { html } from '@/shared/lib'

export const LoginPage = (): string => {
  const observer = new MutationObserver((_, obs) => {
    if (!document.getElementById('login-form')) return
    obs.disconnect()
    initLoginForm()
  })
  if (typeof window !== 'undefined') observer.observe(document.body, { childList: true, subtree: true })

  return html`
    ${Header()}
    <main class="min-h-[calc(100vh-60px)] bg-background-secondary flex items-center justify-center px-4 py-8">
      <div class="w-full max-w-md">
        <div class="bg-background rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] px-6 py-7 sm:px-8 sm:py-8">

          <div class="mb-6">
            <h1 class="text-2xl font-semibold text-text-primary">Вход в аккаунт</h1>
            <p class="text-sm text-text-quinary mt-1">Войдите, чтобы отслеживать заказы и управлять аккаунтом</p>
          </div>

          ${LoginForm()}

          <p class="text-sm text-text-quinary text-center mt-6">
            Нет аккаунта?
            <a href="/register" data-navigo class="text-primary hover:text-secondary transition-colors duration-150 ml-1">
              Зарегистрироваться
            </a>
          </p>

        </div>
      </div>
    </main>
    ${Footer()}
  `
}
