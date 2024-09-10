import { FormularioEstructura } from './type'

export const navEstructura: FormularioEstructura = {
  titulo: {
    label: 'Titulo',
    type: 'text',
    required: true,
    placeholder: 'Ingresa el titulo'
  },
  url: {
    label: 'URL',
    type: 'text',
    required: true,
    placeholder: 'Ingresa la URL'
  },
  icono: {
    label: 'Icono',
    type: 'text',
    required: false,
    placeholder: 'Ingresa el icono'
  },
  parent_id: {
    label: 'Parent ID',
    type: 'autocomplete',
    required: false,
    placeholder: 'Ingresa el parent id',
    url: 'nav/sin-parent-id',
    camposAMostrar: ['titulo'],
    id: 'id'
  }
}
