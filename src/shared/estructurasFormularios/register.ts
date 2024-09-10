import { FormularioEstructura } from './type'

export const estructuraRegister: FormularioEstructura = {
  nombre: {
    type: 'text',
    required: true,
    label: 'Nombre',
    placeholder: 'Ingresa tu nombre'
  },
  apellido: {
    type: 'text',
    required: true,
    label: 'Apellido',
    placeholder: 'Ingresa tu apellido'
  },
  correo: {
    type: 'email',
    required: false,
    label: 'Correo',
    placeholder: 'Ingresa tu correo'
  },
  username: {
    type: 'text',
    required: false,
    label: 'Username',
    placeholder: 'Ingresa tu username'
  },
  password: {
    type: 'password',
    required: true,
    label: 'Password',
    placeholder: 'Ingresa tu password'
  }
}
