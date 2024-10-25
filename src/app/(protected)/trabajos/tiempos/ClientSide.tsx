'use client'
import WrapperDnD from '@/shared/components/Dnd/Wrapper'
import EditForm from '@/shared/components/EditForm'
import ModalGeneric from '@/shared/components/ModalGeneric'
import tiket from '@/shared/components/reporteria/tiket'
import { getCookieClientSide } from '@/shared/tools/cookies/tokenClientSide'
import { fetchPersonalizado } from '@/shared/tools/fetchPersonalizado'
import { useEffect, useState } from 'react'
import { estructuraTrabajos } from '../page'
import FormularioVale from './FormularioVale'

const token = getCookieClientSide('token')

function TiemposTrabajos() {
  const [data, setData] = useState([])
  const [reloadme, setReloadme] = useState(false)
  const [datapdf, setDatapdf] = useState<any>(undefined)
  const [id, setId] = useState()
  const [showModal, setShowModal] = useState()
  useEffect(() => {
    fetchPersonalizado('trabajos/disponibles', 'GET', token).then((data) => {
      setData(data)
    })
  }, [reloadme])

  useEffect(() => {
    if (!datapdf) return
    if (typeof window !== 'undefined') tiket('print', datapdf)
  }, [datapdf])

  const handleSubmit = (data: any) => {
    fetchPersonalizado('trabajos', 'PUT', token, data).then((data) => {
      setTimeout(() => {
        setReloadme(!reloadme)
        //todo esto generara un reporte de los trabajos que se movieron a finalizado
      }, 1000)
    })
  }

  const handleChange = (datos: any) => {
    setDatapdf(undefined)
    const data = datos.find((item: any) => item.parent === 'Terminado')
    if (!data) return
    handleSubmit(datos)
    setId(data.id)
  }

  const handleClose = () => {
    setShowModal(id)
    setId(undefined)
  }

  const handleCloseModal = () => {
    fetchPersonalizado('trabajos/recibo/' + showModal, 'GET', token).then(
      (data) => {
        setDatapdf(data)
      }
    )
    //setDatapdf(dataTemp)
    //setData(datos.filter((item: any) => item.parent !== 'Terminado'))
    setShowModal(undefined)
  }

  return (
    <>
      <WrapperDnD
        contents={['En Proceso', 'Terminado']}
        submit={handleSubmit}
        data={data}
        change={handleChange}
        keyShow={['cliente', 'placa', 'descripcion']}
      />
      {id && (
        <EditForm
          estructuraData={estructuraTrabajos}
          textTitle="Editar Trabajo"
          url={'trabajos/' + id}
          close={handleClose}
        />
      )}
      {showModal && (
        <ModalGeneric
          textTitle="Agregar Vales"
          onCloseEvent={true}
          closeEvent={handleCloseModal}
          openDefault={true}
          sizeModal="5xl"
        >
          <FormularioVale id={showModal} />
        </ModalGeneric>
      )}
    </>
  )
}

export default TiemposTrabajos
