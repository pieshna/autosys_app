'use client'

import FormularioGenerico from '@/shared/components/forms/FormularioGenerico'
import { getCookieClientSide } from '@/shared/tools/cookies/tokenClientSide'
import { fetchPersonalizado } from '@/shared/tools/fetchPersonalizado'
import { toast } from 'sonner'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure
} from '@nextui-org/react'
import { FormProps } from './createEdit.interface'

const CreateForm = ({
  estructuraData,
  url,
  buttonSubmitText,
  toastMessage = 'Creado con Exito',
  textTitle,
  reload,
  textButtonModal = 'Crear',
  noColumnas = 1,
  sizeModal,
  typeButtonSubmit = 'submit'
}: FormProps) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const handleSubmit = async (datosEnvio: any) => {
    // eliminar campos vacios para no enviarlos al backend al momento de crear
    Object.keys(datosEnvio).forEach(
      (key) => datosEnvio[key] === '' && delete datosEnvio[key]
    )

    //validar estructura y convertir datosEnvio a numero si es necesario
    Object.keys(estructuraData).forEach((key) => {
      if (estructuraData[key].type === 'number') {
        datosEnvio[key] = parseFloat(datosEnvio[key])
      }
    })

    const token = getCookieClientSide('token')
    await fetchPersonalizado(url, 'POST', token, datosEnvio).then((data) => {
      if (!data) return
      reload && reload()
      onClose()
      toast.success(toastMessage)
    })
  }
  return (
    <>
      <Button
        onPress={onOpen}
        color="primary"
        style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}
      >
        {textButtonModal}
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        hideCloseButton
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
              <FormularioGenerico
                datosAMostrar={{}}
                formData={estructuraData}
                onSubmitFunction={handleSubmit}
                textoBoton={buttonSubmitText || 'Crear'}
                noColumnas={noColumnas}
                typeButtonSubmit={typeButtonSubmit}
              />
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreateForm
