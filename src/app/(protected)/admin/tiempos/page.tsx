import { headerProps } from '@/shared/components/Tabla/TablaCustom'
import TiemposView from '@/shared/views/admin/Tiempos'
import React from 'react'

function TiemposList() {
  const headers: headerProps[] = [{ header: 'Tiempo (seg)', value: 'Tiempo' }]
  const hideCols = ['administracion_id']
  return <TiemposView headerName={headers} hideCols={hideCols} />
}

export default TiemposList
