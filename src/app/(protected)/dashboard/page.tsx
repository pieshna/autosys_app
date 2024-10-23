import { getCookieServerSide } from '@/shared/tools/cookies/tokenServerSide'
import { GetDecodedToken } from '@/shared/tools/token/tokenFromClient'
import AdminDashboard from './AdminDashboard'

async function DashboardView() {
  const decoded = GetDecodedToken(getCookieServerSide('token'))

  return <AdminDashboard />
}

export default DashboardView
