import { headerProps } from './TablaCustom'

export const getHeaderName = (header: string, headerName: headerProps[]) => {
  if (headerName.length === 0)
    return header.charAt(0).toUpperCase() + header.slice(1)
  const headerObj = headerName.find(
    (h) => h.value.toUpperCase() === header.toUpperCase()
  )
  return headerObj
    ? headerObj.header
    : header.charAt(0).toUpperCase() + header.slice(1)
}
