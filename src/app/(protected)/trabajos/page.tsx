import { FormularioEstructura } from '@/shared/estructurasFormularios/type'
import CrudTemplate from '@/shared/views/CrudTemplate'

const estructura: FormularioEstructura = {
  trabajador_id: {
    type: 'autocomplete',
    label: 'Trabajador',
    required: true,
    url: 'trabajadores',
    id: 'id',
    camposAMostrar: ['nombre', 'apellido'],
    placeholder: 'Seleccione trabajador',
    join: ' '
  },
  vehiculo_id: {
    type: 'autocomplete',
    label: 'Vehiculo',
    required: true,
    url: 'vehiculos',
    id: 'id',
    camposAMostrar: ['cliente', 'placa'],
    placeholder: 'Seleccione vehiculo',
    join: ' '
  },
  descripcion: {
    type: 'text',
    label: 'Descripcion',
    required: true
  },
  problema_cliente: {
    type: 'text',
    label: 'Problema Cliente',
    required: false
  },
  diagnostico_mecanico: {
    type: 'text',
    label: 'Diagnostico Mecanico',
    required: false
  },
  total_pagar: {
    type: 'number',
    label: 'Total Pagar',
    required: false
  },
  fecha: {
    type: 'date',
    label: 'Fecha',
    required: false,
    defaultValue: new Date().toISOString().split('T')[0]
  }
}

function Trabajos() {
  const hideCol = ['id', 'trabajador_id', 'vehiculo_id']
  return (
    <CrudTemplate estructura={estructura} url="trabajos" hideCols={hideCol} />
  )
}

export default Trabajos
