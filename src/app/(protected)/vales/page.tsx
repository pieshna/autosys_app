import { FormularioEstructura } from '@/shared/estructurasFormularios/type'
import CrudTemplate from '@/shared/views/CrudTemplate'

export const estructuraVales: FormularioEstructura = {
  repuesto_id: {
    type: 'autocomplete',
    label: 'Repuesto',
    required: true,
    url: 'repuestos',
    id: 'id',
    camposAMostrar: ['nombre'],
    placeholder: 'Seleccione un repuesto',
    join: ' '
  },
  cantidad: {
    type: 'number',
    label: 'Cantidad',
    required: true
  },
  proveedor: {
    type: 'text',
    label: 'Proveedor',
    required: true
  },
  precio: {
    type: 'number',
    label: 'Precio',
    required: true
  }
}

function Vales({ selectColumn }: { selectColumn?: any }) {
  return (
    <CrudTemplate
      estructura={estructuraVales}
      url="vales"
      hideCols={['repuesto_id', 'id']}
      columnSelected={selectColumn}
      agregarBuscador
    />
  )
}

export default Vales
