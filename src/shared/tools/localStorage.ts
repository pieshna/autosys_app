export const getLocalStorage = (key: string) => {
  if (typeof window === 'undefined') return null
  return window.localStorage.getItem(key)
}

export const setLocalStorage = (key: string, value: string) => {
  if (typeof window === 'undefined') return null
  window.localStorage.setItem(key, value)
  return true
}

export const removeLocalStorage = (key: string) => {
  if (typeof window === 'undefined') return null
  window.localStorage.removeItem(key)
  return true
}

export const removeLocalStorageMultiple = (keys: string[]) => {
  if (typeof window === 'undefined') return null
  keys.forEach((key) => window.localStorage.removeItem(key))
  return true
}
