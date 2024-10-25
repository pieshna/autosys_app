'use client'
import dynamic from 'next/dynamic'

const ClientSide = dynamic(
  () => import('@/app/(protected)/trabajos/tiempos/ClientSide'),
  { ssr: false }
)

function Tiempos() {
  return <ClientSide />
}

export default Tiempos
