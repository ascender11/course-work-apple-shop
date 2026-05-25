import type { User } from '../model/types'
import { UserRole } from '../model/types'

const BASE = import.meta.env.VITE_API_URL as string

// TODO: Change all the fetch statements to axios

export interface RegisterData {
  phone: string
  email: string
  fullName: {
    lastName: string
    firstName: string
    patronymic?: string
  }
  nickname: string
  birthDate: string
  password: string
}

export const userApi = {
  login: async (email: string, password: string): Promise<User> => {
    const res = await fetch(`${BASE}/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`)
    if (!res.ok) throw new Error('Ошибка сервера')
    const users = (await res.json()) as User[]
    if (!users.length) throw new Error('Неверный email или пароль')
    return users[0]
  },

  register: async (data: RegisterData): Promise<User> => {
    const checkRes = await fetch(`${BASE}/users?email=${encodeURIComponent(data.email)}`)
    const existing = (await checkRes.json()) as User[]
    if (existing.length) throw new Error('Пользователь с таким email уже зарегистрирован')

    const checkPhoneRes = await fetch(`${BASE}/users?phone=${encodeURIComponent(data.phone)}`)
    const existingPhone = (await checkPhoneRes.json()) as User[]
    if (existingPhone.length) throw new Error('Пользователь с таким номером телефона уже зарегистрирован')

    const checkNicknameRes = await fetch(`${BASE}/users?nickname=${encodeURIComponent(data.nickname)}`)
    const existingNickname = (await checkNicknameRes.json()) as User[]
    if (existingNickname.length) throw new Error('Пользователь с таким никнеймом уже зарегистрирован')

    const newUser = {
      phone: data.phone,
      email: data.email.trim().toLowerCase(),
      fullName: {
        lastName: data.fullName.lastName.trim(),
        firstName: data.fullName.firstName.trim(),
        patronymic: data.fullName.patronymic?.trim(),
      },
      nickname: data.nickname.trim(),
      birthDate: data.birthDate,
      password: data.password,
      role: UserRole.CUSTOMER,
      createdAt: new Date().toISOString(),
    }

    const res = await fetch(`${BASE}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    })
    if (!res.ok) throw new Error('Не удалось создать аккаунт')
    return res.json() as Promise<User>
  },
}
