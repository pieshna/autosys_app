import { getCookieServerSide } from '@/shared/tools/cookies/tokenServerSide'
import { GetDecodedToken } from '@/shared/tools/token/tokenFromClient'
import AdminDashboard from './AdminDashboard'
import SecretariaDashboard from './SecretariaDashboard'
import TrabajadorDashboard from './TrabajadorDashboard'

async function DashboardView() {
  const decoded = GetDecodedToken(getCookieServerSide('token'))

  if (decoded?.rol === 'admin'.toUpperCase()) {
    return <AdminDashboard />
  }
  if (decoded?.rol === 'secretaria'.toUpperCase()) {
    return <SecretariaDashboard />
  }
  if (decoded?.rol === 'trabajador'.toUpperCase()) {
    return <TrabajadorDashboard />
  }

  return <AdminDashboard />
}

export default DashboardView
