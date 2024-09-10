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
  const hideCols = ['rol_id']

  return (
    <CrudTemplate
      estructura={estructura}
      idName="rol_id"
      url="roles"
      hideCols={hideCols}
    />
  )
}

export default RolesVista
