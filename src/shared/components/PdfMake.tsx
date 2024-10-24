import { useEffect } from 'react'
import ticket, { datosRecibo } from './reporteria/tiket'

function PdfMake({ datos }: { datos: datosRecibo }) {
  useEffect(() => {
    ticket('print', datos)
  }, [datos])

  return <></>
}

export default PdfMake
