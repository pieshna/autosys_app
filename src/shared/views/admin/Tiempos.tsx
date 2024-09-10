import { headerProps } from '@/shared/components/Tabla/TablaCustom'
import { estructuraTiempos } from '@/shared/estructurasFormularios/tiempo'
import CrudTemplate from '@/shared/views/CrudTemplate'

interface TiemposViewProps {
  agrgarBuscador?: boolean
  headerName?: headerProps[]
  hideCols?: string[]
  enumerar?: boolean
  itemsPorPaginaTabla?: number
}

function TiemposView({
  agrgarBuscador = false,
  headerName = [],
  hideCols = [],
  enumerar = false,
  itemsPorPaginaTabla = 5
}: TiemposViewProps) {
  return (
    <CrudTemplate
      estructura={estructuraTiempos}
      idName="administracion_id"
      url="administracion"
      hideCols={hideCols}
      headerName={headerName}
      agregarBuscador={agrgarBuscador}
      enumerar={enumerar}
      itemsPorPaginaTabla={itemsPorPaginaTabla}
    />
  )
}

export default TiemposView
