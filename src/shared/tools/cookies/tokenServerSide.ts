import { cookies } from 'next/headers'

export const getCookieServerSide = (name: string) => {
  const cookieStore = cookies()
  const token = cookieStore.get(name)?.value
  return token
}

export const deleteCookieServerSide = (name: string) => {
  const cookieStore = cookies()
  cookieStore.delete(name)
}
