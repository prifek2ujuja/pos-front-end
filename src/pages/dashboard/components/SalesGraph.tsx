import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { LoadingCard } from 'src/components/loading'
import useOrdersGraphData from 'src/hooks/queries/useOrdersGraphData'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const monthMapping: {
  [key: number]: string
} = {
  1: 'Jan',
  2: 'Feb',
  3: 'Mar',
  4: 'Apr',
  5: 'May',
  6: 'Jun',
  7: 'Jul',
  8: 'Aug',
  9: 'Sep',
  10: 'Oct',
  11: 'Nov',
  12: 'Dec',
}
const SalesGraph = () => {
  //

  const { data: graphData, isLoading, isError, isFetched } = useOrdersGraphData()
  const labels = graphData?.map((dataset) => monthMapping[dataset._id.month])
  // const sampleData = labels.map(() => faker.number.int({ min: 20000, max: 1000000 }))
  const sampleData = graphData?.map((dataset) => dataset.total)
  const data = {
    labels,
    datasets: [
      {
        label: 'Sales',
        data: sampleData,
        backgroundColor: '#4E97FD',
      },
    ],
  }
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    barPercentage: 1,
    barThickness: 8,
    borderRadius: 50,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 0,
        ticks: {
          display: true,
          stepSize: 1,
        },
        border: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
    },
  }
  return (
    <section className="w-full p-2 h-fit mb-16 bg-white rounded-2xl shadow-xl">
      <h1 className="font-medium">Sales analytics</h1>
      {isLoading ? (
        <LoadingCard />
      ) : isError ? (
        <div>error</div>
      ) : isFetched ? (
        <Bar
          options={options}
          data={data}
          className="max-h-[400px] max-w-full rounded-2xl px-2 text-black md:px-6 py-4 bg-white md:h-full"
        />
      ) : null}
    </section>
  )
}

export default SalesGraph
