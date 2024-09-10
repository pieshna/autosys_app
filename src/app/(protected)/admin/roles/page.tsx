import { FormularioEstructura } from '@/shared/estructurasFormularios/type'
import CrudTemplate from '@/shared/views/CrudTemplate'

const estructura: FormularioEstructura = {
  nombre: {
    type: 'text',
    label: 'Nombre',
    required: true,
    placeholder: 'Ingrese un nombre'
  }
}

function RolesVista() {
  return <CrudTemplate estructura={estructura} url="roles" />
}

export default RolesVista
