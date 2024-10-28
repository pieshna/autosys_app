'use client'
import BarChart, { BarChartProps } from '@/shared/components/BarChart'
import { getCookieClientSide } from '@/shared/tools/cookies/tokenClientSide'
import { fetchPersonalizado } from '@/shared/tools/fetchPersonalizado'
import { useEffect, useState } from 'react'

const token = getCookieClientSide('token')

function AdminDashboard() {
  const [dataGrafica, setDataGrafica] = useState<BarChartProps>()
  const [dataProducts, setDataProducts] = useState([] as any[])

  useEffect(() => {
    fetchPersonalizado('trabajos/semana', 'GET', token).then((data) => {
      setDataProducts(data.pagos ?? [])
      configData(data.semanas ?? [])
    })
  }, [])

  const configData = (data: any) => {
    const labels = data.map((item: any) => 'semana ' + item.semana)
    const datos = data.map((item: any) => item.trabajos)
    const colores = ['#FF6384', '#36A2EB', '#FFCE56', '#FF6384', '#36A2EB']
    const datosTemp: Omit<BarChartProps, 'labels'> = {
      datosConfig: { labels, datos, colores }
    }
    setDataGrafica(datosTemp as BarChartProps)
  }

  const defineWeek = (fec: string) => {
    const date = fec ?? new Date().toISOString()
    const fecha = new Date(date)
    const tmp = new Date(date)
    const added = new Date(tmp.setDate(tmp.getDate() + 6))
    return `${fecha.toLocaleDateString()} - ${added.toLocaleDateString()}`
  }

  return (
    <>
      <div className="grid md:grid-cols-2 text-white">
        <div className="grid place-items-center pt-10">
          <p className="text-center font-bold text-xl">
            Trabajos realizados el ultimo mes
          </p>
          <p className="text-center">
            {new Date(
              new Date().setMonth(new Date().getMonth() - 1)
            ).toLocaleDateString()}{' '}
            - {new Date().toLocaleDateString()}
          </p>

          {dataGrafica && (
            <BarChart
              datosConfig={dataGrafica.datosConfig}
              labels={['semanas']}
            />
          )}
        </div>
        <div className="flex-1 pt-10">
          <p className="text-center text-xl">
            Trabajadores - salario de la semana
          </p>
          <p className="text-center">
            {defineWeek(dataProducts[0]?.semana_inicio)}
          </p>
          <div className="flex flex-col items-center pt-3">
            {dataProducts.map((item, i) => {
              return (
                <div
                  className="flex gap-10 pt-1 border-b-2 text-pateleta-950"
                  key={i}
                >
                  <div className="flex flex-col justify-end w-36 ">
                    <p>{item.trabajador}</p>
                  </div>

                  <div className="flex flex-col justify-end items-center w-48 ">
                    <p>Q.{item.pago_trabajador.slice(0, -2)}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminDashboard
