'use client'
import { Content } from 'pdfmake/interfaces'
import createPdf from './createPdf'

export interface datosRecibo {
  nombre: string
  fecha?: string
  marca?: string
  modelo?: string
  placa?: string
  productos: {
    nombre: string
    cantidad: number
    precio: number
  }[]
}

const generateTicket = async (output: any, data: datosRecibo) => {
  const content: Content = [
    {
      text: 'Recibo #' + Math.floor(Math.random() * 1000000),
      alignment: 'right',
      bold: true,
      fontSize: 28,
      margin: [10, 20]
    },
    {
      text: 'AUTOSYS LOGO',
      margin: [10, 10]
    },
    {
      text: 'Fecha: ' + (data.fecha ?? new Date().toLocaleDateString()),
      alignment: 'right',
      fontSize: 18,
      margin: [10, 10]
    },
    {
      text: 'Cliente: ' + data.nombre,
      margin: [10, 0],
      fontSize: 22
    },
    {
      text:
        'Marca: ' +
        data.marca +
        '\nModelo: ' +
        data.modelo +
        '\nPlaca: ' +
        data.placa,
      margin: [10, 10],
      fontSize: 15
    },
    {
      table: {
        widths: ['*', 'auto', 'auto', 'auto'],
        body: [
          [
            {
              text: 'Producto',
              bold: true
            },
            {
              text: 'Cantidad',
              bold: true
            },
            {
              text: 'Precio',
              bold: true
            },
            {
              text: 'Total',
              bold: true
            }
          ],
          ...data.productos.map((producto) => [
            producto.nombre,
            producto.cantidad,
            'Q' + producto.precio,
            'Q' + producto.cantidad * producto.precio
          ]),
          [
            {
              text: 'Total',
              colSpan: 3,
              bold: true
            },
            '',
            '',
            'Q' +
              data.productos.reduce(
                (acc, cur) => acc + cur.cantidad * cur.precio,
                0
              )
          ]
        ]
      },
      fontSize: 20,
      alignment: 'center',
      margin: [10, 10]
    },
    {
      text: 'Gracias por su compra',
      alignment: 'center',
      bold: true,
      marginTop: 20
    }
  ]

  const response = await createPdf({ content }, output)
  return response
}

export default generateTicket
