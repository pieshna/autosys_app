'use client'
import WrapperDnD from '@/shared/components/Dnd/Wrapper'
import { getCookieClientSide } from '@/shared/tools/cookies/tokenClientSide'
import { fetchPersonalizado } from '@/shared/tools/fetchPersonalizado'
import { useEffect, useState } from 'react'

const token = getCookieClientSide('token')

function TiemposTrabajos() {
  const [data, setData] = useState([])
  const [reloadme, setReloadme] = useState(false)
  useEffect(() => {
    fetchPersonalizado('trabajos/disponibles', 'GET', token).then((data) => {
      setData(data)
    })
  }, [reloadme])
  const handleSubmit = (data: any) => {
    fetchPersonalizado('trabajos', 'PUT', token, data).then((data) => {
      setTimeout(() => {
        setReloadme(!reloadme)
        //todo esto generara un reporte de los trabajos que se movieron a finalizado
      }, 1000)
    })
  }
  return (
    <WrapperDnD
      contents={['En Proceso', 'Terminado']}
      submit={handleSubmit}
      data={data}
      keyShow={['cliente', 'placa', 'descripcion']}
    />
  )
}

export default TiemposTrabajos
