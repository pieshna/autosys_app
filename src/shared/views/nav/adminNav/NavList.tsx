import { headerProps } from '@/shared/components/Tabla/TablaCustom'
import { navEstructura } from '@/shared/estructurasFormularios/nav'
import CrudTemplate from '../../CrudTemplate'

function NavList() {
  const hideCols = ['id', 'parent_id', 'icon']

  const header: headerProps[] = [
    { header: 'Titulo', value: 'title' },
    { header: 'URL', value: 'link' }
  ]

  return (
    <CrudTemplate
      estructura={navEstructura}
      headerName={header}
      url="nav"
      hideCols={hideCols}
      agregarBuscador
    />
  )
}

export default NavList
