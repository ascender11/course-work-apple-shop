import { axiosInstance } from '@/shared/api'

import type { LoginData, PublicUser, RegisterData, User } from '../model/types'
import { UserRole } from '../model/types'

type UserDto = User

const stripPassword = ({ password: _, ...rest }: UserDto): PublicUser => rest

export const userService = {
  async getAll(): Promise<PublicUser[]> {
    const response = await axiosInstance.get<UserDto[]>('/users')
    return response.data.map(stripPassword)
  },

  async getById(id: string): Promise<PublicUser> {
    const response = await axiosInstance.get<UserDto>(`/users/${id}`)
    return stripPassword(response.data)
  },

  async login(data: LoginData): Promise<User> {
    const response = await axiosInstance.get<UserDto[]>('/users', {
      params: {
        email: data.email,
        password: data.password,
      },
    })

    if (!response.data.length) {
      throw new Error('Неверный email или пароль')
    }

    return response.data[0]
  },

  async register(data: RegisterData): Promise<User> {
    const emailCheck = await axiosInstance.get<UserDto[]>('/users', {
      params: { email: data.email },
    })
    if (emailCheck.data.length) {
      throw new Error('Пользователь с таким email уже зарегистрирован')
    }

    const phoneCheck = await axiosInstance.get<UserDto[]>('/users', {
      params: { phone: data.phone },
    })
    if (phoneCheck.data.length) {
      throw new Error('Пользователь с таким номером телефона уже зарегистрирован')
    }

    const nicknameCheck = await axiosInstance.get<UserDto[]>('/users', {
      params: { nickname: data.nickname },
    })
    if (nicknameCheck.data.length) {
      throw new Error('Пользователь с таким никнеймом уже зарегистрирован')
    }

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

    const response = await axiosInstance.post<UserDto>('/users', newUser)
    return response.data
  },

  async update(id: string, data: Partial<Omit<User, 'id' | 'createdAt'>>): Promise<PublicUser> {
    const response = await axiosInstance.patch<UserDto>(`/users/${id}`, data)
    return stripPassword(response.data)
  },

  async remove(id: string): Promise<void> {
    await axiosInstance.delete(`/users/${id}`)
  },
}
