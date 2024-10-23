import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export interface BarChartProps {
  datosConfig: {
    labels: string[]
    datos: number[]
    datos2?: number[]
    colores: string[]
  }
  labels: string[]
  titulo?: string
}

const BarChart = ({ datosConfig, labels = [], titulo }: BarChartProps) => {
  const data = {
    labels: datosConfig.labels,
    datasets: [
      {
        label: labels[0],
        data: datosConfig.datos,
        backgroundColor: datosConfig.colores[0],
        borderColor: datosConfig.colores[0],
        borderWidth: 1
      }
    ]
  }

  if (datosConfig.datos2) {
    data.datasets.push({
      label: labels[1],
      data: datosConfig.datos2,
      backgroundColor: datosConfig.colores[1],
      borderColor: datosConfig.colores[1],
      borderWidth: 1
    })
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: titulo ? true : false,
        text: titulo
      }
    }
  }

  return (
    <>
      <div className="h-64">
        <Bar data={data} width={'auto'} height={'auto'} options={options} />
      </div>
    </>
  )
}

export default BarChart
