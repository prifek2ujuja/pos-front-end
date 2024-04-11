import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { LoadingCard } from 'src/components/loading'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'src/components/ui/select'
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

  const [graphData, setGraphData] = useState<{
    labels: string[]
    data: number[]
  }>()
  const [graphView, setGraphView] = useState<string>('year')
  const { data, isLoading, isError, isFetched } = useOrdersGraphData()
  console.log(data)
  // const labels = graphData?.map((dataset) => monthMapping[dataset._id.month])
  // const sampleData = labels.map(() => faker.number.int({ min: 20000, max: 1000000 }))
  // const sampleData = graphData?.map((dataset) => dataset.total)
  const chartData = {
    labels: graphData?.labels,
    datasets: [
      {
        label: 'Sales',
        data: graphData?.data,
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
  // Create an array of years from the current year to 2 years back
  const graphViewOptions = [
    {
      value: 'year',
      label: 'Past 12 years',
    },
    {
      value: 'month',
      label: 'Past 12 months',
    },
    {
      value: 'daily',
      label: 'Past 7 days',
    },
  ]

  useEffect(() => {
    if (isFetched && data) {
      if (graphView === 'year') {
        const labels = data.ordersTotalByYear.map((dataset) => dataset._id.toString())
        const sampleData = data.ordersTotalByYear.map((dataset) => dataset.total)
        setGraphData({ labels, data: sampleData })
      } else if (graphView === 'month') {
        const labels = data.ordersTotalByMonth.map((dataset) => monthMapping[dataset._id.month])
        const sampleData = data.ordersTotalByMonth.map((dataset) => dataset.total)
        setGraphData({ labels, data: sampleData })
      } else if (graphView === 'daily') {
        const labels = data.ordersTotalByDay.map((dataset) => dataset._id.toString())
        const sampleData = data.ordersTotalByDay.map((dataset) => dataset.total)
        setGraphData({ labels, data: sampleData })
      }
    }
  }, [data, graphView, isFetched])
  return (
    <section className="w-full p-2 h-fit mb-16 bg-white rounded-2xl shadow-xl">
      <div className="flex justify-between py-2 md:py-4">
        <h1 className="font-medium">Sales analytics</h1>
        <Select onValueChange={(val) => setGraphView(val)}>
          <SelectTrigger className="min-w-[120px] max-w-fit mt-4 md:mt-0 rounded-2xl">
            <SelectValue placeholder={graphViewOptions.find((option) => option.value === graphView)?.label} />
          </SelectTrigger>
          <SelectContent className="poppins-regular">
            {graphViewOptions.map((option) => (
              <SelectItem key={crypto.randomUUID()} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {isLoading ? (
        <LoadingCard />
      ) : isError ? (
        <div>error</div>
      ) : isFetched ? (
        <Bar
          options={options}
          data={chartData}
          className="max-h-[400px] max-w-full rounded-2xl px-2 text-black md:px-6 py-4 bg-white md:h-full"
        />
      ) : null}
    </section>
  )
}

export default SalesGraph
