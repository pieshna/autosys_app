'use client'
import TabsCustom, { TabsChildrenProps } from '@/shared/components/TabsCustom'
import { getCookieClientSide } from '@/shared/tools/cookies/tokenClientSide'
import { fetchPersonalizado } from '@/shared/tools/fetchPersonalizado'
import { IconArticle, IconList } from '@tabler/icons-react'
import { useState } from 'react'
import { toast } from 'sonner'
import Repuestos from '../../repuestos/page'
import Vales from '../../vales/page'

const token = getCookieClientSide('token')

function FormularioVale({ id }: { id?: string }) {
  const [key, setKey] = useState('1')
  const [codigo, setCodigo] = useState('')
  const handleRepuestos = (item: any, column: any) => {
    fetchPersonalizado('trabajos_repuestos', 'POST', token, {
      repuesto_id: item.id,
      trabajo_id: id,
      cantidad: 1
    }).then((data) => {
      if (data) {
        toast.success('Repuesto agregado al trabajo con exito')
      }
    })
  }

  const handleVales = (item: any, column: any) => {
    fetchPersonalizado('vales_trabajos', 'POST', token, {
      vale_id: item.id,
      trabajo_id: id
    }).then((data) => {
      if (data) {
        toast.success('Vale agregado al trabajo con exito')
      }
    })
  }

  const childrens: TabsChildrenProps[] = [
    {
      child: <Repuestos selectColumn={handleRepuestos} />,
      title: 'Repuestos',
      icon: <IconList />,
      key: '1'
    },
    {
      child: <Vales selectColumn={handleVales} />,
      title: 'Vales',
      icon: <IconArticle />,
      key: '2'
    }
  ]

  return (
    <>
      <TabsCustom
        selectedKey={key}
        fullWidth
        items={childrens}
        onSelectionChange={(key) => setKey(key as string)}
        classNames={{
          panel: 'flex flex-col flex-grow'
        }}
      />
    </>
  )
}

export default FormularioVale
