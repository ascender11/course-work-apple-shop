const BASE = import.meta.env.VITE_API_URL as string

// TODO: Change all the fetch statements to axios

export interface Favorite {
  id: string
  userId: string
  productId: string
}

export const favoritesApi = {
  getByUserId: async (userId: string): Promise<Favorite[]> => {
    const res = await fetch(`${BASE}/favorites?userId=${encodeURIComponent(userId)}`)
    if (!res.ok) throw new Error('Ошибка загрузки избранного')
    return res.json() as Promise<Favorite[]>
  },

  add: async (userId: string, productId: string): Promise<Favorite> => {
    const res = await fetch(`${BASE}/favorites`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, productId }),
    })
    if (!res.ok) throw new Error('Не удалось добавить в избранное')
    return res.json() as Promise<Favorite>
  },

  remove: async (favoriteId: string): Promise<void> => {
    const res = await fetch(`${BASE}/favorites/${favoriteId}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Не удалось удалить из избранного')
  },
}
