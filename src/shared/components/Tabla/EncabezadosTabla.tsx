import { headerProps } from './TablaCustom'
import { getHeaderName } from './funciones'

interface EncabezadosTablaProps {
  headers: string[]
  enumerar?: boolean
  acciones?: boolean
  headerName?: headerProps[]
}

const EncabezadosTabla = ({
  headers,
  enumerar,
  acciones,
  headerName = []
}: EncabezadosTablaProps) => {
  return (
    <thead className="bg-gray-50">
      <tr>
        {enumerar && (
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            #
          </th>
        )}
        {headers.map((header) => (
          <th
            key={header}
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
          >
            {getHeaderName(header, headerName)}
          </th>
        ))}
        {acciones && (
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Acciones
          </th>
        )}
      </tr>
    </thead>
  )
}

export default EncabezadosTabla
