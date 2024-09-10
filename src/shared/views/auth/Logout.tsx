'use client'

import { deleteCookieClientSide } from '@/shared/tools/cookies/tokenClientSide'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

function Logout() {
  const { replace } = useRouter()

  useEffect(() => {
    deleteCookieClientSide('token')
    replace('/login')
  }, [])

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <p>Cerrando Sesion...</p>
    </div>
  )
}

export default Logout
