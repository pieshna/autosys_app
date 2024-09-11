'use client'
import { Button } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import InputGenerico from './InputGenerico'
import SelectLlaveForanea from './SelectLlaveForanea'
import SelectWithAutocomplete from './SelectWithAutoComplete'

interface FormProps {
  formData: Record<
    string,
    {
      label?: string
      type: string
      required: boolean
      placeholder?: string
      validate?: (value: string) => string
      url?: string
      id?: string
      camposAMostrar?: string[]
      autoComplete?: boolean
      join?: string
      defaultValue?: string | number
      returnData?: boolean
      disabled?: boolean
      icon?: string
    }
  >
  onSubmitFunction: (data: Record<string, string>) => void
  noColumnas?: number
  datosAMostrar: any
  dataToReturn?: any
  onChanges?: any
  textoBoton?: string
  alinearBoton?: 'justify-start' | 'justify-center' | 'justify-end'
  children?: React.ReactNode
  typeButtonSubmit?: 'submit' | 'button'
}

const FormularioGenerico = ({
  formData,
  onSubmitFunction,
  noColumnas = 1,
  datosAMostrar,
  dataToReturn = null,
  onChanges = null,
  textoBoton = 'Enviar',
  alinearBoton = 'justify-end',
  typeButtonSubmit = 'submit',
  children
}: FormProps) => {
  const [formValues, setFormValues] = useState<Record<string, string>>({})
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (Object.keys(datosAMostrar).length === 0) {
      const defaultValues: any = {}
      Object.entries(formData).forEach(([fieldName, fieldData]) => {
        defaultValues[fieldName] = fieldData.defaultValue || ''
      })
      setFormValues(defaultValues)
    } else {
      setFormValues(datosAMostrar)
    }
  }, [datosAMostrar, formData])

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }))
    if (formData[name]?.validate) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: formData[name].validate?.(value) || ''
      }))
    }
    if (onChanges) {
      onChanges(name, value)
    }
  }

  const handleChangeAutoComplete = (id: React.Key, name: string) => {
    const value = id.toString()
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }))
    if (formData[name]?.validate) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: formData[name].validate?.(value) || ''
      }))
    }
    if (onChanges) {
      onChanges(name, value)
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const errors: Record<string, string> = {}
    Object.entries(formData).forEach(([fieldName, fieldData]) => {
      if (fieldData.required && !formValues[fieldName]) {
        errors[fieldName] = `${fieldName} is required`
      }
      if (fieldData.validate) {
        const error = fieldData.validate(formValues[fieldName] || '')
        if (error) {
          errors[fieldName] = error
        }
      }
    })
    if (Object.keys(errors).length === 0) {
      const dataToSentToSubmit = { ...formValues }
      //recorrer objeto datosEnvio y eliminar los campos vacios
      for (const key in dataToSentToSubmit) {
        if (dataToSentToSubmit[key] === null) {
          delete dataToSentToSubmit[key]
        }
      }
      onSubmitFunction(dataToSentToSubmit)
    } else {
      setFormErrors(errors)
    }
  }

  const chunk = (arr: any[], size: number) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    )

  const formChunks = chunk(Object.entries(formData), noColumnas)

  return (
    <>
      {Object.keys(formValues).length !== 0 && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {formChunks.map((formChunk, index) => (
            <div
              key={index}
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${noColumnas}, minmax(0, 1fr))`,
                gap: '1rem'
              }}
            >
              {formChunk.map(([fieldName, fieldData], index2) => (
                <div key={index2}>
                  {fieldData.type === 'select' && fieldData.url ? (
                    <>
                      <SelectLlaveForanea
                        id={fieldData.id || 'id'}
                        label={fieldData.label || fieldName}
                        name={fieldName}
                        url={fieldData.url}
                        value={formValues[fieldName] || ''}
                        required={fieldData.required}
                        className="form-control"
                        onChange={handleChange}
                        camposAMostrar={fieldData.camposAMostrar || []}
                        join={fieldData.join || ''}
                        returnData={fieldData.returnData}
                        dataToReturn={dataToReturn}
                        placeholder={fieldData.placeholder}
                        focus={index === 0 && index2 === 0}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                  {fieldData.type === 'autocomplete' && fieldData.url ? (
                    <>
                      <SelectWithAutocomplete
                        id={fieldData.id || 'id'}
                        label={fieldData.label || fieldName}
                        name={fieldName}
                        url={fieldData.url}
                        value={formValues[fieldName] || ''}
                        required={fieldData.required}
                        className="form-control"
                        onChange={handleChangeAutoComplete}
                        camposAMostrar={fieldData.camposAMostrar || []}
                        join={fieldData.join || ''}
                        returnData={fieldData.returnData}
                        dataToReturn={dataToReturn}
                        placeholder={fieldData.placeholder}
                        focus={index === 0 && index2 === 0}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                  {!fieldData.url && fieldData.show != false ? (
                    <>
                      <InputGenerico
                        onChange={handleChange}
                        type={fieldData.type}
                        name={fieldName}
                        value={formValues[fieldName] || ''}
                        required={fieldData.required}
                        label={fieldData.label || fieldName}
                        className="form-control"
                        placeholder={fieldData.placeholder}
                        autoComplete={fieldData.autoComplete}
                        defaultValue={fieldData.defaultValue}
                        disabled={fieldData.disabled}
                        icon={fieldData.icon}
                        focus={index === 0 && index2 === 0}
                      />
                    </>
                  ) : (
                    <></>
                  )}

                  {formErrors[fieldName] && (
                    <div className="invalid-feedback">
                      {formErrors[fieldName]}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
          {children}
          <div className={`flex ${alinearBoton}`}>
            {typeButtonSubmit === 'button' && (
              <Button type="button" onClick={handleSubmit}>
                {textoBoton}
              </Button>
            )}
            {typeButtonSubmit === 'submit' && (
              <Button type="submit">{textoBoton}</Button>
            )}
          </div>
        </form>
      )}
    </>
  )
}

export default FormularioGenerico
