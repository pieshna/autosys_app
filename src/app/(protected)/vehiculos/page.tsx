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
    label: 'Linea',
    required: true
  },
  anio: {
    type: 'number',
    label: 'Modelo',
    required: true
  },
  placa: {
    type: 'text',
    label: 'Placa',
    required: true,
    defaultValue: 'P-'
  }
}

const rename: headerProps[] = [
  {
    header: 'Modelo',
    value: 'anio'
  },
  {
    header: 'Linea',
    value: 'modelo'
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
