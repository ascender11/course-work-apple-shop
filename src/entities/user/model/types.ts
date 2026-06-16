export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN',
}

export interface User {
  id: string
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
  role: UserRole
  createdAt: string
}

export type PublicUser = Omit<User, 'password'>

export type UserState = {
  user: PublicUser | null
  loading: boolean
  error: string | null
}

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

export type LoginData = {
  email: string
  password: string
}
