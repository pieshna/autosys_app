'use client'
import TablaCustom from '@/shared/components/Tabla/TablaCustom'
import { getCookieClientSide } from '@/shared/tools/cookies/tokenClientSide'
import { fetchPersonalizado } from '@/shared/tools/fetchPersonalizado'
import { GetDecodedToken } from '@/shared/tools/token/tokenFromClient'
import { useEffect, useState } from 'react'
import { defineWeek } from '../../dashboard/AdminDashboard'

const token = getCookieClientSide('token')
const decoded = GetDecodedToken(token)

function ListTrabajador() {
  const [data, setData] = useState<any[]>([])
  useEffect(() => {
    fetchPersonalizado(
      `trabajos/trabajador/${decoded.userId}`,
      'GET',
      token
    ).then((data) => {
      setData(data.data ?? data)
    })
  }, [])
  return (
    <>
      <p className="text-center text-white">TOTAL DE INGRESOS</p>
      <p className="text-center text-white">
        {defineWeek(data[0]?.semana_inicio)}
      </p>
      <p className="text-center text-white">
        Total: Q.
        {data
          .reduce((acc, item) => {
            return acc + Number(item.pago_de_trabajo)
          }, 0)
          .toFixed(2)}
      </p>
      <TablaCustom
        data={data}
        idName="id"
        hideCamps={['id', 'semana_inicio']}
      />
    </>
  )
}

export default ListTrabajador
