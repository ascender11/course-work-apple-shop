import { writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import type { Cart, CartProduct } from '@/entities/cart/model/types'
import type { Favorite } from '@/entities/favorites/model/types'
import type { Product } from '@/entities/product'
import type { Review } from '@/entities/review/model/types'
import { type User, UserRole } from '@/entities/user/model/types'

import { products } from './data'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dbPath = resolve(__dirname, 'db.json')

const users: User[] = [
  {
    id: 'u1',
    phone: '+7 900 000 0001',
    email: 'admin@appleshop.ru',
    fullName: { lastName: 'Админ', firstName: 'Администратор' },
    nickname: 'admin',
    birthDate: '1980-01-01',
    password: 'Admin123!',
    role: UserRole.ADMIN,
    createdAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'u2',
    phone: '+7 900 111 2233',
    email: 'ivan.petrov@mail.ru',
    fullName: { lastName: 'Петров', firstName: 'Иван' },
    nickname: 'ivan_p',
    birthDate: '1995-03-15',
    password: 'Qwerty123!',
    role: UserRole.CUSTOMER,
    createdAt: '2024-03-15T10:30:00.000Z',
  },
  {
    id: 'u3',
    phone: '+7 900 222 3344',
    email: 'masha.sid@gmail.com',
    fullName: { lastName: 'Сидорова', firstName: 'Мария' },
    nickname: 'masha_sid',
    birthDate: '1998-04-02',
    password: 'Maria2024',
    role: UserRole.CUSTOMER,
    createdAt: '2024-04-02T14:22:00.000Z',
  },
  {
    id: 'u4',
    phone: '+7 900 333 4455',
    email: 'alex.kozlov@yandex.ru',
    fullName: { lastName: 'Козлов', firstName: 'Алексей' },
    nickname: 'alex_k',
    birthDate: '1988-05-10',
    password: 'Alexey88!',
    role: UserRole.CUSTOMER,
    createdAt: '2024-05-10T09:15:00.000Z',
  },
  {
    id: 'u5',
    phone: '+7 900 444 5566',
    email: 'lena.novikova@mail.ru',
    fullName: { lastName: 'Новикова', firstName: 'Елена' },
    nickname: 'lena_n',
    birthDate: '1992-06-20',
    password: 'Elena2025',
    role: UserRole.CUSTOMER,
    createdAt: '2024-06-20T16:40:00.000Z',
  },
  {
    id: 'u6',
    phone: '+7 900 555 6677',
    email: 'dmitry.volkov@gmail.com',
    fullName: { lastName: 'Волков', firstName: 'Дмитрий' },
    nickname: 'dmitry_v',
    birthDate: '1990-07-05',
    password: 'Dmitry777',
    role: UserRole.CUSTOMER,
    createdAt: '2024-07-05T11:00:00.000Z',
  },
  {
    id: 'u7',
    phone: '+7 900 666 7788',
    email: 'olga.zaitseva@yandex.ru',
    fullName: { lastName: 'Зайцева', firstName: 'Ольга' },
    nickname: 'olga_z',
    birthDate: '1985-08-18',
    password: 'OlgaPass1',
    role: UserRole.CUSTOMER,
    createdAt: '2024-08-18T13:25:00.000Z',
  },
  {
    id: 'u8',
    phone: '+7 900 777 8899',
    email: 'sergei.morozov@mail.ru',
    fullName: { lastName: 'Морозов', firstName: 'Сергей' },
    nickname: 'sergei_m',
    birthDate: '1993-09-01',
    password: 'Sergei123',
    role: UserRole.CUSTOMER,
    createdAt: '2024-09-01T08:50:00.000Z',
  },
  {
    id: 'u9',
    phone: '+7 900 888 9900',
    email: 'anna.lebedeva@gmail.com',
    fullName: { lastName: 'Лебедева', firstName: 'Анна' },
    nickname: 'anna_l',
    birthDate: '1996-10-14',
    password: 'Anna2024!',
    role: UserRole.CUSTOMER,
    createdAt: '2024-10-14T17:35:00.000Z',
  },
  {
    id: 'u10',
    phone: '+7 900 999 0011',
    email: 'nikolay.smirnov@yandex.ru',
    fullName: { lastName: 'Смирнов', firstName: 'Николай' },
    nickname: 'nikolay_s',
    birthDate: '1987-11-28',
    password: 'Nikolay99',
    role: UserRole.CUSTOMER,
    createdAt: '2024-11-28T12:10:00.000Z',
  },
  {
    id: 'u11',
    phone: '+7 900 000 1122',
    email: 'tatyana.orlova@mail.ru',
    fullName: { lastName: 'Орлова', firstName: 'Татьяна' },
    nickname: 'tatyana_o',
    birthDate: '1991-01-07',
    password: 'TatPass2025',
    role: UserRole.CUSTOMER,
    createdAt: '2025-01-07T09:00:00.000Z',
  },
]

const reviewTexts = {
  positive: [
    'Отличный товар! Качество на высоте, как и ожидал от Apple.',
    'Пользуюсь уже месяц — всё работает безупречно. Рекомендую!',
    'Шикарный дизайн и производительность. Стоит своих денег.',
    'Лучший гаджет, что у меня был. Очень доволен покупкой.',
    'Быстрая доставка, товар в идеальном состоянии.',
    'Камера просто невероятная, батарея держит весь день.',
    'Экран потрясающий, звук отличный. Полный восторг!',
    'Очень удобный в использовании, эргономика на высоте.',
  ],
  neutral: [
    'Нормальный товар, есть нюансы, но в целом неплохо.',
    'Ожидал немного большего за эти деньги, но в целом ок.',
    'Хороший продукт, но адаптация заняла пару дней.',
    'Всё работает как надо, без сюрпризов.',
    'Неплохая покупка, но есть более дешёвые аналоги.',
  ],
  negative: ['Были проблемы с доставкой, но товар в целом нормальный.', 'Не совсем то, что ожидал. Качество среднее.'],
}

const userNames: Record<string, string> = {}
for (const u of users) {
  userNames[u.id] = `${u.fullName.firstName} ${u.fullName.lastName}`
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

let reviewId = 1
const reviews: Review[] = []

const reviewsPerProduct: Record<string, number> = {
  '1': 10,
  '2': 7,
  '3': 7,
  '4': 6,
  '5': 6,
  '6': 5,
  '7': 5,
  '8': 8,
  '9': 4,
  '10': 8,
  '11': 5,
  '12': 5,
  '13': 5,
  '14': 5,
  '15': 5,
  '16': 3,
  '17': 3,
  '18': 4,
  '19': 4,
  '20': 3,
  '21': 4,
  '22': 4,
  '23': 3,
  '24': 5,
}

const userIds = users.filter((u) => u.role === 'CUSTOMER').map((u) => u.id)

for (const [productId, count] of Object.entries(reviewsPerProduct)) {
  const usedUsers = new Set<string>()
  for (let i = 0; i < count; i++) {
    let userId: string
    do {
      userId = pick(userIds)
    } while (usedUsers.has(userId) && usedUsers.size < userIds.length)
    usedUsers.add(userId)

    const rating = count > 6 ? Math.random() * 2 + 3 : Math.random() * 3 + 2
    const textPool = rating >= 4 ? reviewTexts.positive : rating >= 3 ? reviewTexts.neutral : reviewTexts.negative
    const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')
    const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')
    const year = Math.random() > 0.5 ? '2025' : '2026'

    reviews.push({
      id: (reviewId++).toString(),
      productId,
      userId,
      userName: userNames[userId],
      text: pick(textPool),
      rating: Math.round(rating),
      createdAt: `${year}-${month}-${day}T${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}:00.000Z`,
    })
  }
}

function toCartProduct(productId: string, quantity: number): CartProduct {
  const p = products.find((prod) => prod.id === productId) as Product
  return {
    id: p.id,
    title: p.title,
    image: p.images[0] || '',
    price: p.price.current,
    quantity,
  }
}

const carts: Cart[] = [
  {
    id: '1',
    userId: 'u2',
    products: [
      toCartProduct('1', 1),
      toCartProduct('5', 2),
      toCartProduct('8', 1),
      toCartProduct('10', 1),
      toCartProduct('22', 1),
    ].filter(Boolean),
  },
  {
    id: '2',
    userId: 'u3',
    products: [toCartProduct('3', 1), toCartProduct('6', 1), toCartProduct('19', 1)].filter(Boolean),
  },
  {
    id: '3',
    userId: 'u4',
    products: [toCartProduct('11', 1), toCartProduct('16', 1), toCartProduct('23', 1), toCartProduct('24', 1)].filter(
      Boolean
    ),
  },
  {
    id: '4',
    userId: 'u5',
    products: [
      toCartProduct('2', 1),
      toCartProduct('7', 1),
      toCartProduct('12', 1),
      toCartProduct('20', 1),
      toCartProduct('21', 1),
      toCartProduct('14', 1),
    ].filter(Boolean),
  },
  {
    id: '5',
    userId: 'u6',
    products: [toCartProduct('4', 1), toCartProduct('9', 1), toCartProduct('15', 1), toCartProduct('17', 1)].filter(
      Boolean
    ),
  },
]

const favorites: Favorite[] = [
  { id: '1', userId: 'u2', productId: '1' },
  { id: '2', userId: 'u2', productId: '5' },
  { id: '3', userId: 'u2', productId: '11' },
  { id: '4', userId: 'u3', productId: '8' },
  { id: '5', userId: 'u3', productId: '14' },
  { id: '6', userId: 'u4', productId: '3' },
  { id: '7', userId: 'u4', productId: '10' },
  { id: '8', userId: 'u5', productId: '6' },
  { id: '9', userId: 'u5', productId: '24' },
  { id: '10', userId: 'u6', productId: '15' },
]

const db = {
  users,
  products: products.map((p) => ({
    ...p,
    availability: p.availability,
  })),
  reviews,
  carts,
  favorites,
  orders: [],
}

writeFileSync(dbPath, `${JSON.stringify(db, null, 2)}\n`)

console.log(`Seeded:
  ${users.length} users
  ${products.length} products
  ${reviews.length} reviews
  ${carts.length} carts
  ${favorites.length} favorites`)
