import type { AuthState, PublicUser, UserRole } from './types'

const AUTH_KEY = 'apple_shop_auth'

const get = (): AuthState | null => {
  try {
    const raw = localStorage.getItem(AUTH_KEY)
    return raw ? (JSON.parse(raw) as AuthState) : null
  } catch {
    return null
  }
}

const set = (state: AuthState): void => {
  localStorage.setItem(AUTH_KEY, JSON.stringify(state))
}

const clear = (): void => {
  localStorage.removeItem(AUTH_KEY)
}

const getUser = (): PublicUser | null => get()?.user ?? null

const isLoggedIn = (): boolean => get() !== null

const hasRole = (role: UserRole): boolean => get()?.user?.role === role

export const userStore = { get, set, clear, getUser, isLoggedIn, hasRole }
