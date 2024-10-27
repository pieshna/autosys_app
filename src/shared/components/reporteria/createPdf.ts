'use client'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

import printjs from 'print-js'

pdfMake.vfs = pdfFonts.pdfMake.vfs

const createPdf = async (props: any, output = 'print') => {
  if (!props) {
    console.log('No hay props')
    return new Promise((resolve, reject) => {
      reject({
        success: false,
        content: null,
        message: 'No hay props'
      })
    })
  }
  return new Promise((resolve, reject) => {
    try {
      const {
        pageSize = 'A4',
        pageMargins = [10, 10],
        watermark = {
          text: 'NO VALIDO',
          color: 'red'
        },
        info = {
          title: 'F001-000001',
          author: 'maclode',
          subject: 'ticket',
          keywords: 'tck, sale'
        },
        styles = {
          header: {
            fontSize: 9,
            bold: true,
            alignment: 'center'
          },
          tHeaderLabel: {
            fontSize: 8,
            alignment: 'right'
          },
          tHeaderValue: {
            fontSize: 8,
            bold: true
          },
          tProductsHeader: {
            fontSize: 8.5,
            bold: true
          },
          tProductsBody: {
            fontSize: 8
          },
          tTotals: {
            fontSize: 9,
            bold: true,
            alignment: 'right'
          },
          tClientLabel: {
            fontSize: 8,
            alignment: 'right'
          },
          tClientValue: {
            fontSize: 8,
            bold: true
          },
          text: {
            fontSize: 8,
            alignment: 'center'
          },
          link: {
            fontSize: 8,
            bold: true,
            margin: [0, 0, 0, 4],
            alignment: 'center'
          }
        },
        content
      } = props
      const docDefinition = {
        pageSize, //TAMAÑO HOJA
        pageMargins, //MARGENES HOJA
        info, //METADATA PDF
        content, // CONTENIDO PDF
        styles //ESTILOS PDF
        //watermark
      }

      if (output === 'b64') {
        //SI INDICAMOS QUE LA SALIDA SERA [b64] Base64
        const pdfMakeCreatePdf = pdfMake.createPdf(docDefinition).download()
        resolve({
          success: true,
          content: null,
          message: 'Archivo generado correctamente.'
        })
        return
      }

      //ENVIAR A IMPRESIÓN DIRECTA
      if (output === 'print') {
        if (content) {
          const pdfMakeCreatePdf = pdfMake.createPdf(docDefinition)
          pdfMakeCreatePdf.getBase64((data) => {
            if (data) {
              if (window) {
                printjs({
                  printable: data,
                  type: 'pdf',
                  base64: true
                })
              } else {
                console.log('No hay window')
              }
            }
            resolve({
              success: true,
              content: null,
              message: 'Documento enviado a impresión.'
            })
          })
        }
        return
      }

      reject({
        success: false,
        content: null,
        message: 'Debes enviar tipo salida.'
      })
    } catch (error: any) {
      console.log('paso algo', error)
      reject({
        success: false,
        content: null,
        message: error?.message ?? 'No se pudo generar proceso.'
      })
    }
  })
}

export default createPdf
