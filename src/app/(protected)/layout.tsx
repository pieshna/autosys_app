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
      <div className="relative h-screen w-screen bg-slate-950 z-0">
        <div className="absolute -z-[1] bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)]"></div>
        <NavbarCustom />
        <main className="p-4">{children}</main>
      </div>
    </>
  )
}
