import { FormularioEstructura } from '@/shared/estructurasFormularios/type'
import CrudTemplate from '@/shared/views/CrudTemplate'

const estructura: FormularioEstructura = {
  usuario_id: {
    type: 'select',
    label: 'Usuario',
    required: true,
    placeholder: 'Seleccione un usuario',
    url: 'usuarios',
    camposAMostrar: ['nombre', 'apellido'],
    join: ' ',
    id: 'usuario_id'
  },
  rol_id: {
    type: 'select',
    label: 'Rol',
    placeholder: 'Seleccione un rol',
    required: true,
    url: 'roles',
    camposAMostrar: ['nombre'],
    id: 'rol_id'
  }
}

function AsignacionUsuariosRoles() {
  const hideCols = ['usuario_rol_id', 'usuario_id', 'rol_id']
  return (
    <CrudTemplate
      estructura={estructura}
      idName="usuario_rol_id"
      url="usuarios-roles"
      hideCols={hideCols}
      agregarBuscador
    />
  )
}

export default AsignacionUsuariosRoles
