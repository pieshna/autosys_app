import { getCookieServerSide } from '@/shared/tools/cookies/tokenServerSide'
import { GetDecodedToken } from '@/shared/tools/token/tokenFromClient'

async function DashboardView() {
  const decoded = GetDecodedToken(getCookieServerSide('token'))

  return <>hola</>
}

export default DashboardView
