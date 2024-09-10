import { jwtDecode } from 'jwt-decode'
import { tokenInterface } from './interface'

const decodeToken = (token: string): tokenInterface => {
  if (!token) return {} as tokenInterface
  return jwtDecode(token)
}

export const GetDecodedToken = (
  token: string | null | undefined
): tokenInterface => {
  if (token) {
    const tokenData = decodeToken(token)
    tokenData.hasToken = true
    return tokenData
  } else {
    const tokenData = {
      hasToken: false
    } as tokenInterface
    return tokenData
  }
}

export const tokenIsAlive = (token: string | undefined) => {
  if (!token) return false
  const decodedToken = decodeToken(token)
  const currentDate = new Date()
  const tokenExpirationDate = new Date(decodedToken.exp * 1000)
  if (currentDate > tokenExpirationDate) {
    return false
  }
  return true
}
