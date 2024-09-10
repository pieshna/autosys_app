'use client'
import Link from 'next/link'
import { useState } from 'react'
import ReactPaginate from 'react-paginate'
import CardsCustom from '../Cards'
import CuerpoTabla from './CuerpoTabla'
import EncabezadosTabla from './EncabezadosTabla'
import FiltroBusqueda from './FiltroBusqueda'
import { getHeaderName } from './funciones'

interface TableProps {
  data: any[]
  enumerar?: boolean
  acciones?: {
    editar?: (item: string) => string
    eliminar?: (item: string) => void
    editarPerso?: (item: string) => void
  }
  hideCamps?: string[]
  hideCampsCard?: string[]
  onColumnSelected?: (item: any, column: string) => void
  agregarBuscador?: boolean
  itemsPerPage?: number
  headerName?: headerProps[]
  idName: string
  showTable?: boolean
  cardHeader?: string[]
}

export type headerProps = {
  header: string
  value: string
}

const TablaCustom = ({
  data,
  enumerar,
  acciones,
  hideCamps = [],
  onColumnSelected,
  agregarBuscador = false,
  itemsPerPage = 5,
  headerName = [],
  idName,
  showTable = true,
  cardHeader = [],
  hideCampsCard = []
}: TableProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedField, setSelectedField] = useState('')
  const [currentPage, setCurrentPage] = useState(0)

  if (data?.length === 0 || !data) {
    return <p>No hay datos disponibles.</p>
  }

  const union = [...hideCamps, ...hideCampsCard]

  const headers = Object.keys(data[0]).filter(
    (header) => !union.includes(header)
  )

  const handleFieldSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(0)
    setSelectedField(e.target.value)
    setSearchTerm('')
  }

  const filteredData = data.filter((item) => {
    if (item[selectedField] === null) return
    if (!selectedField)
      return Object.values(item).some(
        (value) =>
          typeof value === 'string' &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    if (!isNaN(item[selectedField])) {
      return selectedField
        ? item[selectedField]
            .toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        : Object.values(item).some(
            (value) =>
              typeof value === 'string' &&
              value.toLowerCase().includes(searchTerm.toLowerCase())
          )
    }
    return selectedField
      ? item[selectedField].toLowerCase().includes(searchTerm.toLowerCase())
      : Object.values(item).some(
          (value) =>
            typeof value === 'string' &&
            value.toLowerCase().includes(searchTerm.toLowerCase())
        )
  })

  const pageCount = Math.ceil(filteredData.length / itemsPerPage)
  const offset = currentPage * itemsPerPage
  const currentPageData = filteredData.slice(offset, offset + itemsPerPage)

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected)
  }

  const pieCard = (item: any) => {
    return (
      <>
        {acciones && (
          <div className="w-full flex flex-row justify-between px-2">
            {acciones.editar && (
              <Link
                href={acciones.editar(item.id || item[idName])}
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
              >
                <span>Editar</span>
              </Link>
            )}
            {acciones.editarPerso && (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
                onClick={() => {
                  if (acciones.editarPerso) {
                    acciones.editarPerso(item.id || item[idName])
                  }
                }}
              >
                Editar
              </button>
            )}
            {acciones.eliminar && (
              <button
                className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-lg ml-4"
                onClick={() => acciones.eliminar!(item.id || item[idName])}
              >
                Eliminar
              </button>
            )}
          </div>
        )}
      </>
    )
  }

  const cabezaCard = (item: any) => {
    return (
      <div className="w-full flex flex-row justify-between px-2 gap-2">
        {cardHeader.map((header, index) => (
          <p
            className={
              index == 0
                ? 'font-semibold text-xl text-pretty '
                : 'text-xl text-pretty'
            }
            key={header}
            onClick={() => onColumnSelected && onColumnSelected(item, header)}
          >
            {item[header]}{' '}
            {/* Aquí utilizamos el item actual en lugar de data[0] */}
          </p>
        ))}
      </div>
    )
  }

  return (
    <div className="pt-4">
      {agregarBuscador && (
        <FiltroBusqueda
          headers={headers}
          handleFieldSelected={handleFieldSelected}
          headerName={headerName}
          searchTerm={searchTerm}
          selectedField={selectedField}
          setSearchTerm={setSearchTerm}
          setCurrentPage={setCurrentPage}
        />
      )}
      {showTable && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <EncabezadosTabla
              headers={headers}
              enumerar={enumerar}
              headerName={headerName}
              acciones={typeof acciones !== 'undefined'}
            />
            <CuerpoTabla
              currentPageData={currentPageData}
              offset={offset}
              headers={headers}
              enumerar={enumerar}
              acciones={acciones}
              idName={idName}
              onColumnSelected={onColumnSelected}
            />
          </table>
        </div>
      )}
      {!showTable && (
        <div className="grid grid-cols-1 gap-3 p-3">
          {currentPageData.map((item, index) => (
            <CardsCustom
              key={index}
              header={cabezaCard(item)}
              footer={pieCard(item)}
            >
              {Object.keys(item)
                .filter((key) => !union.includes(key))
                .map((key) => (
                  <div key={key} className="px-2 ">
                    {cardHeader.includes(key) ? (
                      ''
                    ) : (
                      <p>
                        <strong>{getHeaderName(key, headerName)}:</strong>{' '}
                        {item[key]}
                      </p>
                    )}
                  </div>
                ))}
            </CardsCustom>
          ))}
        </div>
      )}
      {filteredData.length > itemsPerPage && (
        <div className="p-3">
          <ReactPaginate
            previousLabel={'Anterior'}
            nextLabel={'Siguiente'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={pageCount}
            forcePage={currentPage}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            activeClassName={'[&>a]:bg-gray-400'}
            className="flex justify-center"
            pageLinkClassName="px-2 mx-1 bg-gray-200 hover:bg-gray-400 rounded"
            nextClassName="px-2 mx-1 bg-gray-200 hover:bg-gray-400 rounded"
            previousClassName="px-2 mx-1 bg-gray-200 hover:bg-gray-400 rounded"
          />
        </div>
      )}
    </div>
  )
}

export default TablaCustom
