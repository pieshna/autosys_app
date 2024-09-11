'use client'
import { getCookieClientSide } from '@/shared/tools/cookies/tokenClientSide'
import { fetchPersonalizado } from '@/shared/tools/fetchPersonalizado'
import { Select, SelectItem } from '@nextui-org/react'
import { useEffect, useState } from 'react'

interface SelectLlaveForaneaProps {
  id: string
  label: string
  name: string
  value?: string
  className?: string
  required?: boolean
  url: string
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  camposAMostrar: string[]
  join?: string
  returnData?: boolean
  dataToReturn?: any
  placeholder?: string
  focus?: boolean
}

const SelectLlaveForanea = ({
  id,
  label,
  name,
  value = '',
  className,
  required = false,
  url,
  onChange,
  camposAMostrar,
  join = ' ',
  returnData = false,
  dataToReturn = null,
  placeholder = '',
  focus = false
}: SelectLlaveForaneaProps) => {
  const [data, setData] = useState<any[]>([])
  const [valor, setValor] = useState<string>('')

  useEffect(() => {
    fetchPersonalizado(url, 'GET', getCookieClientSide('token')).then(
      (data) => {
        if (!data) return
        setData(data)
        if (returnData) {
          dataToReturn(data, name)
        }
      }
    )
  }, [url])

  useEffect(() => {
    if (value === null) return
    setValor(value)
  }, [value])

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(event)
    }
  }

  const placeholderValue = () => {
    if (value === '' || value === null) return placeholder
    const result = data.map((item) => {
      if (item[id] === value) {
        return camposAMostrar.map((campo) => item[campo]).join(join)
      }
    })
    const filtrado = result.filter((item) => item !== undefined)
    return filtrado.join(join)
  }

  return (
    <>
      {!data && <div>Cargando...</div>}
      <div className="flex flex-col w-full">
        <label htmlFor={name}>{label}</label>
        <Select
          name={name}
          value={valor || value}
          className={className}
          required={required}
          onChange={handleSelectChange}
          placeholder={placeholderValue()}
          autoFocus={focus}
        >
          {data.map((item) => (
            <SelectItem key={item[id]} value={item[id]}>
              {camposAMostrar.map((campo) => item[campo]).join(join)}
            </SelectItem>
          ))}
        </Select>
      </div>
    </>
  )
}

export default SelectLlaveForanea
