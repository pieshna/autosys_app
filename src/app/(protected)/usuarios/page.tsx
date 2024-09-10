import { headerProps } from '@/shared/components/Tabla/TablaCustom'
import { FormularioEstructura } from '@/shared/estructurasFormularios/type'
import { getCookieServerSide } from '@/shared/tools/cookies/tokenServerSide'
import { GetDecodedToken } from '@/shared/tools/token/tokenFromClient'
import CrudTemplate from '@/shared/views/CrudTemplate'

function UsuariosList() {
  const { aplicacionId } = GetDecodedToken(getCookieServerSide('token'))

  const estructura: FormularioEstructura = {
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
    username: {
      type: 'text',
      label: 'Usuario',
      placeholder: 'Ingrese un username',
      required: true
    },
    rol_id: {
      type: 'autocomplete',
      label: 'Rol',
      required: true,
      url: 'roles/admin',
      id: 'rol_id',
      camposAMostrar: ['nombre'],
      placeholder: 'Seleccione rol'
    },
    password: {
      type: 'password',
      label: 'Contraseña',
      placeholder: 'Ingrese un password',
      required: true
    }
  }

  const estructuraEditar = () => {
    const estructuraTemp = { ...estructura }
    delete estructuraTemp.password
    return estructuraTemp
  }

  const hideCols = ['usuario_id', 'aplicacion_id', 'email', 'aplicacion']

  const headersValues: headerProps[] = [
    { header: 'Creacion', value: 'created_at' },
    { header: 'Actualizacion', value: 'updated_at' },
    { header: 'Usuario', value: 'username' }
  ]

  return (
    <CrudTemplate
      estructura={estructura}
      estructuraEditar={estructuraEditar()}
      idName="usuario_id"
      url={`usuarios/aplicacion/${aplicacionId}`}
      urlCrear="usuarios"
      urlEditar="usuarios"
      urlEliminar="usuarios"
      itemsPorPaginaFormulario={2}
      hideCols={hideCols}
      headerName={headersValues}
    />
  )
}

export default UsuariosList
