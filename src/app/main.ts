import { HomePage } from '@/pages/home'

const render = () => {
  const app = document.querySelector('#app')
  if (!app) return

  app.innerHTML = HomePage()
}

render()
