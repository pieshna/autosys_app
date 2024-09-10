'use client'

import FormularioGenerico from '@/shared/components/forms/FormularioGenerico'
import { estructuraRegister } from '@/shared/estructurasFormularios/register'
import { createCookieClientSide } from '@/shared/tools/cookies/tokenClientSide'
import { fetchPersonalizado } from '@/shared/tools/fetchPersonalizado'
import { useRouter } from 'next/navigation'

function Register({ noColumnas = 1 }: { noColumnas?: number }) {
  const router = useRouter()
  const handleSubmit = (data: any) => {
    fetchPersonalizado('auth/register', 'POST', undefined, data).then(
      (result) => {
        if (result) {
          createCookieClientSide('token', result)
          router.push('/dashboard')
          //if (window) window.location.href = '/dashboard'
        }
      }
    )
  }

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="flex flex-col gap-4 shadow-2xl p-4 rounded-xl">
          <FormularioGenerico
            datosAMostrar={{}}
            formData={estructuraRegister}
            onSubmitFunction={handleSubmit}
            textoBoton={'Registrarse'}
            alinearBoton="justify-center"
            noColumnas={noColumnas}
          />
        </div>
      </div>
    </>
  )
}

export default Register
