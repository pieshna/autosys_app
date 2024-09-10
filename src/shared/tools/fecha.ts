export const getFecha = () => {
  return new Date()
    .toLocaleString('sv', {
      timeZone: 'America/Mexico_City',
      timeZoneName: 'short'
    })
    .toString()
    .split(' ')[0]
}

export const getFechaHora = () => {
  return new Date()
    .toLocaleString('sv', {
      timeZone: 'America/Mexico_City',
      timeZoneName: 'short'
    })
    .toString()
}

export const parseFecha = (fecha: string) => {
  const fechaTmp= new Date(fecha)
    .toLocaleString('sv', {
      timeZone: 'America/Mexico_City',
      timeZoneName: 'short'
    })
    .toString()
    .split(' ')

    const fechaGT = fechaTmp[0].split('-').reverse().join('/')
    const hora = fechaTmp[1].split(':').slice(0, 2).join(':')
    return `${fechaGT} ${hora}`
}

export const calculateFechaByDays = (days: number) => {
  let date = new Date()
  date.setDate(date.getDate() + days)
  return date
    .toLocaleString('sv', {
      timeZone: 'America/Mexico_City',
      timeZoneName: 'short'
    })
    .toString()
    .split(' ')[0]
}

export const getDiferenciaDias = (fecha1: string, fecha2: string) => {
  let date1 = new Date(fecha1)
  let date2 = new Date(fecha2)
  let difference = date2.getTime() - date1.getTime()
  return difference / (1000 * 60 * 60 * 24)
}
