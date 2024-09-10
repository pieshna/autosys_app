'use client'
import { confirmAlert } from 'react-confirm-alert' // Import
import 'react-confirm-alert/src/react-confirm-alert.css'
import { fetchPersonalizado } from '../tools/fetchPersonalizado'
import { getCookieClientSide } from '../tools/cookies/tokenClientSide'
import { toast } from 'sonner'
import { Spinner } from '@nextui-org/react'

interface DeleteModalProps {
  show: boolean
  title: string
  message?: string
}

function Loader({ show = true, title, message }: DeleteModalProps) {
  const submit = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        if (!show) onClose()
        return (
          <div className="flex flex-col bg-gray-100 border-gray-950 border-2 shadow-xl rounded-xl p-4 gap-2">
            <Spinner color="primary" />
            <h1 className="text-center font-semibold text-xl">{title}</h1>
            <p className="text-center">{message}</p>
          </div>
        )
      },
      onClickOutside() {}
    })
  }

  submit()
  return <></>
}

export default Loader
