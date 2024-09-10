import { FormularioEstructura } from './type'

export const estructuraFormularioLogin: FormularioEstructura = {
  correo: {
    label: 'Correo electrónico o username',
    type: 'text',
    required: true,
    placeholder: 'Ingresa tu correo electrónico'
  },
  password: {
    label: 'Contraseña',
    type: 'password',
    required: true,
    placeholder: 'Ingresa tu contraseña'
  }
}
