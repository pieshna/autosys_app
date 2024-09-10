import { FormularioEstructura } from './type'

export const estructuraTiempos: FormularioEstructura = {
  nombre: {
    type: 'text',
    label: 'Nombre',
    placeholder: 'Nombre del tiempo',
    required: true
  },
  descripcion: {
    type: 'text',
    label: 'Descripcion',
    placeholder: 'Descripcion del tiempo',
    required: false
  },
  tiempo: {
    type: 'number',
    label: 'Tiempo',
    placeholder: 'Tiempo en segundos',
    required: true
  }
}
