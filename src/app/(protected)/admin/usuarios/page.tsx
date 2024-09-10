import { FormularioEstructura } from '@/shared/estructurasFormularios/type'
import CrudTemplate from '@/shared/views/CrudTemplate'

const estructura: FormularioEstructura = {
  aplicacion_id: {
    type: 'select',
    label: 'Aplicacion',
    placeholder: 'Seleccione una aplicacion',
    required: true,
    url: 'aplicaciones',
    camposAMostrar: ['nombre'],
    id: 'aplicacion_id'
  },
  nombre: {
    type: 'text',
    label: 'Nombre',
    placeholder: 'Ingrese un nombre',
    required: true
  },
  apellido: {
    type: 'text',
    label: 'Apellido',
    placeholder: 'Ingrese un apellido',
    required: true
  },
  email: {
    type: 'email',
    label: 'Email',
    placeholder: 'Ingrese un email',
    required: false
  },
  username: {
    type: 'text',
    label: 'Username',
    placeholder: 'Ingrese un username',
    required: true
  },
  password: {
    type: 'password',
    label: 'Password',
    placeholder: 'Ingrese un password',
    required: true
  }
}

const estructuraEditar = () => {
  const estructuraTemp = { ...estructura }
  delete estructuraTemp.password
  return estructuraTemp
}

const hideCols = ['usuario_id', 'aplicacion_id']

function UsuariosList() {
  return (
    <CrudTemplate
      estructura={estructura}
      estructuraEditar={estructuraEditar()}
      idName="usuario_id"
      url="usuarios"
      itemsPorPaginaFormulario={2}
      hideCols={hideCols}
    />
  )
}

export default UsuariosList
