import { getCookieServerSide } from '../cookies/tokenServerSide'
import { GetDecodedToken, tokenIsAlive } from './tokenFromClient'

export const validarTokenLayout = (
  campoDeToken: string,
  campoAComparar: string
) => {
  const token = getCookieServerSide('token')
  if (!token) return false
  const tokenDecoded: any = GetDecodedToken(token)
  if (tokenDecoded.hasToken === false) return false
  if (tokenDecoded[campoDeToken] !== campoAComparar) return false
  const validToken = tokenIsAlive(token)
  return validToken
}
