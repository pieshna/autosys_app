import { toast } from 'sonner'
import { parseFecha } from './fecha'

/**
 * Realiza una petición personalizada al servidor.
 * @param url La URL a la que se realizará la petición.
 * @param method El método HTTP de la petición (GET, POST, PUT o DELETE).
 * @param token El token de autenticación a incluir en la petición, si la ruta lo requiere (opcional).
 * @param data Los datos a enviar en la petición (opcional).
 * @returns Los datos devueltos por el servidor, formateados con la función formatDates.
 */
export const fetchPersonalizado = async (
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  token: string | undefined = undefined,
  data?: Record<string, any>
) => {
  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  if (token) {
    if (typeof token === 'undefined') return
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`
    }
  }

  if (data) {
    if (method === 'PUT') {
      delete data.created_at
      delete data.updated_at
      config.body = JSON.stringify(data)
    } else {
      config.body = JSON.stringify(data)
    }
  }

  const datos = await fetch(
    `${process.env['NEXT_PUBLIC_HOST_API']}/${url}`,
    config
  ).then((res) => {
    if (res.status === 400) {
      return {
        mensaje: 'Error al procesar la petición',
        success: false
      }
    }
    if (res.status === 401) {
      return {
        mensaje: 'No autorizado, inicie sesión para continuar',
        success: false
      }
    }
    if (res.status === 404) {
      return {
        mensaje: 'Recurso no encontrado',
        success: false
      }
    }
    return res.json().catch(() => ({
      mensaje: 'Error al procesar la respuesta del servidor',
      success: false
    }))
  })

  try {
    if (datos.success === false) toast.error(datos.mensaje || datos.message)
  } catch (e) {}
  if (datos.success) return formatDates(datos.data)
  return null
}

/**
 * Convierte una fecha en formato ISO 8601 a una cadena de texto que indica cuánto tiempo ha pasado desde esa fecha hasta ahora.
 * @param date La fecha en formato ISO 8601.
 * @returns Una cadena de texto que indica cuánto tiempo ha pasado desde la fecha hasta ahora.
 */
const parseDate = (date: string) => {
  const fecha = new Date(date)
  const fechaActual = new Date()
  const diferencia = fechaActual.getTime() - fecha.getTime()
  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24))
  const horas = Math.floor(diferencia / (1000 * 60 * 60))
  const minutos = Math.floor(diferencia / (1000 * 60))
  const segundos = Math.floor(diferencia / 1000)

  if (dias > 0) {
    if (dias > 7) {
      return parseFecha(date)
    } else {
      return dias === 1 ? `hace ${dias} día` : `hace ${dias} días`
    }
  } else if (horas > 0) {
    return horas === 1 ? `hace ${horas} hora` : `hace ${horas} horas`
  } else if (minutos > 0) {
    return `hace ${minutos} minutos`
  } else {
    return `hace ${segundos} segundos`
  }
}

/**
 * Formatea las fechas de un conjunto de datos.
 * @param data El conjunto de datos a formatear.
 * @returns El conjunto de datos con las fechas formateadas.
 */
const formatDates = (data: any) => {
  if (!data[0]?.created_at) return data
  const newData = data.map((item: any) => {
    const newItem = { ...item }
    if (newItem.created_at) {
      newItem.creacion = parseDate(newItem.created_at)
      delete newItem.created_at
    }
    if (newItem.updated_at) {
      newItem.actualizacion = parseDate(newItem.updated_at)
      delete newItem.updated_at
    }
    return newItem
  })
  return newData
}
