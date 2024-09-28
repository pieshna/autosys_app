import { FormularioEstructura } from '@/shared/estructurasFormularios/type'
import CrudTemplate from '@/shared/views/CrudTemplate'

function Trabajadores() {
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
    porcentaje: {
      type: 'number',
      label: 'Porcentaje',
      placeholder: 'Ingrese un porcentaje',
      required: true
    },
    especialidad: {
      type: 'text',
      label: 'Especialidad',
      placeholder: 'Ingrese una especialidad',
      required: true
    },
    telefono: {
      type: 'number',
      label: 'Teléfono',
      placeholder: 'Ingrese un teléfono',
      required: false
    },
    direccion: {
      type: 'text',
      label: 'Dirección',
      placeholder: 'Ingrese una dirección',
      required: false
    }
  }

  const estrucutraEditar = JSON.parse(JSON.stringify(estructura))
  delete estrucutraEditar.usuario_id

  return (
    <CrudTemplate
      estructura={estructura}
      estructuraEditar={estrucutraEditar}
      agregarBuscador
      url="trabajadores"
      itemsPorPaginaFormulario={1}
    ></CrudTemplate>
  )
}

export default Trabajadores
