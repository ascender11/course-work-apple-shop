const transliterate = (text: string): string => {
  const map: Record<string, string> = {
    а: 'a',
    б: 'b',
    в: 'v',
    г: 'g',
    д: 'd',
    е: 'e',
    ё: 'e',
    ж: 'zh',
    з: 'z',
    и: 'i',
    й: 'y',
    к: 'k',
    л: 'l',
    м: 'm',
    н: 'n',
    о: 'o',
    п: 'p',
    р: 'r',
    с: 's',
    т: 't',
    у: 'u',
    ф: 'f',
    х: 'kh',
    ц: 'ts',
    ч: 'ch',
    ш: 'sh',
    щ: 'shch',
    ъ: '',
    ы: 'y',
    ь: '',
    э: 'e',
    ю: 'yu',
    я: 'ya',
  }

  return text
    .toLowerCase()
    .split('')
    .map((char) => map[char] || char)
    .join('')
}

export const generateNickname = (firstName: string, lastName: string): string => {
  const cleanFirstName = transliterate(firstName).replace(/[^a-z]/g, '')
  const cleanLastName = transliterate(lastName).replace(/[^a-z]/g, '')

  const fname = cleanFirstName || 'user'
  const lname = cleanLastName || 'name'

  const prefixes = ['', 'the_', '_', 'official_', 'real_', 'mr_', 'ms_', '_pro']
  const suffixes = ['', '_official', '_real', '_123', '_dev', '_life', '_blog', '_world']
  const numbers = Math.floor(Math.random() * 1000)

  const usePrefix = Math.random() > 0.5
  const useSuffix = Math.random() > 0.5
  const useNumber = Math.random() > 0.6

  let nickname = ''

  if (usePrefix) {
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
    nickname += prefix
  }

  const variants = [
    `${fname}${lname}`,
    `${fname}_${lname}`,
    `${fname}.${lname}`,
    `${fname}${lname.slice(0, 3)}`,
    `${fname.slice(0, 3)}${lname}`,
    `${lname}${fname}`,
    `${lname}_${fname}`,
  ]

  nickname += variants[Math.floor(Math.random() * variants.length)]

  if (useSuffix) {
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)]
    nickname += suffix
  }

  if (useNumber) {
    nickname += numbers
  }

  nickname = nickname.replace(/[_.]{2,}/g, '_').replace(/^_|_$/, '')

  return nickname
}

export const generatePassword = (): string => {
  const uppercase = 'ABCDEFGHJKLMNPQRSTUVWXYZ'
  const lowercase = 'abcdefghijkmnopqrstuvwxyz'
  const numbers = '23456789'
  const special = '!@#$%^&*'

  const getRandomChar = (str: string) => str[Math.floor(Math.random() * str.length)]

  let password = ''
  password += getRandomChar(uppercase)
  password += getRandomChar(lowercase)
  password += getRandomChar(numbers)
  password += getRandomChar(special)

  const all = uppercase + lowercase + numbers + special
  for (let i = password.length; i < 12; i++) {
    password += getRandomChar(all)
  }

  return password
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('')
}
