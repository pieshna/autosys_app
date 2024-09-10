'use client'

export const createCookieClientSide = (name: string, value: string) => {
  if (typeof window === 'undefined') return null
  document.cookie = `${name}=${value}; path=/`
}

export const deleteCookieClientSide = (name: string) => {
  if (typeof window === 'undefined') return null
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`
}

export const getCookieClientSide = (name: string) => {
  if (typeof window === 'undefined') return undefined
  const cookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`))
  if (!cookie) return undefined
  return cookie.split('=')[1]
}
