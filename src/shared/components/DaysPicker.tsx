'use client'
import { useEffect, useState } from 'react'

function DaysPicker({
  handleChange,
  DaysInicialState,
  title = 'Seleccione los dias de venta'
}: {
  handleChange: Function
  DaysInicialState: boolean[]
  title?: string
}) {
  const DIAS = ['L', 'M', 'M', 'J', 'V', 'S', 'D']

  const [days, setDays] = useState(DaysInicialState)

  useEffect(() => {
    setDays(DaysInicialState)
  }, [DaysInicialState])

  const toggleDay = (index: number) => {
    let newDays = [...days]
    newDays[index] = !newDays[index]

    setDays(newDays)
    handleChange(newDays)
  }

  const validateIfIsSelected = (index: number) => {
    return days[index]
      ? 'bg-sky-400 text-gray-800'
      : 'bg-gray-400 hover:bg-primary hover:text-white'
  }

  return (
    <>
      <h2 className="text-center">{title}</h2>
      <div className="flex flex-row flex-wrap gap-2 items-center justify-center">
        {DIAS.map((dia, index) => (
          <div key={index} className="flex flex-col gap-1 size-6">
            <label
              htmlFor={dia + index}
              className={`rounded-full ${validateIfIsSelected(
                index
              )} cursor-pointer px-2 py-1 text-center`}
            >
              {dia}
            </label>
            <input
              type="checkbox"
              id={dia + index}
              checked={days[index]}
              className="hidden"
              onChange={() => toggleDay(index)}
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default DaysPicker
