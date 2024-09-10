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
      url: 'roles',
      id: 'id',
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

  const headersValues: headerProps[] = [
    { header: 'Creacion', value: 'created_at' },
    { header: 'Actualizacion', value: 'updated_at' },
    { header: 'Usuario', value: 'username' }
  ]

  return (
    <CrudTemplate
      estructura={estructura}
      estructuraEditar={estructuraEditar()}
      url={`usuarios`}
      itemsPorPaginaFormulario={2}
      headerName={headersValues}
      agregarBuscador
    />
  )
}

export default UsuariosList
