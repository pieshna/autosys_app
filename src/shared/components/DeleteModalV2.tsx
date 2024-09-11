'use client'

import { getCookieClientSide } from '@/shared/tools/cookies/tokenClientSide'
import { fetchPersonalizado } from '@/shared/tools/fetchPersonalizado'
import {
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure
} from '@nextui-org/react'
import { toast } from 'sonner'

interface DeleteModalProps {
  url: string
  id: string
  reload: () => void
  title: string
  message?: string
  toastMessage?: string
  close: () => void
}

function DeleteModalV2({
  url,
  id,
  reload,
  title,
  message,
  toastMessage,
  close
}: DeleteModalProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const handleYes = () => {
    fetchPersonalizado(
      `${url}/${id}`,
      'DELETE',
      getCookieClientSide('token')
    ).then((res) => {
      toast.success(toastMessage || 'Eliminado con Exito')
      reload()
      close()
    })
  }

  return (
    <>
      <Modal
        isOpen={true}
        onOpenChange={onOpenChange}
        placement="top-center"
        hideCloseButton
        onClose={close}
      >
        <ModalContent>
          <ModalBody>
            <h3 className="text-center font-bold">{title}</h3>
            <p className="text-center">{message}</p>
            <div className="flex gap-4 justify-between p-4">
              <button
                className="py-2 px-6 rounded border bg-blue-500 hover:bg-blue-700 text-white"
                onClick={() => {
                  close()
                  onClose()
                }}
              >
                No
              </button>
              <button
                className="py-2 px-6 rounded border bg-red-500 hover:bg-red-700 text-white ml-4"
                onClick={() => {
                  handleYes()
                  onClose()
                }}
              >
                Si
              </button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default DeleteModalV2
