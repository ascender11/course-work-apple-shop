import { Header } from '@/widgets/header'

export const HomePage = (): string => {
  return `
  ${Header()}
    <main class="container mx-auto px-4 py-8">
      <div class="max-w-2xl mx-auto">
        <div class="mb-8 text-center">
          <h2 class="text-3xl font-bold text-gray-900 mb-2">Добро пожаловать!</h2>
        </div>
        <div id="posts-container"></div>
      </div>
    </main>
  `
}
