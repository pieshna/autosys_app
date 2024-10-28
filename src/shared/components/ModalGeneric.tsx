'use client'

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure
} from '@nextui-org/react'
import { useEffect } from 'react'
import { FormProps } from './createEdit.interface'

interface ModalGenericProps {
  textTitle: FormProps['textTitle']
  textButtonModal?: FormProps['textButtonModal']
  sizeModal?: FormProps['sizeModal']
  onCloseEvent: boolean
  closeEvent?: () => void
  openDefault?: boolean
  children: React.ReactNode
  buttonClose?: boolean
}

const ModalGeneric = ({
  textTitle,
  textButtonModal = 'Crear',
  sizeModal,
  onCloseEvent,
  closeEvent,
  openDefault = false,
  children,
  buttonClose
}: ModalGenericProps) => {
  const {
    isOpen,
    onOpen,
    onOpenChange: cambioEstadoModal,
    onClose
  } = useDisclosure()

  useEffect(() => {
    if (onCloseEvent) onClose()
  }, [onCloseEvent])

  useEffect(() => {
    if (openDefault) onOpen()
  }, [openDefault])

  const onOpenChange = () => {
    closeEvent && closeEvent()
    cambioEstadoModal()
  }

  return (
    <>
      {!openDefault && (
        <Button onPress={onOpen} color="primary">
          {textButtonModal}
        </Button>
      )}
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
              {children}
              {buttonClose && <Button onPress={onClose}>Cerrar</Button>}
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalGeneric
