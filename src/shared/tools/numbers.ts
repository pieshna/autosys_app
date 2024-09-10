export const parseNumberToCurrency = (num: number) => {
  return new Intl.NumberFormat('es-GT', {
    style: 'currency',
    currency: 'GTQ'
  }).format(isNaN(num) ? 0 : num)
}
