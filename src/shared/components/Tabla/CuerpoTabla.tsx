import { getCookieClientSide } from '@/shared/tools/cookies/tokenClientSide'
import { GetDecodedToken } from '@/shared/tools/token/tokenFromClient'
import Link from 'next/link'

const decoded = GetDecodedToken(getCookieClientSide('token'))

interface CuerpoTablaProps {
  currentPageData: any[]
  offset: number
  headers: string[]
  enumerar?: boolean
  acciones?: {
    editar?: (item: string) => string
    eliminar?: (item: string) => void
    editarPerso?: (item: string) => void
  }
  onColumnSelected?: (item: any, column: string) => void
  idName: string
}

const CuerpoTabla = ({
  currentPageData,
  headers,
  idName,
  offset,
  acciones,
  enumerar,
  onColumnSelected
}: CuerpoTablaProps) => {
  return (
    <tbody className="bg-slate-400 divide-y divide-gray-200">
      {currentPageData.map((item, index) => (
        <tr key={index} className={index % 2 == 0 ? '' : 'bg-gray-100/30'}>
          {enumerar && (
            <td className="px-6 py-4 whitespace-nowrap">
              {offset + index + 1}
            </td>
          )}
          {headers.map((header) => (
            <td
              key={header}
              className="px-6 py-4 whitespace-nowrap"
              onClick={() => onColumnSelected?.(item, header)}
            >
              {item[header]}
            </td>
          ))}
          {acciones && (
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              {acciones.editar && (
                <Link href={acciones.editar(item.id || item[idName])}>
                  <span className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
                    Editar
                  </span>
                </Link>
              )}
              {acciones.editarPerso &&
                decoded?.rol?.toUpperCase() !== 'trabajador'.toUpperCase() && (
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
              {acciones.eliminar &&
                decoded?.rol?.toUpperCase() !== 'trabajador'.toUpperCase() && (
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-lg ml-4"
                    onClick={() => acciones.eliminar!(item.id || item[idName])}
                  >
                    Quitar
                  </button>
                )}
            </td>
          )}
        </tr>
      ))}
    </tbody>
  )
}

export default CuerpoTabla
