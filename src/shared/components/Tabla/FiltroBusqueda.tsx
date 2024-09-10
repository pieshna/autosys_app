import { headerProps } from './TablaCustom'
import { getHeaderName } from './funciones'

interface FiltroBusquedaProps {
  selectedField: string
  handleFieldSelected: (e: React.ChangeEvent<HTMLSelectElement>) => void
  headers: string[]
  headerName: headerProps[]
  searchTerm: string
  setSearchTerm: (value: string) => void
  setCurrentPage: (value: number) => void
}

const FiltroBusqueda = ({
  selectedField,
  handleFieldSelected,
  headers,
  headerName = [],
  searchTerm,
  setSearchTerm,
  setCurrentPage
}: FiltroBusquedaProps) => {
  const handleSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setCurrentPage(0)
  }

  return (
    <div className="flex flex-row flex-wrap md:justify-end pb-2 gap-x-2">
      <select
        value={selectedField}
        className="border rounded p-1"
        onChange={handleFieldSelected}
      >
        <option value="">Buscar en todos los campos</option>
        {headers.map((header) => (
          <option key={header} value={header}>
            Buscar en {getHeaderName(header, headerName)}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="🔍Buscar..."
        className="border rounded p-1 w-56"
        value={searchTerm}
        onChange={handleSearchTerm}
      />
    </div>
  )
}

export default FiltroBusqueda
