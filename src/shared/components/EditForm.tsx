'use client'

import FormularioGenerico from '@/shared/components/forms/FormularioGenerico'
import { getCookieClientSide } from '@/shared/tools/cookies/tokenClientSide'
import { fetchPersonalizado } from '@/shared/tools/fetchPersonalizado'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure
} from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { FormProps } from './createEdit.interface'

const EditForm = ({
  estructuraData,
  url,
  buttonSubmitText,
  toastMessage = 'Editado con Exito',
  textTitle,
  reload,
  close,
  idName = 'id',
  noColumnas = 1,
  sizeModal
}: FormProps) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const [data, setData] = useState()
  const token = getCookieClientSide('token')

  useEffect(() => {
    onOpen()
    fetchPersonalizado(url, 'GET', token).then((result) => {
      if (result) {
        setData(result[0])
      }
    })
  }, [])

  const handleSubmit = async (datosEnvio: any) => {
    delete datosEnvio[idName]
    //validar estructura y convertir datosEnvio a numero si es necesario
    Object.keys(estructuraData).forEach((key) => {
      if (estructuraData[key].type === 'number') {
        datosEnvio[key] = parseFloat(datosEnvio[key])
        if (isNaN(datosEnvio[key])) {
          delete datosEnvio[key]
        }
      }
    })
    Object.keys(datosEnvio).forEach(
      (key) => datosEnvio[key] === '' && delete datosEnvio[key]
    )
    await fetchPersonalizado(url, 'PUT', token, datosEnvio).then((data) => {
      if (!data) return
      reload && reload()
      if (close) close()
      onClose()
      toast.success(toastMessage)
    })
  }
  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        hideCloseButton
        onClose={close}
        size={sizeModal}
      >
        <ModalContent>
          <>
            {textTitle && (
              <ModalHeader className="flex flex-col gap-1">
                {textTitle}
              </ModalHeader>
            )}
            <ModalBody>
              {data && (
                <>
                  <FormularioGenerico
                    datosAMostrar={data}
                    formData={estructuraData}
                    onSubmitFunction={handleSubmit}
                    textoBoton={buttonSubmitText || 'Guardar'}
                    noColumnas={noColumnas}
                  />
                </>
              )}
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  )
}

export default EditForm
