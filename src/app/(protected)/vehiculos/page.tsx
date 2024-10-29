import { headerProps } from '@/shared/components/Tabla/TablaCustom'
import { FormularioEstructura } from '@/shared/estructurasFormularios/type'
import CrudTemplate from '@/shared/views/CrudTemplate'

const estructura: FormularioEstructura = {
  cliente_id: {
    type: 'autocomplete',
    label: 'Cliente',
    required: true,
    url: 'clientes',
    id: 'id',
    camposAMostrar: ['nombre', 'apellido'],
    placeholder: 'Seleccione cliente',
    join: ' '
  },
  marca: {
    type: 'text',
    label: 'Marca',
    required: true
  },
  modelo: {
    type: 'text',
    label: 'Modelo',
    required: true
  },
  anio: {
    type: 'number',
    label: 'Año',
    required: true
  },
  placa: {
    type: 'text',
    label: 'Placa',
    required: true
  }
}

const rename: headerProps[] = [
  {
    header: 'Año',
    value: 'anio'
  }
]

function Vehiculos() {
  return (
    <CrudTemplate
      estructura={estructura}
      headerName={rename}
      url="vehiculos"
      hideCols={['id', 'cliente_id']}
      agregarBuscador
    />
  )
}

export default Vehiculos
