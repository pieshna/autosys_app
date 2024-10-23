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
    <div className="relative h-screen w-screen bg-slate-950 flex flex-col">
      <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
      <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
      <p className="text-white text-3xl m-auto text-center">
        Cerrando Sesion...
      </p>
    </div>
  )
}

export default Logout
