'use client'
import { useEffect, useState } from 'react'

import { Input } from '@nextui-org/react'
interface InputGenericoProps {
  label: string
  type: string
  name: string
  value: string
  className?: string
  required?: boolean
  placeholder?: string
  autoComplete?: boolean
  defaultValue?: string | number | null
  disabled?: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  icon?: string
  focus?: boolean
}

const InputGenerico = ({
  label,
  type,
  name,
  value,
  className,
  required = false,
  onChange,
  placeholder = '',
  defaultValue = null,
  autoComplete = false,
  disabled = false,
  icon = '',
  focus = false
}: InputGenericoProps) => {
  const [valor, setValor] = useState<string>('')

  useEffect(() => {
    if (defaultValue === null) return
    defaultValue ? setValor(defaultValue.toString()) : setValor(value)
  }, [defaultValue])

  useEffect(() => {
    if (value === null) return
    setValor(value)
  }, [value])

  const handleInputChange = (event: any) => {
    setValor(event.target.value)
    onChange(event)
  }

  return (
    <>
      {icon ? (
        <>
          <label htmlFor={name}>{label}</label>
          <div className="input-group">
            <span className="input-group-text">
              <i className={icon}></i>
            </span>
            <input
              type={type}
              name={name}
              value={valor || value}
              className={className}
              required={required}
              onChange={handleInputChange}
              placeholder={placeholder}
              autoComplete={autoComplete ? 'on' : 'off'}
              disabled={disabled}
            />
          </div>
        </>
      ) : (
        <div className="flex flex-col w-full">
          <label htmlFor={name}>{label}</label>

          <Input
            name={name}
            type={type}
            value={valor}
            className={className}
            required={required}
            onChange={handleInputChange}
            placeholder={placeholder}
            autoComplete={autoComplete ? 'on' : 'off'}
            disabled={disabled}
            autoFocus={focus}
          />
        </div>
      )}
    </>
  )
}

export default InputGenerico
