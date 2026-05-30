export enum UserRole {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
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

export interface AuthState {
  user: PublicUser
  token: string
}
