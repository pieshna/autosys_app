'use client'
import ModalGeneric from '@/shared/components/ModalGeneric'
import TablaCustom from '@/shared/components/Tabla/TablaCustom'
import TabsCustom, { TabsChildrenProps } from '@/shared/components/TabsCustom'
import { getCookieClientSide } from '@/shared/tools/cookies/tokenClientSide'
import { fetchPersonalizado } from '@/shared/tools/fetchPersonalizado'
import { Button } from '@nextui-org/react'
import { IconArticle, IconList } from '@tabler/icons-react'
import { useState } from 'react'
import { toast } from 'sonner'
import Repuestos from '../../repuestos/page'
import Vales from '../../vales/page'

const token = getCookieClientSide('token')

function FormularioVale({ id, close }: { id?: string; close: any }) {
  const [key, setKey] = useState('1')
  const [repuestos, setRepuestos] = useState<any[]>([])
  const [vales, setVales] = useState<any[]>([])
  const handleSubmitRepuestos = () => {
    const tmp = repuestos.map((item) => {
      return {
        trabajo_id: item.trabajo_id,
        repuesto_id: item.repuesto_id,
        cantidad: item.cantidad
      }
    })
    fetchPersonalizado('trabajos_repuestos', 'POST', token, {
      tmp
    }).then((data) => {
      if (data) {
        toast.success('Repuesto agregado al trabajo con exito')
      }
    })
  }

  const handleSubmit = () => {
    if (repuestos.length > 0) handleSubmitRepuestos()
    if (vales.length > 0) handleSubmitVale()
    setTimeout(() => {
      close()
    }, 2000)
  }

  const handleRepuestos = (item: any, column: any) => {
    const data = [
      ...repuestos,
      {
        repuesto_id: item.id,
        trabajo_id: id,
        cantidad: 1,
        ...item
      }
    ]
    setRepuestos(data)
  }

  const handleVales = (item: any, column: any) => {
    const data = [
      ...vales,
      {
        vale_id: item.id,
        trabajo_id: id,
        nombre: item.repuesto + ' (vale)',
        ...item
      }
    ]
    setVales(data)
  }

  const handleSubmitVale = () => {
    const tmp = vales.map((item) => {
      return {
        vale_id: item.vale_id,
        trabajo_id: item.trabajo_id
      }
    })
    fetchPersonalizado('vales_trabajos', 'POST', token, {
      tmp
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

  const handleEliminar = (id: any) => {
    //eliminamos de repuestos y o vales lo que venga con id con la limitante que solo sea 1 por si se repite
    const rep = repuestos.filter((rep) => rep.id !== id)
    const val = vales.filter((val) => val.id !== id)
    setRepuestos(rep)
    setVales(val)
  }

  return (
    <>
      <ModalGeneric
        textTitle="Seleccione para agregar"
        textButtonModal="Buscar"
        onCloseEvent
        buttonClose
        sizeModal="4xl"
      >
        <TabsCustom
          selectedKey={key}
          fullWidth
          items={childrens}
          onSelectionChange={(key) => setKey(key as string)}
          classNames={{
            panel: 'flex flex-col flex-grow'
          }}
        />
      </ModalGeneric>
      {[...repuestos, ...vales].length > 0 && (
        <TablaCustom
          data={[...repuestos, ...vales]}
          idName="id"
          acciones={{ eliminar: handleEliminar }}
          hideCamps={[
            'id',
            'trabajo_id',
            'repuesto_id',
            'vale_id',
            'trabajo_id'
          ]}
        />
      )}
      {[...repuestos, ...vales].length === 0 && (
        <p className="text-center text-3xl py-6">No hay datos</p>
      )}
      <Button onClick={handleSubmit}>Guardar</Button>
    </>
  )
}

export default FormularioVale
