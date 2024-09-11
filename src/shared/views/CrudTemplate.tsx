'use client'
import CreateForm from '@/shared/components/CreateForm'
import EditForm from '@/shared/components/EditForm'
import TablaCustom, { headerProps } from '@/shared/components/Tabla/TablaCustom'
import { FormularioEstructura } from '@/shared/estructurasFormularios/type'
import { getCookieClientSide } from '@/shared/tools/cookies/tokenClientSide'
import { fetchPersonalizado } from '@/shared/tools/fetchPersonalizado'
import { useEffect, useState } from 'react'
import { sizeModalType } from '../components/createEdit.interface'
import DeleteModalV2 from '../components/DeleteModalV2'
import { detectViewPort } from '../tools/detectViewPort'

export interface CrudProps {
  estructura: FormularioEstructura
  estructuraEditar?: FormularioEstructura
  url: string
  urlCrear?: string
  urlEditar?: string
  urlEliminar?: string
  idName?: string
  textos?: Textos
  toastMessages?: ToastMessages
  hideCols?: string[]
  agregarBuscador?: boolean
  headerName?: headerProps[]
  enumerar?: boolean
  itemsPorPaginaTabla?: number
  itemsPorPaginaFormulario?: number
  sizeModal?: sizeModalType
  textDeleteModal?: string
  cabezaCard?: string[]
}

interface Textos {
  creacion?: string
  edicion?: string
  eliminacion?: string
}
interface ToastMessages {
  creacion?: string
  edicion?: string
  eliminacion?: string
}

function CrudTemplate({
  estructura,
  estructuraEditar = estructura,
  url,
  urlCrear = url,
  urlEditar = url,
  urlEliminar = url,
  idName = 'id',
  textos,
  toastMessages,
  hideCols,
  agregarBuscador,
  headerName,
  enumerar,
  itemsPorPaginaFormulario,
  itemsPorPaginaTabla,
  sizeModal,
  textDeleteModal,
  cabezaCard = []
}: CrudProps) {
  const viwport = detectViewPort()
  const [data, setData] = useState([])
  const [recargar, setRecargar] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [idSelected, setIdSelected] = useState<string>('')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [idToDelete, setIdToDelete] = useState('')
  const token = getCookieClientSide('token')

  useEffect(() => {
    fetchPersonalizado(url, 'GET', token).then((result) => {
      setData(result)
    })
  }, [token, recargar])

  const reload = () => {
    setRecargar(!recargar)
  }

  const editar = (id: string) => {
    setIdSelected(id)
    setOpenEdit(true)
  }

  const closeEdit = () => {
    setOpenEdit(false)
  }

  const eliminar = (id: string) => {
    setIdToDelete(id)
    setShowDeleteModal(true)
  }

  const hideModal = () => {
    setShowDeleteModal(false)
  }

  return (
    <>
      {showDeleteModal && (
        <DeleteModalV2
          title={textDeleteModal || 'Eliminar'}
          message="¿Está seguro que desea eliminar?"
          url={urlEliminar}
          id={idToDelete}
          reload={reload}
          close={hideModal}
        />
      )}
      <CreateForm
        estructuraData={estructura}
        textTitle={textos?.creacion || 'Crear'}
        toastMessage={toastMessages?.creacion || 'Creado con Exito'}
        url={urlCrear}
        reload={reload}
        noColumnas={itemsPorPaginaFormulario}
        sizeModal={sizeModal}
      />
      <TablaCustom
        idName={idName}
        data={data}
        acciones={{ editarPerso: editar, eliminar }}
        hideCamps={hideCols}
        agregarBuscador={agregarBuscador}
        headerName={headerName}
        enumerar={enumerar}
        itemsPerPage={itemsPorPaginaTabla}
        cardHeader={cabezaCard}
        showTable={viwport === 'desktop' || viwport === undefined}
      />
      {openEdit && (
        <EditForm
          idName={idName}
          estructuraData={estructuraEditar}
          textTitle={textos?.edicion || 'Editar'}
          url={`${urlEditar}/${idSelected}`}
          toastMessage={toastMessages?.edicion || 'Editado con Exito'}
          reload={reload}
          close={closeEdit}
          noColumnas={itemsPorPaginaFormulario}
          sizeModal={sizeModal}
        />
      )}
    </>
  )
}

export default CrudTemplate
