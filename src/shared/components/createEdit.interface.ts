import { FormularioEstructura } from '../estructurasFormularios/type'

export interface FormProps {
  estructuraData: FormularioEstructura
  url: string
  buttonSubmitText?: string
  toastMessage?: string
  textTitle: string
  reload?: () => void
  close?: () => void
  idName?: string
  noColumnas?: number
  textButtonModal?: string
  sizeModal?: sizeModalType
  typeButtonSubmit?: 'submit' | 'button'
}

export type sizeModalType =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | 'full'
  | undefined
