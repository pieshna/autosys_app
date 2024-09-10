'use client'

import { Spinner } from '@nextui-org/react'
import ModalGeneric from './ModalGeneric'

function LoaderV2({
  title = 'Cargando',
  message = 'Por Favor Espere...'
}: {
  title?: string
  message?: string
}) {
  return (
    <ModalGeneric
      textTitle=""
      onCloseEvent={false}
      textButtonModal=""
      openDefault
    >
      <div className="flex flex-col p-4 gap-2">
        <Spinner color="primary" />
        <h1 className="text-center font-semibold text-xl">{title}</h1>
        <p className="text-center">{message}</p>
      </div>
    </ModalGeneric>
  )
}

export default LoaderV2
