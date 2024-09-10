export type FormularioEstructura = {
  [key: string]: {
    label?: string
    type: string
    required: boolean
    placeholder?: string
    validate?: (value: string) => string
    url?: string
    camposAMostrar?: string[]
    autoComplete?: boolean
    join?: string
    defaultValue?: string | number
    returnData?: boolean
    disabled?: boolean
    icon?: string
    id?: string
    show?: boolean
  }
}
