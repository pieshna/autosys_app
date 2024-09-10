import { getCookieServerSide } from '@/shared/tools/cookies/tokenServerSide'
import {
  GetDecodedToken,
  tokenIsAlive
} from '@/shared/tools/token/tokenFromClient'
import NavbarCustom from '@/shared/views/nav/navbar/NavBar'
import { redirect } from 'next/navigation'

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { hasToken, rol, userName } = GetDecodedToken(
    getCookieServerSide('token')
  )
  const isAlive = tokenIsAlive(getCookieServerSide('token'))

  if (!hasToken || !isAlive) {
    redirect('/login')
  }

  return (
    <>
      <NavbarCustom />
      <main className="p-4">{children}</main>
    </>
  )
}
