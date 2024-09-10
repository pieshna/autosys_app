'use client'
import { useEffect, useState } from 'react'
import { fetchPersonalizado } from '@/shared/tools/fetchPersonalizado'
import { getCookieClientSide } from '@/shared/tools/cookies/tokenClientSide'
import { Autocomplete, AutocompleteItem } from '@nextui-org/react'

interface SelectWithAutocompleteProps {
  id: string
  label: string
  name: string
  value?: string
  className?: string
  required?: boolean
  url: string
  onChange: (id: React.Key, name: string) => void
  camposAMostrar: string[]
  join?: string
  returnData?: boolean
  dataToReturn?: any
  placeholder?: string
  focus?: boolean
  resetValue?: boolean
  reloadMe?: boolean
}

const SelectWithAutocomplete = ({
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
  focus = false,
  resetValue = false,
  reloadMe = false
}: SelectWithAutocompleteProps) => {
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
  }, [url, reloadMe])

  useEffect(() => {
    if (resetValue) {
      setValor('')
      doClickOnButtonClear()
    }
  }, [resetValue])

  useEffect(() => {
    if (value === null) return
    setValor(value)
  }, [value])

  const handleSelectChange = (event: React.Key) => {
    if (onChange) {
      onChange(event, name)
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

  const doClickOnButtonClear = () => {
    const button = document.querySelector(
      'div.relative.flex.h-full.items-center.-mr-2 > button'
    ) as HTMLButtonElement
    if (button) {
      button.click()
    }
  }

  return (
    <>
      {!data && <div>Cargando...</div>}
      <div className="flex flex-col w-full">
        <label htmlFor={name}>{label}</label>
        <Autocomplete
          aria-label={label}
          name={name}
          value={valor || value}
          className={className}
          required={required}
          onSelectionChange={handleSelectChange}
          placeholder={placeholderValue()}
          autoFocus={focus}
        >
          {data.map((item) => {
            return (
              <AutocompleteItem key={item[id]} value={item[id]}>
                {camposAMostrar.map((campo) => item[campo]).join(join)}
              </AutocompleteItem>
            )
          })}
        </Autocomplete>
      </div>
    </>
  )
}

export default SelectWithAutocomplete
