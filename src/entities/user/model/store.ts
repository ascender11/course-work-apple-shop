import { AxiosError } from 'axios'

import { userService } from '../api/service'
import { type LoginData, type PublicUser, type RegisterData, type User, UserRole, type UserState } from './types'

let state: UserState = {
  user: null,
  loading: false,
  error: null,
}

let listeners: (() => void)[] = []

const notify = () => {
  for (const fn of listeners) fn()
}

const setState = (patch: Partial<UserState>) => {
  state = { ...state, ...patch }
  notify()
}

const CACHE_KEY = 'apple_shop_auth'

const loadCache = (): PublicUser | null => {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return parsed.password ? (({ password: _, ...user }) => user)(parsed) : parsed
  } catch {}

  return null
}

const saveCache = (user: PublicUser | null) => {
  if (user) {
    localStorage.setItem(CACHE_KEY, JSON.stringify(user))
  } else {
    localStorage.removeItem(CACHE_KEY)
  }
}

export const userStore = {
  subscribe(fn: () => void) {
    listeners.push(fn)
    return () => {
      listeners = listeners.filter((l) => l !== fn)
    }
  },

  get user() {
    return state.user
  },
  get loading() {
    return state.loading
  },
  get error() {
    return state.error
  },
  get isAuthenticated() {
    return state.user !== null
  },
  get isAdmin() {
    return state.user?.role === UserRole.ADMIN
  },

  init() {
    const cached = loadCache()
    if (cached) {
      setState({ user: cached })
    }
  },

  async login(data: LoginData) {
    setState({ loading: true, error: null })

    try {
      const user = await userService.login(data)
      const publicUser = (({ password: _, ...rest }) => rest)(user) as PublicUser
      setState({ user: publicUser, loading: false })
      saveCache(publicUser)
      return user
    } catch (error) {
      if (error instanceof AxiosError) {
        setState({ error: error.message, loading: false })
      }
      throw error
    }
  },

  async register(data: RegisterData) {
    setState({ loading: true, error: null })

    try {
      const user = await userService.register(data)
      const publicUser = (({ password: _, ...rest }) => rest)(user) as PublicUser
      setState({ user: publicUser, loading: false })
      saveCache(publicUser)
      return user
    } catch (error) {
      if (error instanceof AxiosError) {
        setState({ error: error.message, loading: false })
      }
      throw error
    }
  },

  logout() {
    setState({ user: null, error: null })
    saveCache(null)
  },

  async update(data: Partial<Omit<User, 'id' | 'createdAt' | 'password'>>) {
    if (!state.user) {
      throw new Error('Пользователь не авторизован')
    }

    setState({ loading: true, error: null })

    try {
      const updated = await userService.update(state.user.id, data)
      setState({ user: { ...state.user, ...updated }, loading: false })
      saveCache(state.user)
      return updated
    } catch (error) {
      if (error instanceof AxiosError) {
        setState({ error: error.message, loading: false })
      }
      throw error
    }
  },
}
