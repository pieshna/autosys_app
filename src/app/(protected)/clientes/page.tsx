import { FormularioEstructura } from '@/shared/estructurasFormularios/type'
import CrudTemplate from '@/shared/views/CrudTemplate'

function Clientes() {
  const estructura: FormularioEstructura = {
    usuario_id: {
      type: 'autocomplete',
      label: 'Usuario',
      required: false,
      url: 'usuarios',
      id: 'id',
      camposAMostrar: ['nombre', 'apellido'],
      placeholder: 'Seleccione usuario existente',
      join: ' '
    },
    nombre: {
      type: 'text',
      label: 'Nombre',
      placeholder: 'Ingrese un nombre',
      required: false
    },
    apellido: {
      type: 'text',
      label: 'Apellido',
      placeholder: 'Ingrese un apellido',
      required: false
    },
    username: {
      type: 'text',
      label: 'Usuario',
      placeholder: 'Ingrese un username',
      required: false
    },
    rol_id: {
      type: 'autocomplete',
      label: 'Rol',
      required: false,
      url: 'roles',
      id: 'id',
      camposAMostrar: ['nombre'],
      placeholder: 'Seleccione rol'
    }
  }

  return (
    <CrudTemplate
      estructura={estructura}
      agregarBuscador
      url="clientes"
      itemsPorPaginaFormulario={1}
    ></CrudTemplate>
  )
}

export default Clientes
