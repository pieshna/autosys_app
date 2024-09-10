'use client'
import FormularioGenerico from '@/shared/components/forms/FormularioGenerico'
import { estructuraFormularioLogin } from '@/shared/estructurasFormularios/login'
import {
  getCookieClientSide,
  deleteCookieClientSide,
  createCookieClientSide
} from '@/shared/tools/cookies/tokenClientSide'
import { fetchPersonalizado } from '@/shared/tools/fetchPersonalizado'
import {
  GetDecodedToken,
  tokenIsAlive
} from '@/shared/tools/token/tokenFromClient'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

function Login({ children }: { children?: React.ReactNode }) {
  const token = getCookieClientSide('token')
  const tokenDecoded = GetDecodedToken(token)
  const { replace } = useRouter()

  useEffect(() => {
    if (!tokenIsAlive(token)) {
      deleteCookieClientSide('token')
    } else if (tokenDecoded?.userId) {
      replace('/dashboard')
    }
  }, [tokenDecoded])

  const handleSubmit = (data: any) => {
    fetchPersonalizado('auth/login', 'POST', undefined, data).then((result) => {
      if (result) {
        createCookieClientSide('token', result)
        if (window) window.location.href = '/dashboard'
      }
    })
  }

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="flex flex-col gap-4 shadow-2xl p-4 rounded-xl">
          {children}
          <FormularioGenerico
            datosAMostrar={{}}
            formData={estructuraFormularioLogin}
            onSubmitFunction={handleSubmit}
            textoBoton={'Iniciar sesion'}
            alinearBoton="justify-center"
          />
        </div>
      </div>
    </>
  )
}

export default Login
