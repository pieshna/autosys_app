'use client'
import { BarChartProps } from '@/shared/components/BarChart'
import { getCookieClientSide } from '@/shared/tools/cookies/tokenClientSide'
import { fetchPersonalizado } from '@/shared/tools/fetchPersonalizado'
import { useEffect, useState } from 'react'

const token = getCookieClientSide('token')

export const defineWeek = (fec: string) => {
  const date = fec ?? new Date().toISOString()
  const fecha = new Date(date)
  const tmp = new Date(date)
  const added = new Date(tmp.setDate(tmp.getDate() + 6))
  return `${fecha.toLocaleDateString()} - ${added.toLocaleDateString()}`
}

function AdminDashboard() {
  const [dataGrafica, setDataGrafica] = useState<BarChartProps>()
  const [dataProducts, setDataProducts] = useState([] as any[])
  const [dataCarros, setDataCarros] = useState([] as any[])
  const [ganancias, setGanancias] = useState([] as any[])

  useEffect(() => {
    fetchPersonalizado('trabajos/semana', 'GET', token).then((data) => {
      setDataProducts(data.pagos ?? [])
      configData(data.semanas ?? [])
      setDataCarros(data.carrosEstado ?? [])
      setGanancias(data.ganancias ?? [])
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

  return (
    <>
      <div className="grid md:grid-cols-2 text-white">
        <div className="grid place-items-center pt-10">
          <p className="text-center font-bold text-xl">Trabajos realizados</p>
          <p className="text-center text-xs">
            {defineWeek(dataProducts[0]?.semana_inicio)}
          </p>
          {dataCarros.length > 0 &&
            dataCarros.map((item, i) => (
              <div key={i} className="w-56 border-b-2 text-center">
                <p>
                  {item.estado} - {item.cantidad} carro(s)
                </p>
              </div>
            ))}
          <div className="w-56 border-b-2 text-center">
            <p>
              Total:{' '}
              {dataCarros.reduce((acc, item) => acc + Number(item.cantidad), 0)}{' '}
              carro(s)
            </p>
          </div>
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
            {
              //sumar los pagos
              dataProducts.length > 0 && (
                <div className="flex gap-10 pt-5 border-b-2 text-pateleta-950">
                  <div className="flex flex-col justify-end w-36 ">
                    <p>Total</p>
                  </div>
                  <div className="flex flex-col justify-end items-center w-48 ">
                    <p>
                      Q.
                      {dataProducts
                        .reduce(
                          (acc, item) =>
                            acc + parseFloat(item.pago_trabajador.slice(0, -2)),
                          0
                        )
                        .toFixed(2)}
                    </p>
                  </div>
                </div>
              )
            }
          </div>
        </div>
        <div className="col-span-2 pt-8">
          <p className="text-center">TOTAL DE INGRESOS</p>
          <p className="text-center">
            {defineWeek(dataProducts[0]?.semana_inicio)}
          </p>
          <div className="flex flex-col items-center pt-3">
            {ganancias.length > 0 && (
              <>
                {ganancias.map((item, i) => (
                  <div key={i} className="flex flex-col w-64">
                    <div className="flex justify-between border-b-2">
                      <p>Total generado:</p>
                      <p> Q.{item.total}</p>
                    </div>
                    <div className="flex justify-between border-b-2">
                      <p>Total a pagar:</p>
                      <p> Q.{item.pago_trabajador}</p>
                    </div>
                    <div className="flex justify-between border-b-2">
                      <p>Ganancia estimada: </p>
                      <p> Q.{item.ganancias}</p>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminDashboard
