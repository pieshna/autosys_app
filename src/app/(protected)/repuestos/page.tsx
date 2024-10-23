import { FormularioEstructura } from '@/shared/estructurasFormularios/type'
import CrudTemplate from '@/shared/views/CrudTemplate'

const estructura: FormularioEstructura = {
  nombre: {
    type: 'text',
    label: 'Nombre',
    placeholder: 'Ingrese el nombre del repuesto',
    required: true
  },
  precio: {
    type: 'number',
    label: 'Precio',
    placeholder: 'Ingrese el precio del repuesto',
    required: true
  },
  lugar: {
    type: 'text',
    label: 'Lugar',
    placeholder: 'Ingrese el lugar del repuesto',
    required: true
  }
}

function Repuestos() {
  return <CrudTemplate estructura={estructura} url="repuestos" />
}

export default Repuestos
