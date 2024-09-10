'use client'
import { confirmAlert } from 'react-confirm-alert' // Import
import 'react-confirm-alert/src/react-confirm-alert.css'
import { fetchPersonalizado } from '../tools/fetchPersonalizado'
import { getCookieClientSide } from '../tools/cookies/tokenClientSide'
import { toast } from 'sonner'

interface DeleteModalProps {
  url: string
  id: string
  hideModal: () => void
  reload: () => void
  title: string
  message?: string
  toastMessage?: string
}

function DeleteModal({
  url,
  id,
  hideModal,
  reload,
  title,
  message,
  toastMessage
}: DeleteModalProps) {
  const submit = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="flex flex-col bg-gray-100 border-gray-950 border-2 shadow-xl rounded-xl p-4 gap-2">
            <h1 className="text-center font-semibold text-xl">{title}</h1>
            <p className="text-center">{message}</p>
            <div className="flex gap-4 justify-between p-4">
              <button
                className="py-2 px-6 rounded border bg-blue-300 border-gray-950 hover:bg-blue-500"
                onClick={() => {
                  hideModal()
                  onClose()
                }}
              >
                No
              </button>
              <button
                className="py-2 px-6 rounded border bg-red-300 border-gray-950 hover:bg-red-500"
                onClick={() => {
                  handleYes()
                  onClose()
                }}
              >
                Si
              </button>
            </div>
          </div>
        )
      },
      onClickOutside() {
        hideModal()
      }
    })
  }

  const handleYes = () => {
    fetchPersonalizado(
      `${url}/${id}`,
      'DELETE',
      getCookieClientSide('token')
    ).then((res) => {
      toast.success(toastMessage || 'Eliminado con Exito')
      reload()
      hideModal()
    })
  }
  submit()
  return <></>
}

export default DeleteModal
